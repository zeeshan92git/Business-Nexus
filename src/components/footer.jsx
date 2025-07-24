import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-300 py-10 w-full px-6 mt-14">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-orange-500 mb-2">Business Nexus</h2>
                    <p className="text-sm">
                        Empowering entrepreneurs and investors to collaborate, grow, and succeed together.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="font-semibold mb-3 text-lg">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-orange-400">Home</a></li>
                        <li><a href="/about" className="hover:text-orange-400">About</a></li>
                        <li><a href="/dashboard" className="hover:text-orange-400">Dashboard</a></li>
                        <li><a href="/profile" className="hover:text-orange-400">Profile</a></li>
                    </ul>
                </div>

                {/* Social & Contact */}
                <div>
                    <h3 className="font-semibold mb-3 text-lg">Connect With Us</h3>
                    <div className="flex space-x-4 mb-4">
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-orange-400">
                            <FaLinkedinIn />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-orange-400">
                            <FaTwitter />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-orange-400">
                            <FaFacebookF />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-orange-400">
                            <FaGithub />
                        </a>
                    </div>
                    <p className="text-sm">Email: support@businessnexus.com</p>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-300">
                &copy; {new Date().getFullYear()} Business Nexus. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
