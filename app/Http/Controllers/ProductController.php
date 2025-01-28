<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Services\ProductService;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }
    public function addProduct(ProductRequest $request)
    {
        $validatedData = $request->all();
        $image = $request->file('product_image');
        $res = $this->productService->createProduct($validatedData, $image);

        // Return response
        if ($res) {
            return redirect('/')->with(['success' => true, 'message' => 'Product Added successfully']);
        }

        return back()->withErrors(['error' => 'Product creation failed']);
    }
}
