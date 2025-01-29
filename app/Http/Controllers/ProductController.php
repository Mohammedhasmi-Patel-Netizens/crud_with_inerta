<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    // display product route or not 

      public function displayAddProduct(){
        $user = Auth::user();


        if(!$user || $user->role!=='admin'){
            abort(403);
        }

        return inertia('AddProduct');

      }

    // function for adding product.
    public function addProduct(ProductRequest $request)
    {
        $user = Auth::user();
        if($user->role!=='admin'){
            abort(403);
        }

        $validatedData = $request->all();
        $image = $request->file('product_image');
        return $this->productService->createProduct($validatedData, $image);

        
    }

    public function showProducts(){
        $user = Auth::user();

        if($user->role!=='admin'){
            abort(403);
        }
        return $this->productService->displayAllProducts();
    }

    public function deleteProduct($id){
        return $this->productService->deleteProduct($id);
    }

    public function getProductById($id){
          return $this->productService->getProductById($id);
    }

    public function updateProductById(ProductRequest $request, $id){

        return $this->productService->updateProductById($request,$id);
    }

    public function displayAllProducts(){
        return $this->productService->displayAllProducts();

    }

    
}
