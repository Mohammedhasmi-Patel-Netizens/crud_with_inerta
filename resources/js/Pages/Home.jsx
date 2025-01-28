// Pages/Home.jsx
import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const Home = ({ success,message }) => {
    useEffect(() => {
        if (success) {
            toast(`${message}`);
        }
    }, [success]);

    return (
        <div>
            <Link href="/add-product">Add Products</Link>
            <Link href="/show-product">Show Products</Link>

            <ToastContainer />
        </div>
    );
};

export default Home;
