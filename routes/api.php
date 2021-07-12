<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WalletController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
 
//Auth
Route::post('/login', [UserController::class, "login"]);
Route::post('/register', [UserController::class, "register"]);
Route::get('/profile/{id}', [UserController::class, "profile"]);
Route::post('/change-password/{id}', [UserController::class, "changePassword"]);
Route::post('/update-profile', [UserController::class, "updateProfile"]);
Route::get('/logout', [UserController::class, "logout"]);

//wallet Transactions
Route::post('/transfer', [WalletController::class, "transfer"]);
Route::post('/credit', [WalletController::class, "credit"]);
Route::get('/transactions/{id}', [WalletController::class, "transactions"]);

