import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import Search from "../app/Search";
import { getUser, singout } from "../../features/user";
import { signOut } from "../../api/auth/auth.api";
import { SiGoogleclassroom } from "react-icons/si";
import { FaUser, FaBan, FaMapMarkerAlt } from "react-icons/fa";
import { GoTriangleUp } from "react-icons/go";
import { MdManageAccounts } from "react-icons/md";
import { getAdapter } from "axios";
import { getAllUser } from "../../api/user/user.api";
import { IoIosNotificationsOutline } from "react-icons/io";
import { getNoti } from "../../api/notification/noti.api";
const chatData = [
    {
        "user": {
            "_id": "654c4cfc9de62dc1d300528d",
            "name": "lethuynga"
        },
        "reviews": [
            {
                "text": "hello",
                "sort": "1",
                "userId": {
                    "_id": "654c4cfc9de62dc1d300528d",
                    "name": "lethuynga"
                }
            }
        ]
    },
    {
        "user": {
            "_id": "6564c07277616e8efdc4d54e",
            "name": "ngochai"
        },
        "reviews": [
            {
                "text": "my studentId is 20127490 but someone mapped it",
                "sort": "1",
                "userId": {
                    "_id": "6564c07277616e8efdc4d54e",
                    "name": "ngochai"
                }
            },
            {
                "text": "can u check it",
                "sort": "2",
                "userId": {
                    "_id": "6564c07277616e8efdc4d54e",
                    "name": "ngochai"
                }
            },
            {
                "text": "hey",
                "sort": "3",
                "userId": {
                    "_id": "6564c07277616e8efdc4d54e",
                    "name": "ngochai"
                }
            },
            {
                "text": "alo",
                "sort": "4",
                "userId": {
                    "_id": "6564c07277616e8efdc4d54e",
                    "name": "ngochai"
                }
            }
        ]
    }
]
function NavbarAdmin() {
    const user = getUser();

    const [keyword, setKeyword] = useState("");

    const [tab, setTab] = useState(0)
    const [accountsManage, setAccountsManage] = useState(1)
    const navigate = useNavigate();
    const [contentVisible, setContentVisible] = useState(false);
    const [contentVisible2, setContentVisible2] = useState(false);
    const [customer, setCustomer] = useState([])
    const [customerSelected, setCustomerSelected] = useState(0)
    const [notiOpen, setNotiOpen] = useState(false)
    const [noti, setNoti] = useState([])
    const getUserData = async () => {
        const res = await getAllUser()
        setCustomer(res.data)
    }
    const fetchData = async () => {
        const res = await getNoti(user?._id)
        setNoti(res.data)
        console.log(res.data)
    }
    useEffect(() => {
        fetchData()


    }, [notiOpen]); // Empty dependency array ensures the effect runs only once on mount
    useEffect(() => {
        getUserData()
    }, [])
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
    const handleToggleContent2 = () => {
        setContentVisible2(!contentVisible2);
    };
    return (
        <aside className="fixed inset-y-0 left-0 top- bg-white shadow-md max-h-screen w-120  ">
            <div className="flex flex-col items-center h-full">
                <div className="flex-grow relative">
                    <div className="px-4 py-6 text-center border-b flex flex-row ">
                        <h1 className="text-xl font-bold leading-none"><span className="text-yellow-700">Class Room</span> Management</h1>
                        <div className="items-center">
                            <button onClick={() => setNotiOpen(!notiOpen)}>
                                <IoIosNotificationsOutline
                                    size={"30px"}
                                // style={{ cursor: "pointer" }}
                                />
                            </button>
                        </div>
                        {notiOpen &&
                            <div className="z-20 absolute bg-white overflow-y-auto overflow-x-auto top-[60px] right-[-200px] w-[500px]  h-[300px] shadow-lg rounded-lg content-center items-center">
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
                    </div>
                    <div className="p-4 z-20">
                        <ul className="space-y-1 transition-all">

                            <li onClick={() => setTab(1)}>
                                <div
                                    onClick={handleToggleContent}
                                    className={`relative flex items-center ${tab === 1 ? 'bg-yellow-200' : 'bg-white hover:bg-yellow-50'} rounded-xl font-bold text-sm text-yellow-900 py-3 px-4`}>
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

                                        {/* <li onClick={() => setAccountsManage(1)}>
                                            <Link to="/admin/account"
                                                className={`flex items-center ${accountsManage===1 ? 'bg-yellow-200' :'bg-white hover:bg-yellow-50'} rounded-xl font-bold text-sm text-yellow-900 py-3 px-4`}

                                            >
                                                <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4" >
                                                    <FaUser />
                                                </svg>Manage accounts
                                            </Link>
                                        </li> */}
                                        <li onClick={() => setAccountsManage(2)}>
                                            <Link to="/admin/account/banAccount"
                                                className={`flex items-center ${accountsManage === 2 ? 'bg-yellow-200' : 'bg-white hover:bg-yellow-50'} rounded-xl font-bold text-sm text-gray-900 py-3 px-4`}
                                            >
                                                <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4   ">
                                                    <MdManageAccounts />
                                                </svg>Manage Accounts
                                            </Link>
                                        </li>
                                        <li onClick={() => setAccountsManage(3)}>
                                            <Link to="/admin/account/mapStudentID"
                                                className={`flex items-center ${accountsManage === 3 ? 'bg-yellow-200' : 'bg-white hover:bg-yellow-50'} rounded-xl font-bold text-sm text-gray-900 py-3 px-4`}
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
                                <Link to="/admin/class" className={` transition-all flex items-center ${tab === 2 ? 'bg-yellow-200' : 'bg-white hover:bg-yellow-50'} rounded-xl font-bold text-sm text-yellow-900 py-3 px-4`}>
                                    <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4">
                                        <SiGoogleclassroom />
                                    </svg>
                                    Class
                                </Link>
                            </li>
                            <li onClick={() => setTab(3)}>
                                <div
                                    onClick={handleToggleContent2}
                                    className={`relative flex items-center ${tab === 3 ? 'bg-yellow-200' : 'bg-white hover:bg-yellow-50'} rounded-xl font-bold text-sm text-yellow-900 py-3 px-4`}>
                                    <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4">
                                        <IoChatbubbleEllipsesOutline />
                                    </svg>
                                    Customer Service
                                    <svg width="1em" height="1em" fill="currentColor" className={`text-lg mr-4 absolute right-0 transition-all duration-500  ${contentVisible2 ? 'rotate-0' : 'rotate-180'} `}>
                                        <GoTriangleUp />
                                    </svg>
                                </div>
                                <div
                                    className={`content transition-all duration-500 ${contentVisible2 ? 'max-h-96 overflow-hidden overflow-y-auto' : 'max-h-0 overflow-hidden'}`}
                                >
                                    <ul

                                        className="space-y-1 my-1"
                                    >

                                        {customer.map((c, index) =>
                                            <li key={index} onClick={() => {
                                                sessionStorage.setItem("customerSelected", c._id)
                                                setCustomerSelected(c._id)
                                            }}>
                                                <Link to={`/admin/CSKH/${c._id}`}
                                                    className={`flex items-center ${customerSelected === c._id ? 'bg-yellow-200' : 'bg-white hover:bg-yellow-50'} rounded-xl font-bold text-sm text-gray-900 py-3 px-4`}
                                                >
                                                    <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4   ">
                                                        <FaUser />
                                                    </svg>{c.name}
                                                </Link>
                                            </li>
                                        )}



                                    </ul>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
                <div className="p-4">
                    <button
                        type="button"
                        className="flex items-center  h-9 px-12 rounded-xl bg-gray-900 text-white hover:text-white text-sm font-semibold transition"
                        onClick={(e) => handleLogout(e)}
                    >
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
