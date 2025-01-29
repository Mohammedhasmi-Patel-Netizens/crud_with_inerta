<?php

namespace App\Services;

use App\Models\User;
use App\Http\Requests\UserRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

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

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ], 404);
        }
    
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials',
            ], 401);
        }
    
        Auth::login($user);

        $products = Product::all();
        // dd($products);

        if($user->role==='customer'){
            return Inertia::render('Products',["products"=>$products,"user"=> $user]);

            // return response()->json([
            //     'success'=> true,
            //     'message'=> 'logged in successfully.....'
            // ]);
        }else{
           return redirect('show-product');
        }
    }

    public function logout(){
        Auth::logout();
        return inertia('LoginUser');
    }

    public function editUser($id){

        $user = User::find($id);
        
        return inertia('UpdateUser', ['user'=> $user]);
    }

    public function updateUser($request,$id){
        $user = User::find($id);

        if(!$user){
            return response()->json([
                'success'=> false,
                'message'=> 'invalid user'
            ],404);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $success = $user->save();

        if($success){
            return response()->json([
                'success'=> true,
                'message'=> 'user updated successfully.......'
            ],200);
        }

    }
}
