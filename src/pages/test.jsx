import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCookies, getUser } from "../features/user";
import Logo from "../assets/cover.jpg";
import Cookies from "universal-cookie";

function Admin(){
    
    return(
        <div className="pt-[120px] pb-[50px] pl-[15%] max-w-[1100px] mx-auto p-4 flex flex-col justify-center w-full h-full">
            <div className="grid grid-cols-2 grid-flow-row gap-10 text-center">
                <button className="flex items-center bg-[#ff4757] mr-5 text-white py-1 px-3 rounded-lg hover:opacity-80 shadow-md w-[150px] h-[150px]">
                    Manage user accounts
                </button> 

                <button className="flex items-center bg-[#ff4757] mr-5 text-white py-1 px-3 rounded-lg hover:opacity-80 shadow-md w-[150px] h-[150px]">
                    Lock/ban an account
                </button>

                <button className="flex items-center bg-[#ff4757] mr-5 text-white py-1 px-3 rounded-lg hover:opacity-80 shadow-md w-[150px] h-[150px]">
                    Map/unmap the StudentId
                </button>

                <button className="flex items-center bg-[#ff4757] mr-5 text-white py-1 px-3 rounded-lg hover:opacity-80 shadow-md w-[150px] h-[150px]">
                    Manage classes
                </button>
            </div>
        </div>
    );
}
export default Admin;