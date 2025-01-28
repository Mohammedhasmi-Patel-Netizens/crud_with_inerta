<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;
class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    // function for adding product.
    public function addProduct(ProductRequest $request)
    {
        $validatedData = $request->all();
        $image = $request->file('product_image');
        $res = $this->productService->createProduct($validatedData, $image);

        // Return response
        if ($res) {
            return inertia('Home')->with(['success' => true, 'message' => 'Product Added successfully']);
        }

        return back()->withErrors(['error' => 'Product creation failed']);
    }

    public function showProducts(){
        return $this->productService->displayAllProducts();
    }

    public function deleteProduct(Request $request,$id){
        return $this->productService->deleteProduct($request,$id);
    }
}
