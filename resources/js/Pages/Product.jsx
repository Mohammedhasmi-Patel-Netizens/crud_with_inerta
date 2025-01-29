import React from "react";
import "../../css/Product.css";
import { router } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import { FaCartPlus } from "react-icons/fa";


const Product = ({ product, user }) => {
    const handleAddToCart = async () => {
        const res = await router.post(`add-to-cart/${product.id}`, {
            id: user.id,
        });
    };

    


   
    return (
        <>
            <div className="product-card">
                <img
                    className="product-image"
                    src={`http://127.0.0.1:8000/storage/${product.image_uri}`}
                    alt={product.name}
                />
                <p className="product-name">{product.name}</p>
                <p className="product-description">{product.description}</p>
                <p className="product-price">{product.price}</p>

                <button className="cart-btn" onClick={handleAddToCart}>
                    Add To Cart
                </button>
            </div>
            <ToastContainer />
        </>
    );
};

export default Product;
