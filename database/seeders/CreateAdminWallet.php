<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Wallet;
use App\Models\User;

class CreateAdminWallet extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $check = User::where('admin','yes')->first();
        if(!$check){
            $wallet_key = floor(time()-999999999);
            
            $user = new User();
            $user->first_name = 'Page';
            $user->last_name = 'Financials';
            $user->name = 'Page Financials';
            $user->email = 'admin@gmail.com';
            $user->phone_number = '08011223344';
            $user->ref_number = 'AD-0001001';
            $user->password = Hash::make('password');
            $user->admin = 'yes';
            if($user->save()){
                Wallet::create([
                    'user_id' => $user->id,
                    "wallet_key" => $wallet_key,
                    "account_no" => '1234567890',
                    "admin" => 'yes',
                    "balance" => '900000000000',
                ]);
            } 

        }
    }
}
