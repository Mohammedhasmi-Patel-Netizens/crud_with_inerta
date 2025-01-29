<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService){
        $this->userService = $userService;
    }
    public function register(UserRequest $request){
        return $this->userService->register($request);
    }

    public function login(Request $request){
        return $this->userService->login( $request);
    }

    public function logout(){
        return $this->userService->logout();
    }

    public function editUser($id){
        return $this->userService->editUser($id);
    }

    public function updateUser(UserRequest $request,$id){
        return $this->userService->updateUser($request,$id);
    }
}
