import React, { useState } from "react";
import "../../css/LoginUser.css";
import { router, Link } from "@inertiajs/react";
import axios from "axios";
const LoginUser = () => {

    const baseURI = "http://localhost:8000/api";



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and Password are required.");
            return;
        }

        try {
            const res = await axios.post(`http://localhost:8000/api/login`,{
                email,password
            });
            console.log(res)
        } catch (error) {
            console.log(error)
        }


      
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
            <p>
                New to Website?
                <Link href="register">Register</Link>
            </p>
        </div>
    );
};

export default LoginUser;