import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCookies, getUser } from "../features/user";
import Logo from "../assets/cover.jpg";
import Cookies from "universal-cookie";

function NotFound(){
    
    return(
        <div className="pt-[120px] pb-[50px]  max-w-[1100px] mx-auto p-4 flex flex-col justify-center content-center items-center w-full h-screen">
            <h1 className="text-4xl font-bold">Page Not Found</h1>
        </div>
    );
}
export default NotFound;