import React from "react";
import { useForm } from "react-hook-form";
import "../../css/RegisterUser.css";
import { Link, router } from "@inertiajs/react";

const UpdateUser = ({user}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // You need to watch password for validation
  } = useForm(
        {
          defaultValues: {
            username: user.name,
            email: user.email,
            product_price: user.password,
            product_image: user.password_confirmation,
        },
        }
    );

  const onSubmit = (data) => {
    console.log(data);
     router.post(`/update/user/${user.id}`, data);
    // console.log(res);
  };

  return (
    <div>
      <h1 className="heading">Update Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
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

        <button type="submit">Update Data</button>
      </form>
    </div>
  );
};

export default UpdateUser;
