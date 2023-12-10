import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { logout, selectUser } from "../../features/userSlice";
import { getProfile } from "../../api/user/user.api";
import Search from "./Search";
import { getUser, singout } from "../../features/user";
import { signOut } from "../../api/auth/auth.api";

function Navbar() {
    const user = getUser();

    const [keyword, setKeyword] = useState("");

    const dispatch = useDispatch();
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
        <div className="fixed bg-white w-full h-[80px] flex justify-between items-center px-4 border-b-2 border-[#5f27cd] text-[#5f27cd] z-20">
            <div>
                <Link to="/home">
                    <img className="rounded" src={Logo} alt="Logo" style={{ width: "50px", cursor: "pointer" }} />
                </Link>
            </div>

            <div className="w-[700px] hidden md:block">
                <Search setKeyword={setKeyword} handleSearch={handleSearch} />
            </div>

            {/* Menu */}
            <ul className="font-bold hidden md:flex items-center">
                {/* md:flex nghĩa là sẽ được hiển thị flexbox trên các thiết bị có độ rộng màn hình lớn hơn hoặc bằng 768px */}
                <li>
                    <Link to="/home">Home</Link>
                </li>
                {/* <li>
                    <Link to="/hotjobs">Hot Jobs</Link>
                </li> */}

                {!user && (
                    <>
                        <li>
                            <Link to="/signin">Sign In</Link>
                        </li>
                        <li>
                            <Link to="/signup">
                                <button className="bg-[#ff4757] text-white py-2 px-3 rounded hover:opacity-90">
                                    Sign Up
                                </button>
                            </Link>
                        </li>
                    </>
                )}

                {user && (
                    <>
                        <li>
                            <Link to={`/user/${user?._id}`}>
                                <img
                                    className="rounded-full"
                                    src={Logo}
                                    alt="Avatar"
                                    title="Profile"
                                    style={{ width: "50px", cursor: "pointer" }}
                                />
                            </Link>
                        </li>

                        <li>
                            <Link to="/logout">
                                <button
                                    className="bg-[#ff4757] text-white py-2 px-3 rounded-lg hover:opacity-90"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Navbar;
