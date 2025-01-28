<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "username"=> "required",
            "email"=> "required|email|unique:users,email",
            "password"=> "required|min:8|confirmed",
        ];
    }
    public function messages(): array{
        return [
            "username.required"=> "username is required",
            "email.required"=> "email is required",
            "email.email"=> "email is required",
            "email.unique"=> "email already registered",
            "password.confirmed"=> "password not match",
            "password.required"=> "password required..",

        ];
    }
}
