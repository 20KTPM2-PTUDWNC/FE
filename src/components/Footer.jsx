import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-gray-800 px-4 py-12 font-sans">
            <div className="max-w-[1350px] container mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between">
                    <div className="">
                        <h2 className="text-2xl font-bold text-white mb-4">App</h2>
                        <p className="text-gray-400">Connect with us on social media</p>
                        <div className="flex mt-4">
                            <a href="/" className="mr-4">
                                <FaFacebook className="text-white hover:text-[#00ADB5]" size={24} />
                            </a>
                            <a href="/" className="mr-4">
                                <FaTwitter className="text-white hover:text-[#00ADB5]" size={24} />
                            </a>
                            <a href="/" className="mr-4">
                                <FaInstagram className="text-white hover:text-[#00ADB5]" size={24} />
                            </a>
                        </div>
                    </div>
                    <div className="">
                        <h3 className="text-white font-bold mb-4">Contact Us</h3>
                        <p className="text-gray-400">227 Nguyen Van Cu</p>
                        <p className="text-gray-400">District 5, Ho Chi Minh City</p>
                        <p className="text-gray-400">Email: jobee@gmail.com</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
