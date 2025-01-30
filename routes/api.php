<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


    Route::post('/add-to-cart/{id}',[CartController::class,'addToCart']);
    Route::post('register',[UserController::class,'register']);
    Route::post('login',[UserController::class,'login']);


