import React from "react";
import "../../css/AddProduct.css";
import { useForm } from "react-hook-form";
import { router } from '@inertiajs/react';
import { toast, ToastContainer } from "react-toastify";

const UpdateProduct = ({ product }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm({
        defaultValues: {
            product_name: product.name,
            product_description: product.description,
            product_price: product.price,
            product_image: product.image_uri,
        },
    });

    const onSubmit = async (data) => {
        // Check if the file is selected
        if (!data.product_image || data.product_image.length === 0) {
            console.error("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("product_name", data.product_name);
        formData.append("product_description", data.product_description);
        formData.append("product_price", Number(data.product_price));
        formData.append("product_image", data.product_image[0]); // Append the first file

        try {
           await router.post(`/update-product/${product.id}`, formData);
                toast.success("Product updated successfully!");
                reset(); // Reset the form if needed
            
        } catch (error) {
            console.log(error)
            toast.error("Failed to update product. Please try again.");
            console.error("Error updating product:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} method="POST" encType="multipart/form-data">
                <h2>Update Product</h2>
                <input
                    type="text"
                    placeholder="Product Name"
                    {...register("product_name", { required: true })}
                />
                {errors.product_name && (
                    <span className="error">This field is required</span>
                )}
                <input
                    type="text"
                    placeholder="Product Description"
                    {...register("product_description", { required: true })}
                />
                {errors.product_description && (
                    <span className="error">This field is required</span>
                )}
                <input
                    type="number"
                    placeholder="Product Price"
                    {...register("product_price", { required: true })}
                />
                {errors.product_price && (
                    <span className="error">This field is required</span>
                )}
                <input {...register("product_image", { required: true })} type="file" />
                {errors.product_image && (
                    <span className="error">This field is required</span>
                )}
                <input type="submit" value="Update Product" />
            </form>
            <ToastContainer />
        </div>
    );
};

export default UpdateProduct;
