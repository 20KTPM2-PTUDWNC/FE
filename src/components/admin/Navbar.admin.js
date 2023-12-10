import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { logout, selectUser } from "../../features/userSlice";
import { getProfile } from "../../api/user/user.api";
import Search from "../app/Search";
import { getUser, singout } from "../../features/user";
import { signOut } from "../../api/auth/auth.api";
import { SiGoogleclassroom } from "react-icons/si";
import { FaUser, FaBan, FaMapMarkerAlt } from "react-icons/fa";
import { GoTriangleUp } from "react-icons/go";
function NavbarAdmin() {
    const user = getUser();

    const [keyword, setKeyword] = useState("");

    const [tab, setTab] = useState(0)
    const [accountsManage, setAccountsManage] = useState(1)
    const navigate = useNavigate();
    const [contentVisible, setContentVisible] = useState(false);
    const handleLogout = async (e) => {
        e.preventDefault();
        console.log(`profile/${user?._id}`)
        try {
            signOut()
            singout();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = () => {
        if (keyword.trim() !== "") {
            navigate(`/search/${keyword}`);
        }
    };
    const handleToggleContent = () => {
        setContentVisible(!contentVisible);
    };
    return (
        <aside className="fixed inset-y-0 left-0 top- bg-white shadow-md max-h-screen w-120 ">
            <div className="flex flex-col items-center h-full">
                <div className="flex-grow">
                    <div className="px-4 py-6 text-center border-b">
                        <h1 className="text-xl font-bold leading-none"><span className="text-yellow-700">Class Room</span> Management</h1>
                    </div>
                    <div className="p-4 ">
                        <ul className="space-y-1 transition-all">

                            <li onClick={() => setTab(1)}>
                                <div to="/admin/class"
                                    onClick={handleToggleContent}
                                    className={`relative flex items-center ${tab===1 ? 'bg-yellow-200' :'bg-white hover:bg-yellow-50'} rounded-xl font-bold text-sm text-yellow-900 py-3 px-4`}>
                                    <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4">
                                        <FaUser />
                                    </svg>
                                    Account
                                    <svg width="1em" height="1em" fill="currentColor" className={`text-lg mr-4 absolute right-0 transition-all duration-500  ${contentVisible ? 'rotate-0' : 'rotate-180'} `}>
                                        <GoTriangleUp />
                                    </svg>
                                </div>
                                <div
                                    className={`content transition-all duration-500 ${contentVisible ? 'max-h-96 overflow-hidden' : 'max-h-0 overflow-hidden'}`}
                                >
                                    <ul

                                        className="space-y-1 my-1"
                                    >

                                        <li onClick={() => setAccountsManage(1)}>
                                            <Link to="/admin/account"
                                                className={`flex items-center ${accountsManage===1 ? 'bg-yellow-200' :'bg-white hover:bg-yellow-50'} rounded-xl font-bold text-sm text-yellow-900 py-3 px-4`}

                                            >
                                                <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4" >
                                                    <FaUser />
                                                </svg>Manage accounts
                                            </Link>
                                        </li>
                                        <li onClick={() => setAccountsManage(2)}>
                                            <Link to="/admin/account"
                                                className={`flex items-center ${accountsManage===2 ? 'bg-yellow-200' :'bg-white hover:bg-yellow-50'} rounded-xl font-bold text-sm text-gray-900 py-3 px-4`}
                                            >
                                                <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4   ">
                                                    <FaBan />
                                                </svg>Ban/Unban Accounts
                                            </Link>
                                        </li>
                                        <li onClick={() => setAccountsManage(3)}>
                                            <Link to="/admin/account"
                                                className={`flex items-center ${accountsManage===3 ? 'bg-yellow-200' :'bg-white hover:bg-yellow-50'} rounded-xl font-bold text-sm text-gray-900 py-3 px-4`}
                                            >
                                                <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4   ">
                                                    <FaMapMarkerAlt />
                                                </svg>Map/Unmap StudentId
                                            </Link>
                                        </li>


                                    </ul>
                                </div>
                            </li>
                            <li onClick={() => {                               
                                setTab(2)
                            }}>
                                <Link to="/admin/class" className={` transition-all flex items-center ${tab===2 ? 'bg-yellow-200' :'bg-white hover:bg-yellow-50'} rounded-xl font-bold text-sm text-gray-900 py-3 px-4`}>
                                    <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4">
                                        <SiGoogleclassroom />
                                    </svg>
                                    Class
                                </Link>
                            </li>

                        </ul>

                    </div>
                </div>
                <div className="p-4">
                    <button type="button" className="flex items-center  h-9 px-12 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="" viewBox="0 0 16 16">
                            <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                        </svg>
                        <span className="font-bold text-sm ml-2">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default NavbarAdmin;
