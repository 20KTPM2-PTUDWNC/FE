import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
// import Logo from "../../assets/idol.jpg"
import { getProfile } from "../../api/user/user.api";
import Search from "./Search";
import { getUser, singout } from "../../features/user";
import { signOut } from "../../api/auth/auth.api";
import { IoIosNotificationsOutline } from "react-icons/io";
import { getNoti } from "../../api/notification/noti.api";

function Navbar() {
    const user = getUser();

    const [keyword, setKeyword] = useState("");
    const [notiOpen, setNotiOpen] = useState(false)
    const [noti, setNoti] = useState([])
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
    const data = [
        {
            "_id": "65872799de9f5250b40b58a4",
            "title": "New grade",
            "description": "You just got the score for the assignment W1",
            "url": `class/assignment/${user?._id}`,
            "receiverId": "654c4cfc9de62dc1d300528d",
            "mark": 0,
            "deleteAt": null,
            "createdAt": "2023-12-23T18:31:53.705Z",
            "updatedAt": "2023-12-23T18:31:53.705Z",
            "__v": 0
        },
        {
            "_id": "65872bb4a0fe8ed26f970a41",
            "title": "Final grade",
            "description": "Your teacher makes the final decision on the IA01 assignment grade",
            "url": `class/assignment/${user?._id}`,
            "receiverId": "654c4cfc9de62dc1d300528d",
            "mark": 0,
            "deleteAt": null,
            "createdAt": "2023-12-23T18:49:24.642Z",
            "updatedAt": "2023-12-23T18:49:24.642Z",
            "__v": 0
        }
    ]
    const fetchData = async () => {
        const res = await getNoti(user?._id)
        setNoti(res.data)
        console.log(res.data)
    }
    useEffect(() => {
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notiOpen]); // Empty dependency array ensures the effect runs only once on mount
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

                        <li className="relative items-center">
                            <div className="items-center">
                                <button onClick={() => setNotiOpen(!notiOpen)}>
                                    <IoIosNotificationsOutline
                                        size={"30px"}
                                    // style={{ cursor: "pointer" }}
                                    />
                                </button>
                            </div>
                            {notiOpen &&
                                <div className="absolute bg-white overflow-y-auto overflow-x-auto right-[30px] w-[500px]  h-[300px] shadow-lg rounded-lg content-center items-center">
                                    {noti.length === 0 ?
                                        <div id="toast-success" className="flex items-center w-full w-[500px] p-4 m-2 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" >
                                            <h2 className="text-center">Nothing</h2>
                                        </div>
                                        :
                                        noti.map((notification, index) =>
                                            <div key={index} className="flex items-center justify-center w-11/12 p-4 m-5 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
                                                <div className="inline-flex items-center justify-center flex-shrink-0 ">
                                                    <p>{notification.title}</p>
                                                </div>
                                                <div className="ms-3 text-sm font-normal">{notification.description}</div>
                                                <a href={`/#/${notification.url}`} className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                                                    <p>{">"}</p>
                                                </a>
                                            </div>
                                        )

                                    }

                                    


                                </div>
                            }

                        </li>
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
