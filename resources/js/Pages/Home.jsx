// Pages/Home.jsx
import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";

const Home = ({ success, message, user }) => {
    console.log(user);
    useEffect(() => {
        if (success) {
            toast(message);
        }
    }, [success, message]);

    const renderAdminLinks = () => (
        <>
            <Link href="/add-product" style={{ marginRight: "50px" }}>
                Add Products
            </Link>
            <Link href="/show-product">Show Products</Link>
        </>
    );

    const renderCustomerLinks = () => (
        <>
            <Link href="/login" style={{ marginRight: "50px" }}>
                Login
            </Link>
            <Link href="/register">Register</Link>
        </>
    );

    const renderShowAllProductsLink = () => (
        <>
            <Link href="/products" style={{ marginRight: "50px" }}>
                Show All Products
            </Link>
        </>
    );

    return (
        <div>
            <>
                {user ? (
                    <>
                        {user?.role == "admin"
                            ? renderAdminLinks()
                            : renderShowAllProductsLink()}
                    </>
                ) : (
                    renderCustomerLinks()
                )}
            </>

            {/* {user ? (
                user.role === "admin" ? (
                    renderAdminLinks()
                ) : user.role === "customer" ? (
                    renderShowAllProductsLink()
                ) : (
                    <></>
                )
            ) : (
                <>
                    {renderCustomerLinks()}
                    {renderShowAllProductsLink()}
                </>
            )} */}
            <ToastContainer />
        </div>
    );
};

export default Home;
