<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home'); // Ensure the path matches your component
});

Route::get('add-product',function(){
    return inertia('AddProduct');
});

Route::middleware('auth')->group(function(){
    Route::post('add-product',[ProductController::class,'addProduct']);
    Route::get('show-product',[ProductController::class,'showProducts']);
    Route::delete('/delete-product/{id}',[ProductController::class,'deleteProduct']);
    Route::get('/edit-product/{id}',[ProductController::class,'getProductById']);
    Route::post('/update-product/{id}',[ProductController::class,'updateProductById']);    
});


Route::post('register',[UserController::class,'register']);

Route::get('register',function(){
    return inertia('RegisterUser');
});

Route::get('login',function(){
    return inertia('LoginUser');
});




