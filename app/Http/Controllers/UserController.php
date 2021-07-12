<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Session;
use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Wallet;

class UserController extends Controller
{
    use AuthenticatesUsers;

    protected $maxAttempts = 5; // change to the max attemp you want.
    protected $decayMinutes = 5;

    private function throttle_seconds() {
        if(session()->has('throttle_seconds')) {
            $throttle_seconds = session('throttle_seconds');
            $throttle_current_time = session('throttle_current_time');
            $throttle_seconds = $throttle_current_time - time();
            if($throttle_seconds < 0) {
                $throttle_seconds = 0;
                $this->forget_throttle_seconds();
            }
        } else {
            session(['throttle_seconds' => ($this->decayMinutes* 60)]);
            session(['throttle_current_time' => (time() + ($this->decayMinutes* 60))]);
            $throttle_seconds = session('throttle_seconds');
        }
        return $throttle_seconds;
    }

    private function forget_throttle_seconds() {
        if(session()->has('throttle_seconds')) {
            session()->forget('throttle_seconds');
            session()->forget('throttle_current_time');
        }
    }

    public function login(Request $request) {
        if ($this->hasTooManyLoginAttempts($request)) {
            $seconds = $this->throttle_seconds();
            $this->fireLockoutEvent($request);
            //$this->sendLockoutResponse($request);
            return ResponseHelper::responseDisplay(400, 'The given data was invalid.\nToo many login attempts. Please try again in '.$seconds.' seconds.', '');
        }
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|max:200',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            $this->incrementLoginAttempts($request);
            return ResponseHelper::responseDisplay(400, $validator->messages()->first(), '');
        }

        //Checks if user exists in database
        $user = User::where('email',$request->email)->first();
        if(!$user){
            return ResponseHelper::responseDisplay(400, "No user with that email");
        }
        if(!Hash::check($request->password, $user->password)){
            return ResponseHelper::responseDisplay(400, "Invalid credentials");
        }
        
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'active' => true])) {
            // The user is active, not suspended, and exists.
            $this->clearLoginAttempts($request);
            $user = User::where('id',Auth::user()->id)->with('wallet','transaction')->first();
            return ResponseHelper::responseDisplay(200, 'Login Successful', $user);

        }
        $this->incrementLoginAttempts($request);
        $this->forget_throttle_seconds();
        return ResponseHelper::responseDisplay(400, 'Wrong email or password', '');
    }

    public function register(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|string|unique:users',
            'phone_number' => 'required|unique:users',
            'password' => 'required|string|min:8',
            'password_confirmation' => 'same:password',
        ]);

        if ($validateData->fails()) {
            return ResponseHelper::responseDisplay(422, $validateData->messages()->first());
        }

        //generate a reference ID for user
        if(!(User::where('ref_number','US-0001001')->first())){
            $ref_id='US-0001001';
        }
        else{
            $number=User::get()->last()->ref_number;
            $number=str_replace('US-',"",$number);
            $number=str_pad($number+1, 7, '0', STR_PAD_LEFT);
            $ref_id='US-'.$number;
        }

        //generate account no for user wallet
        $wallet_key = floor(time()-999999999);
        $account_no = $this->generateAccountNumber();

        $user = new User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->name = $request->first_name.' '.$request->last_name;
        $user->email = $request->email;
        $user->phone_number = $request->phone_number;
        $user->ref_number = $ref_id;
        $user->password = Hash::make($request->password);
        if($user->save()){
            Wallet::create([
                'user_id' => $user->id,
                "wallet_key" => $wallet_key,
                "account_no" => $account_no,
            ]);
            return ResponseHelper::responseDisplay(200, 'Successful Registration. You can now login to your account');
        } else {
            return ResponseHelper::responseDisplay(400, 'Error encountered creating account. please try again');
        }
    }
    
    public function updateProfile(Request $request) {
        if(empty($request->user_id)){
            return ResponseHelper::responseDisplay(400, 'Please login to update your account');
        }
        $validateData = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email|string',
            'phone_number' => 'numeric|required',
            'country' => 'required|string',
            'state' => 'required|string',
            'city' => 'required|string',
            'address' => 'required|string',
            'user_id' => 'integer|required',
        ]);

        if ($validateData->fails()) {
            return ResponseHelper::responseDisplay(422, $validateData->messages()->first());
        }
        
        $user = User::where('id', $request->user_id)->first();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->other_name = $request->other_name;
        $user->name = $request->other_name ? $request->first_name.' '.$request->other_name.' '.$request->last_name : $request->first_name.' '.$request->last_name;
        $user->email = $request->email;
        $user->phone_number = $request->phone_number;
        $user->country = $request->country;
        $user->state = $request->state;
        $user->city = $request->city;
        $user->address = $request->address;
        if($user->save()){
            return ResponseHelper::responseDisplay(200, 'Account updated successfully');
        } else {
            return ResponseHelper::responseDisplay(400, 'Error encountered updating account. please try again');
        }
    }

    public function generateAccountNumber() {
        $number = mt_rand(1000000000, 9999999999);
    
        // call the same function if the account no exists already
        if ($this->validateAccountNumber($number)) {
            return $this->generateAccountNumber();
        }
    
        // otherwise, it's valid and can be used
        return $number;
    }
    
    public function validateAccountNumber($number) {
       return Wallet::whereAccountNo($number)->exists();
    }

    public function profile($id) {
        $user = User::where('ref_number',$id)->with('wallet','transaction')->first();
        if($user){
            return ResponseHelper::responseDisplay(200, "successful", $user);
        } else {
            return ResponseHelper::responseDisplay(400, "failed");
        }
    }

    public function changePassword(Request $request,$id) {
        $validateData = Validator::make($request->all(),[
            'current_password' => 'required|string',
            'new_password' => 'required|string',
            'confirm_new_password' => 'same:new_password',
        ]);
        if ($validateData->fails()) {
            return ResponseHelper::responseDisplay(422, $validateData->messages()->first());
        }
        $user = User::where('ref_number',$id)->first();
		if(Hash::check($request->current_password, $user->password)){
			$user->password = bcrypt($request->new_password);
			$user->save();
			return ResponseHelper::responseDisplay(200, 'Password changed successfully');
		}  else {
			return ResponseHelper::responseDisplay(400, 'current password does not match!');
		}
    }

    public function logout(Request $request) {
        Auth::logout();
        // $request->user()->token()->revoke();
        session()->flush();
        return ResponseHelper::responseDisplay(200, 'logged out successfully');
    }

}
