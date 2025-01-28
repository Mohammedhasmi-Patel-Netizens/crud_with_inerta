<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        
    }

    public function createProduct(array $validatedData, $image): Product
    {
        $imagePath = $image->store('images', 'public');
        
        // Create a new product
        return Product::create([
            'name' => $validatedData['product_name'],
            'description' => $validatedData['product_description'],
            'price' => $validatedData['product_price'],
            'image_uri' => $imagePath,
        ]);
    }

    public function displayAllProducts(){
        $products =  Product::all();

        return inertia('ShowProducts',['products'=> $products]);
    }

    public function deleteProduct(Request $request,$id){

        $product = Product::find($id);
        // dd($product);
        $product->delete();

        return redirect('show-product');

    }
}
