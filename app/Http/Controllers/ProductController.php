<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function addProduct(Request $request){

        // Validate the incoming request data
        $request->validate([
            "product_name" => "required",
            "product_description" => "required",
            "product_price" => "required|numeric",
            "product_image" => "image|mimes:jpeg,png,jpg,gif,svg|max:2048", // Max size 2MB
        ]);

        // Initialize a new Product instance
        $product = new Product();
        $product->name = $request->input('product_name');
        $product->description = $request->input('product_description');
        $product->price = $request->input('product_price');

        // Handle the image upload
        if ($request->hasFile('product_image')) {
            $image = $request->file('product_image');
            $imageName = time() . '.' . $image->getClientOriginalExtension(); // Create a unique name
            $image->move(public_path('images'), $imageName); // Move the image to the public/images directory
            $product->image_uri = 'images/' . $imageName; // Save the image path to the database
        }

        $product->save();

        return inertia("Home",["success"=>true]);



    }
}
