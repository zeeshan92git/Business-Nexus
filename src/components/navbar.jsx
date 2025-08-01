import React, { useContext, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { RiMenuUnfold3Line } from "react-icons/ri";
import { RiMenuFold3Line } from "react-icons/ri";
import { PiHandshakeFill } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

function Navbar() {
    const { handleLogOut, token } = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const handleLinkClick = (e, path) => {
        e.preventDefault();
        setIsOpen(false);
        setTimeout(() => {
            navigate(path);
        }, 300);
    };
    return (
        <header className=" bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between items-center h-16">

                    {/* Logo / Brand */}
                    <div className="flex items-center gap-2">
                        <div className="bg-white rounded-full p-2 flex items-center justify-center w-10 h-10 shadow-md">
                            <PiHandshakeFill className="text-orange-500 text-2xl" />
                        </div>
                        <span className="text-2xl font-bold text-orange-500 tracking-wide">
                            Business Nexus
                        </span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-6">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-orange-500 font-medium underline underline-offset-8 decoration-orange-500 decoration-[2px]" : "text-white font-medium hover:text-orange-400"
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? "text-orange-500 font-medium  underline underline-offset-8 decoration-orange-500 decoration-[2px] " : "text-white font-medium hover:text-orange-400"
                            }
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive ? "text-orange-500 font-medium underline underline-offset-8 decoration-orange-500 decoration-[2px]" : "text-white font-medium hover:text-orange-400"
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive ? "text-orange-500 font-medium underline underline-offset-8 decoration-orange-500 decoration-[2px]" : "text-white font-medium hover:text-orange-400"
                            }
                        >
                            Profile
                        </NavLink>
                    </div>

                    {/* Hamburger Icon */}
                    <div className="md:hidden flex items-center">
                        <button className="text-white hover:text-orange-300 focus:outline-none">
                            {isOpen ? (<RiMenuUnfold3Line onClick={() => setIsOpen(false)} className="text-2xl text-orange-500" />)
                                : (<RiMenuFold3Line onClick={() => setIsOpen(true)} className="text-2xl text-orange-500" />)}
                        </button>
                    </div>
                </div>

            </nav>

            {/* Right-side Slide-in Mobile Menu */}
            <div
                className={`fixed top-16 right-0 h-fit w-60 pb-2 bg-orange-500/90 rounded-l-sm shadow-lg transform transition-transform duration-300 z-[999] 
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className={`flex flex-col items-end text-[18px] ${token ? 'space-y-2' : 'space-y-4'}  px-6 mt-2`}>
                    <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="text-gray-800 hover:text-white font-bold">Home</a>
                    <a href="/about" onClick={(e) => handleLinkClick(e, '/about')} className="text-gray-800 hover:text-white font-bold">About</a>
                    <a href="/dashboard" onClick={(e) => handleLinkClick(e, '/dashboard')} className="text-gray-800 hover:text-white font-bold">Dashboard</a>
                    <a href="/profile" onClick={(e) => handleLinkClick(e, '/profile')} className="text-gray-800 hover:text-white font-bold">Profile</a>
                    {token &&
                        <button onClick={handleLogOut} className="text-gray-800 hover:text-white underline underline-offset-2  font-bold">Log out</button>
                    }
                </div>
            </div>

        </header>
    );
}

export default Navbar;
