<?php

namespace App\Services;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    /**
     * Create a new class instance.
     */
    public function __construct() {}

    public function createProduct(array $validatedData, $image)
    {
        $imagePath = $image->store('images', 'public');

        // Create a new product
        $res =  Product::create([
            'name' => $validatedData['product_name'],
            'description' => $validatedData['product_description'],
            'price' => $validatedData['product_price'],
            'image_uri' => $imagePath,
        ]);

        // Return response
        if ($res) {
            return redirect('show-product');
        }
    }

    public function displayAllProducts()
    {
        $products =  Product::all();
        $user = Auth::user();

        if(!$user){
            return redirect('login');
        }

        if ($user->role === 'admin') {
            return inertia('ShowProducts', ['products' => $products]);
        }

        return inertia('Products', ['products'=> $products,'user'=> $user]);
    }

    public function deleteProduct($id)
    {
        $product = Product::find($id);

        if ($product) {
            $imagePath = $product->image_uri;

            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }

            $product->delete();

            return redirect('/');
        }
    }



    public function getProductById($id)
    {
        $product = Product::find($id);

        return inertia('UpdateProduct', ['product' => $product]);
    }

    public function updateProductById(ProductRequest $request, $id)
    {

        // Find the product by its ID
        $product = Product::find($id);

        // return $request;

        // Check if the product exists
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $image_path = "";
        $image = $request->file('product_image');

        if ($image) {
            $image_path = $image->store('images', 'public');
        } else {
            $image_path = $product->image_uri;
        }


        $product->name = $request->product_name;
        $product->description = $request->product_description;
        $product->price = $request->product_price;
        $product->image_uri = $image_path;

        $products = Product::all();

        $product->save();
        return inertia('ShowProducts', ['products' => $products]);
    }
}
