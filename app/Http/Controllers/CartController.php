<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addToCart(Request $request, $id)
    {

        // return $request;

        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                "success" => false,
                "error" => "invalid product id",
            ], 500);
        }

        $res = Cart::create([
            "user_id" => $request->id,
            "product_id" => $id,
            "quantity" => 1,
        ]);

        if ($res) {
            return response()->json([
                "success" => true,
                "message" => "product addded successfully....."
            ], 200);
        }

        return response()->json([
            "success" => false,
            "message" => "internal server error"
        ], 500);
    }


    public function getCartItemBasedOnUserId(Request $request, $id)
    {
        $userCartItems = Cart::with('product')->where("user_id", "=", $id)->get();


        $groupedProducts = $userCartItems->groupBy('product_id')->map(function ($items) {
            return [
                'product' => $items->first()->product, // Accessing product details
                'quantity' => $items->sum('quantity'),
                'price' => $items->first()->product->price // Assuming price is a property of the product
            ];
        });

        $groupedProductsArray = $groupedProducts->values()->toArray();

        $total_price = 0;
        foreach ($groupedProductsArray as $product) {
            $total_price += $product['price'] * $product['quantity'];
        }


        return inertia('UserCartItem', [
            'products' => $groupedProductsArray,
            'total_price' => $total_price,
        ]);
    }

    public function deleteCartItemById($id){
        $cartItem = Cart::find($id);

        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['message' => 'Cart item deleted successfully.']);
        }
    
        return response()->json(['message' => 'Cart item not found.'], 404);
    }

}
