<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home'); // Ensure the path matches your component
});



Route::group(['middleware'=>'guest'],function(){
    Route::get('login',function(){
        return inertia('LoginUser');
    })->name('login');
    
    Route::get('register',function(){
        return inertia('RegisterUser');
    });
});





Route::middleware('auth')->group(function(){
    Route::get('add-product',[ProductController::class,'displayAddProduct']);
    Route::get('show-product',[ProductController::class,'showProducts']);
    Route::get('/edit-product/{id}',[ProductController::class,'getProductById']);
    Route::get('/edit-user/{id}',[UserController::class,'editUser']);
    Route::get('products',[ProductController::class,'displayAllProducts']);


   

    Route::post('logout',[UserController::class,'logout']);
    Route::post('/get-cart-items/{id}',[CartController::class,'getCartItemBasedOnUserId']);
    Route::post('/update-product/{id}',[ProductController::class,'updateProductById']);
    Route::post('add-product',[ProductController::class,'addProduct']);
    // Route::post('/update-user/{id}',[UserController::class,'updateUser']);
    Route::post('/update-user/{id}', [UserController::class, 'updateUser'])->name('update-user');




    Route::delete('/delete-product/{id}',[ProductController::class,'deleteProduct']);
    Route::delete('/delete-cart-item/{id}',[CartController::class,'deleteCartItemById']);

});
