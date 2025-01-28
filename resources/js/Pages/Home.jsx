// Pages/Home.jsx
import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const Home = ({ success }) => {
    useEffect(() => {
        if (success) {
            toast("Product added successfully.....");
        }
    }, [success]);

    return (
        <div>
            <Link href="/add-product">Add Products</Link>
            <ToastContainer />
        </div>
    );
};

export default Home;
