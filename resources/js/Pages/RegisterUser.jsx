import React from "react";
import { useForm } from "react-hook-form";
import "../../css/RegisterUser.css";
import { Link, router } from "@inertiajs/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const RegisterUser = () => {
    const baseURI = "http://localhost:8000/api";

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch, // You need to watch password for validation
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const res = await axios.post(`${baseURI}/register`, data);
            if (res.data.success) {
                toast.success("register successfully.....");
            }
        } catch (error) {
            if (error?.response) {
                console.error("Error response:", error.response.data);
                toast.error(error.response.data.message || "Registration failed");
            } else {
                console.error("Error message:", error.message);
                toast.error("An error occurred");
            }
        }
    };

    return (
        <>

            <div>
                <h1 className="heading">Register Form</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="username"
                        {...register("username", { required: true })}
                    />
                    {errors.username && (
                        <span className="error">This field is required</span>
                    )}

                    <input
                        type="email"
                        placeholder="email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && (
                        <span className="error">This field is required</span>
                    )}

                    <input
                        type="password"
                        placeholder="password"
                        {...register("password", {
                            required: "This field is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <span className="error">{errors.password.message}</span>
                    )}

                    <input
                        type="password"
                        placeholder="password_confirmation"
                        {...register("password_confirmation", {
                            required: "This field is required",
                            validate: (value) =>
                                value === watch("password") ||
                                "Passwords do not match",
                        })}
                    />
                    {errors.password_confirmation && (
                        <span className="error">
                            {errors.password_confirmation.message}
                        </span>
                    )}

                    <button type="submit">Register</button>
                </form>
                <p> Already Have an Account? <Link href="login">Login</Link></p>
            </div>
            <ToastContainer />

        </>

    );
};

export default RegisterUser;
