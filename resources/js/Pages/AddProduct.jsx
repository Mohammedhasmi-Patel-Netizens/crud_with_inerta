import React from "react";
import "../../css/AddProduct.css";
import { useForm } from "react-hook-form";
import { Link, router } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";

const AddProduct = ({ error }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // Check if the file is selected
        if (!data.product_image[0]) {
            // Check if there's a file
            console.error("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("product_name", data.product_name);
        formData.append("product_description", data.product_description);
        formData.append("product_price", Number(data.product_price));
        formData.append("product_image", data.product_image[0]); // Append the first file

        router.post("/add-product", formData);
    };

    if (error) {
        toast.error("error occured while adding product");
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                method="POST"
                encType="multipart/form-data"
            >
                <h2>Add Product</h2>
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
                <input
                    {...register("product_image", { required: true })}
                    type="file"
                />
                {errors.product_image && (
                    <span className="error">This field is required</span>
                )}
                <input type="submit" value="Add Product" />
            </form>

            <Link style={{marginTop:"50px"}} href="show-product">Show Products</Link>
            <ToastContainer />
        </div>
    );
};

export default AddProduct;
