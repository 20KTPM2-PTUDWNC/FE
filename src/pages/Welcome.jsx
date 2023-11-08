import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
    return (
        <div name="home" className="w-full h-screen text-gray-300 bg-gradient-to-r from-[#000000] to-[#393E46]">
            <div className="pt-[120px] pb-[50px] max-w-[1100px] mx-auto p-4 flex flex-row justify-between w-full h-full">
                <div className="bg-[url(https://placekitten.com/600)] h-[600px] w-[600px] relative">
                    <div className="absolute bottom-0 px-4 py-3 bg-gray-500/50 w-full">
                        <h1 className="text-white font-semibold text-4xl"> Welcome </h1>
                        <p className="text-gray-200">
                            Welcome to our app
                        </p>
                    </div>
                </div>
                <div className="flex flex-col align-center justify-center">
                    <p className="text-4xl font-bold inline text-[#00ADB5]  text-center">
                        Welcome
                    </p>
                    <div className="mt-20 flex flex-row justify-between">
                        <Link to="/home" className="mr-10">
                            <button className="bg-[#1B9C85] text-white font-bold py-2 px-3 rounded hover:opacity-90 w-40 h-16">
                                Home 
                            </button>
                        </Link>
                        <Link to="/signin">
                            <button className="bg-white border-b-2 border-[#1B9C85] text-[#1B9C85] font-bold py-2 px-3 rounded hover:opacity-90 w-40 h-16">
                                Sign In
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}