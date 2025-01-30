import React from "react";
import { useForm } from "react-hook-form";
import "../../css/RegisterUser.css";
import { router } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";

const UpdateUser  = ({ user,success=false }) => {
  const userId = user.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: user.name,
      email: user.email,
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data) => {


  // const formData = new FormData();
  // formData.append("name", data.username);
  // formData.append("email", data.email);
  // formData.append("password", Number(data.password));
  // formData.append("password_confirmation", data.password_confirmation);





    try {
      const response = await router.post(`/update-user/${userId}`, data);
      if(success){
        toast.success("User Updated successfully....")
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error(`${error}`)
    }
  };

  return (
    <div>
      <h1 className="heading">Update Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username && <span className="error">This field is required</span>}

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <span className="error">This field is required</span>}

        <input
          type="password"
          placeholder="Password (leave blank to keep current)"
          {...register("password", {
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("password_confirmation", {
            validate: (value) => {
              const password = watch("password");
              return !password || value === password || "Passwords do not match";
            },
          })}
        />
        {errors.password_confirmation && (
          <span className="error">{errors.password_confirmation.message}</span>
        )}

        <button type="submit">Update Data</button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default UpdateUser ;



















































// // import React from "react";
// // import { useForm } from "react-hook-form";
// // import "../../css/RegisterUser.css";
// // import {  router } from "@inertiajs/react";

// // const UpdateUser = ({user}) => {
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //     watch, // You need to watch password for validation
// //   } = useForm(
// //         {
// //           defaultValues: {
// //             username: user.name,
// //             email: user.email,
// //             password: "",
// //             password_confirmation: "",
// //           },
// //         }
// //     );

// //   const onSubmit = (data) => {
// //         console.log(data);
// //         router.post(`/update-user`,data);
// //     // console.log(res);
// //   };

// //   return (
// //     <div>
// //       <h1 className="heading">Update Form</h1>
// //       <form onSubmit={handleSubmit(onSubmit)} method="POST">
// //         <input
// //           type="text"
// //           placeholder="username"
// //           {...register("username", { required: true })}
// //         />
// //         {errors.username && (
// //           <span className="error">This field is required</span>
// //         )}

// //         <input
// //           type="email"
// //           placeholder="email"
// //           {...register("email", { required: true })}
// //         />
// //         {errors.email && (
// //           <span className="error">This field is required</span>
// //         )}

// //         <input
// //           type="password"
// //           placeholder="password"
// //           {...register("password", {
// //             required: "This field is required",
// //             minLength: {
// //               value: 6,
// //               message: "Password must be at least 6 characters",
// //             },
// //           })}
// //         />
// //         {errors.password && (
// //           <span className="error">{errors.password.message}</span>
// //         )}

// //         <input
// //           type="password"
// //           placeholder="password_confirmation"
// //           {...register("password_confirmation", {
// //             required: "This field is required",
// //             validate: (value) =>
// //               value === watch("password") ||
// //               "Passwords do not match",
// //           })}
// //         />
// //         {errors.password_confirmation && (
// //           <span className="error">
// //             {errors.password_confirmation.message}
// //           </span>
// //         )}

// //         <button type="submit">Update Data</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default UpdateUser;
