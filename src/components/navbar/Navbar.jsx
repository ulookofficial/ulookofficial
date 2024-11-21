// uLOOK official - Rights Reserved 2024

import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Navbar = () => {
    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem("users"));

    // Navigate
    const navigate = useNavigate();

    // Logout function
    const logout = () => {
        localStorage.clear("users");
        navigate("/login");
    };

    // Cart items
    const cartItems = useSelector((state) => state.cart);

    // State for mobile menu toggle
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Navigation list data
    const navList = (
        <ul className="flex flex-col lg:flex-row lg:space-x-6 items-center text-white font-medium text-md px-5 lg:px-0">
            {/* Home */}
            <li className="hover:text-pink-200 transition">
                <Link to="/">Home</Link>
            </li>

            {/* All Products */}
            <li className="hover:text-pink-200 transition">
                <Link to="/allproduct">All Products</Link>
            </li>

            {/* Signup */}
            {!user && (
                <li className="hover:text-pink-200 transition">
                    <Link to="/signup">Signup</Link>
                </li>
            )}

            {/* Login */}
            {!user && (
                <li className="hover:text-pink-200 transition">
                    <Link to="/login">Login</Link>
                </li>
            )}

            {/* User Profile */}
            {user?.role === "user" && (
                <li className="hover:text-pink-200 transition">
                    <Link to="/user-dashboard">
                        <FaUserCircle className="inline mr-1" /> Profile
                    </Link>
                </li>
            )}

            {/* Admin Panel */}
            {user?.role === "admin" && (
                <li className="hover:text-pink-200 transition">
                    <Link to="/admin-dashboard">
                        <MdAdminPanelSettings className="inline mr-1" /> Admin Panel
                    </Link>
                </li>
            )}

            {/* Logout */}
            {user && (
                <li
                    onClick={logout}
                    className="cursor-pointer hover:text-pink-200 transition"
                >
                    <FaSignOutAlt className="inline mr-1" /> Logout
                </li>
            )}

            {/* Cart */}
            <li className="hover:text-pink-200 transition">
                <Link to="/cart">
                    <FaShoppingCart className="inline mr-1" /> Cart ({cartItems.length})
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="bg-pink-600 sticky top-0 z-50 shadow-lg">
            {/* Desktop and Mobile Navbar */}
            <div className="container mx-auto flex justify-between items-center py-3 px-5 lg:px-10">
                {/* Left Section - Brand Logo */}
                <div className="flex items-center">
                    <Link to="/">
                        <h1 className="text-white font-extrabold text-3xl">uLOOK</h1>
                    </Link>
                </div>

                {/* Center Section - Navigation Menu */}
                <div className="hidden lg:flex">{navList}</div>

                {/* Right Section - Search Bar */}
                <div className="hidden lg:flex items-center space-x-4">
                    <SearchBar />
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="text-white text-2xl focus:outline-none"
                    >
                        {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="bg-pink-500 lg:hidden">
                    <div className="flex flex-col space-y-4 p-5">{navList}</div>
                    {/* Search Bar for Mobile */}
                    <div className="p-5">
                        <SearchBar />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
