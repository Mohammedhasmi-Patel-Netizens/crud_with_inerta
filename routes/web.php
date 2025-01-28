<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home'); // Ensure the path matches your component
});

Route::get('add-product',function(){
    return inertia('AddProduct');
});

Route::post('add-product',[ProductController::class,'addProduct']);
Route::get('show-product',[ProductController::class,'showProducts']);
Route::delete('/delete-product/{id}',[ProductController::class,'deleteProduct']);
Route::get('/edit-product/{id}',[ProductController::class,'getProductById']);
Route::post('/update-product/{id}',[ProductController::class,'updateProductById']);

Route::get('register',function(){
    return inertia('RegisterUser');
});


