import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { logout, selectUser } from "../../features/userSlice";
import { getProfile } from "../../api/user/user.api";
import Search from "../app/Search";
import { getUser, singout } from "../../features/user";
import { signOut } from "../../api/auth/auth.api";
import { SiGoogleclassroom } from "react-icons/si";
import { FaUser } from "react-icons/fa";
function NavbarAdmin() {
    const user = getUser();

    const [keyword, setKeyword] = useState("");

    const [tab, setTab] = useState(1)
    const navigate = useNavigate();

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

    return (
        <aside className="fixed inset-y-0 left-0 top- bg-white shadow-md max-h-screen w-100">
            <div className="flex flex-col justify-between h-full">
                <div className="flex-grow">
                    <div className="px-4 py-6 text-center border-b">
                        <h1 className="text-xl font-bold leading-none"><span className="text-yellow-700">Class Room</span> Management</h1>
                    </div>
                    <div className="p-4">
                        <ul className="space-y-1">
                            {tab === 1 &&
                                <>
                                    <li onClick={() => setTab(1)}>
                                        <Link to="/admin/account" className="flex items-center bg-yellow-200 rounded-xl font-bold text-sm text-yellow-900 py-3 px-4">
                                            <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4" >
                                                {/* <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" /> */}
                                                <FaUser />
                                            </svg>Accounts
                                        </Link>
                                    </li>
                                    <li onClick={() => setTab(2)}>
                                        <Link to="/admin/class" className="flex items-center bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4">
                                            <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4   ">
                                                {/* <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z" /> */}
                                                <SiGoogleclassroom />
                                            </svg>Class
                                        </Link>
                                    </li>
                                </>
                            }
                            {tab === 2 &&
                                <>
                                    <li onClick={() => setTab(1)}>
                                        <Link to="/admin/account"  className="flex items-center rounded-xl font-bold text-sm text-yellow-900 py-3 px-4">
                                            <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4" >
                                                {/* <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" /> */}
                                                <FaUser />
                                            </svg>Accounts
                                        </Link>
                                    </li>
                                    <li onClick={() => setTab(2)}>
                                        <Link to="/admin/class" className="flex items-center bg-yellow-200 hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4">
                                            <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4   ">
                                                {/* <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z" /> */}
                                                <SiGoogleclassroom />
                                            </svg>Class
                                        </Link>
                                    </li>
                                </>
                            }
                            {/* <li>
                                <Link to="javascript:void(0)" className="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-lg mr-4" viewBox="0 0 16 16">
                                        <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                                    </svg>Projects
                                </Link>
                            </li>
                            <li>
                                <Link to="javascript:void(0)" className="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-lg mr-4 mt-1" viewBox="0 0 16 16">
                                        <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>Tags
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
                <div className="p-4">
                    <button type="button" className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="" viewBox="0 0 16 16">
                            <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                        </svg>
                    </button> <span className="font-bold text-sm ml-2">Logout</span>
                </div>
            </div>
        </aside>
    );
}

export default NavbarAdmin;