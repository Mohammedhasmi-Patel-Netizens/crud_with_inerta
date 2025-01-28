<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home'); // Ensure the path matches your component
});

Route::get('add-product',function(){
    return inertia('');
});