<?php

namespace App\Services;

use App\Models\User;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function register(UserRequest $request){
        $username = $request->username;
        $email = $request->email;
        $password = $request->password;

        $user = User::create([
            'name'=> $username,
            'email'=> $email,
            'password'=> Hash::make($password),
        ]);

        if($user){
            Auth::login($user);
            return response()->json([
                'status'=> 'success',
                'message'=> 'user created successfully',
            ],200);
        }else{
            return response()->json([
                'status'=> 'faile',
                'message'=> 'internal server error',
            ],500);
        }


    }
}
