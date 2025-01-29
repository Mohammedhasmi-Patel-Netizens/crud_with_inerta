import { Link, router } from "@inertiajs/react";
import React from "react";
import "../../css/Navbar.css";


const Navbar = ({user}) => {
  
    const handleLogout = () => {
        router.post("logout");
    };

    console.log(`user is ${user}`);
    return (
        <nav>
            <ul>
                <li>
                    <Link href="about">About</Link>
                </li>
                <li>
                    <Link href="contact">Contact</Link>
                </li>

               
            
                <li>
                    <button className="logout" onClick={handleLogout}>
                        Logout
                    </button>{" "}
                    {/* Apply logout class */}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
