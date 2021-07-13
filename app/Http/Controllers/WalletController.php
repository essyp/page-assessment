<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Wallet;
use App\Models\Transaction;
use App\Models\Log;

class WalletController extends Controller
{
    public function transfer(Request $request) {
        //Validate incoming request
        $validateData = Validator::make($request->all(),[
            'wallet_id' => 'required',
            'amount' => 'numeric|required',
            'account_no' => 'numeric|required|exists:wallets',
        ]);
        if ($validateData->fails()) {
            return ResponseHelper::responseDisplay(422, $validateData->errors()->first());
        }

        $credit_account = Wallet::where('account_no',$request->account_no)->with('user')->first();
        $debit_account = Wallet::where('id',$request->wallet_id)->with('user')->first();
        if($debit_account->account_no === $request->account_no){
            return ResponseHelper::responseDisplay(400, "You can not transfer to your own account. Please choose a different account");
        }

        if($debit_account->balance < $request->amount){
            return ResponseHelper::responseDisplay(400, "Insufficient fund!");
        }

        if($debit_account->admin == 'yes') {
            return ResponseHelper::responseDisplay(400, "You don't have permission to transfer from this wallet ID.");
        }

        $ref_id = $this->generateRefNumber();

        $debit = new Transaction();
        $debit->wallet_id = $request->wallet_id;
        $debit->type = 'debit';
        $debit->account_number = $debit_account->account_no;
        $debit->user_id = $debit_account->user->id;
        $debit->amount = $request->amount;
        $debit->note = 'Transferred '.number_format($request->amount). ' to '. $credit_account->user->first_name.' '. $credit_account->user->last_name.' with account no - '.$credit_account->account_no;
        $debit->ref_id = $ref_id;
        if($debit->save()){

            Transaction::where('id',$debit->id)->update(['status' => true]);
            Wallet::where('id', $request->wallet_id)->decrement('balance', $request->amount);

            $credit = new Transaction();
            $credit->wallet_id = $credit_account->id;
            $credit->type = 'credit';
            $credit->account_number = $credit_account->account_no;
            $credit->user_id = $credit_account->user->id;
            $credit->amount = $request->amount;
            $credit->note = 'Received the sum of '.number_format($request->amount). ' from '. $debit_account->user->first_name.' '. $debit_account->user->last_name.' with account no - '.$debit_account->account_no;
            $credit->ref_id = $ref_id;
            if($credit->save()){
                Transaction::where('id',$credit->id)->update(['status' => true]);
                Wallet::where('id', $credit_account->id)->increment('balance', $request->amount);

                $this->log('Transferred '.number_format($request->amount). ' to '. $credit_account->user->first_name.' '. $credit_account->user->last_name.' with account no - '.$credit_account->account_no, $debit_account->user->id);
                return ResponseHelper::responseDisplay(200, "Operation successful");
            }
            
        } else {
            return ResponseHelper::responseDisplay(400, "Operation unsuccessful. Error encountered sending fund.");
        }
    }

    public function credit(Request $request) {
        //Validate incoming request
        $validateData = Validator::make($request->all(),[
            'wallet_id' => 'required',
            'amount' => 'numeric|required',
        ]);
        if ($validateData->fails()) {
            return ResponseHelper::responseDisplay(422, $validateData->errors()->first());
        }
        $check = Wallet::where('id',$request->wallet_id)->first();
        if($check) {

            if($check->admin == 'yes') {
                return ResponseHelper::responseDisplay(400, "You don't have permission to credit this wallet ID.");
            }

            $credit_account = Wallet::where('id',$request->wallet_id)->with('user')->first();
            $debit_account = Wallet::where('admin','yes')->with('user')->first();
            
            $ref_id = $this->generateRefNumber();

            $debit = new Transaction();
            $debit->wallet_id = $debit_account->id;
            $debit->type = 'debit';
            $debit->account_number = $debit_account->account_no;
            $debit->user_id = $debit_account->user->id;
            $debit->amount = $request->amount;
            $debit->note = 'credited the sum of '.number_format($request->amount). ' to '. $credit_account->user->first_name.' '. $credit_account->user->last_name.' with account no - '.$credit_account->account_no;
            $debit->ref_id = $ref_id;
            if($debit->save()){

                Transaction::where('id',$debit->id)->update(['status' => true]);
                Wallet::where('id', $debit->wallet_id)->decrement('balance', $debit->amount);

                $credit = new Transaction();
                $credit->wallet_id = $credit_account->id;
                $credit->type = 'credit';
                $credit->account_number = $credit_account->account_no;
                $credit->user_id = $credit_account->user->id;
                $credit->amount = $request->amount;
                $credit->note = 'credited account with the sum of '.number_format($request->amount);
                $credit->ref_id = $ref_id;
                if($credit->save()){
                    Transaction::where('id',$credit->id)->update(['status' => true]);
                    Wallet::where('id', $credit_account->id)->increment('balance', $credit->amount);

                    $this->log('credited account with the sum of '.number_format($credit->amount), $credit_account->user->id);
                    return ResponseHelper::responseDisplay(200, "Operation successful");
                }
                
            } else {
                return ResponseHelper::responseDisplay(400, "Operation unsuccessful. Error encountered crediting account.");
            }
        } else {
            return ResponseHelper::responseDisplay(400, "Incorrect wallet ID.");
        }
    }

    public function transactions($id) {
        $user = User::where('ref_number',$id)->first();
        if(!$user){
            return ResponseHelper::responseDisplay(400, "Invalid ID supplied!");
        }
        $data = Transaction::where('user_id',$user->id)->orderBy('id','desc')->get();
        if($data){
            return ResponseHelper::responseDisplay(200, "successful", $data);
        } else {
            return ResponseHelper::responseDisplay(400, "failed");
        }
    }

    public function generateRefNumber() {
        $number = mt_rand(1000000000, 9999999999);
        if ($this->validateRefNumber($number)) {
            return $this->generateRefNumber();
        }
        return $number;
    }
    
    public function validateRefNumber($number) {
       return Transaction::whereRefId($number)->exists();
    }

    public function log($action, $id){
		$log = new Log();
		$log->user_id = $id;
		$log->action = $action;
		$log->computer_ip = \Request::ip();
		$log->session_id = \Session::getId();
		$log->save();
    }
}
