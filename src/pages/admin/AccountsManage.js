/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUser, lockAccount } from "../../api/user/user.api.js";
import Filter from "../../components/app/Filter";
import Jobs from "../../components/app/Jobs";
import { getCookies, getUser } from "../../features/user";
import Logo from "../../assets/cover.jpg";
import AddNewClass from "../../components/app/AddNewClassForm";
import JoinClass from "../../components/app/JoinClassForm";
import Cookies from "universal-cookie";
import { FaBan, FaCheck } from "react-icons/fa";

import { banAcc, getAllUser } from "../../api/user/user.api";


import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


function AccountsManage() {
    // const [jobs, setJobs] = useState([]);
    // const [pageNumber, setPageNumber] = useState(1);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [filter, setFilter] = useState({});

    // useEffect(() => {
    //     const fetchJobs = async () => {
    //         const response = await getJobs({ page: currentPage, ...filter });
    //         setJobs(response.data.posts);
    //         setPageNumber(response.data.totalPages);
    //     };

    //     fetchJobs();
    // }, [filter, currentPage]);

    // const handleFilter = (filter) => {
    //     setFilter(filter);
    //     setCurrentPage(1);
    // };
    const navigate = useNavigate();
    const user = getUser();
    const cookie = new Cookies();
    const list = [
        {
            "studentId": "12345",
            "name": "Nguyen Van A",
            "deleted_date": true
        },
        {
            "studentId": "12345",
            "name": "Nguyen Van A",
            "deleted_date": true
        },
        {
            "studentId": "12345",
            "name": "Nguyen Van A",
            "deleted_date": false
        }, {
            "studentId": "12345",
            "name": "Nguyen Van A",
            "deleted_date": true
        },
        {
            "studentId": "12345",
            "name": "Nguyen Van A",
            "deleted_date": true
        },
        {
            "studentId": "12345",
            "name": "Nguyen Van A",
            "deleted_date": false
        },
    ]
    const headerSet = new Set(list.flatMap(obj => Object.keys(obj)))
    const header = Array.from(headerSet)
    const body = list.map(obj => Object.values(obj))
    const listData = [header, ...body]
    const [userData, setUserData] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate("/signin")
        }

    }, [])

    useEffect(() => {
// <<<<<<< HEAD
//         getAllUsers()
//     }, [])


//     const [status, setStatus] = useState(false)
//     const handleBanAcc = async (id) => {
//         const res = await banAcc(id)
//         if (res.status !== 200) {
//             alert("Error when banning")
//         }
//     }
// =======
        async function fetchData() {
            try {
                const response = await getAllUser();
                if (response.status === 200) {
                    setUserData(response.data);
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        }

        fetchData();
    }, []);

    const lockAccountUser = async (userId) => {
        try {
            const confirmed = window.confirm(`Are you sure you want to lock this account?`);
            if (confirmed) {
                try {
                    const response = await lockAccount(userId);
                    if (response.status === 200) {
                        setUserData((prevUserData) => {
                            return prevUserData.map((user) =>
                                user._id === userId ? { ...user, deleteAt: new Date() } : user
                            );
                        });
                        alert("Lock account successfully!!");
                    }
                } catch (error) {
                    console.log('Error: ', error);
                }
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };


    return (
        <>           
            <main className="ml-60 pt-16 h-screen bg-yellow-50 overflow-auto">
                <div className="px-6 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white max-h-[600px] rounded-3xl p-8 mb-5">
                            <h1 className="text-3xl font-bold mb-10">Account Management</h1>


                            <hr className="mb-10" />

                            {/* <div className="grid grid-cols-2 gap-x-20"> */}
                            <div>
                                <div className="relative max-h-[389px] overflow-x-auto shadow-md sm:rounded-lg border-2">

                                    <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                {header.map((col, index) => (
                                                    <th key={index} scope="col" className="px-6 py-3 text-center">
                                                        {index === header.length - 1 ? "status" :
                                                            col
                                                        }
                                                    </th>
                                                ))}

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userData.map((user) => (
                                                <tr
                                                    key={user._id}
                                                    className={`${user._id % 2 === 0
                                                        ? 'even:bg-gray-50 even:dark:bg-gray-800'
                                                        : 'odd:bg-white odd:dark:bg-gray-900'
                                                        } border-b dark:border-gray-700`}
                                                >
                                                    <td className="px-6 py-4 text-center">{user.studentId}</td>
                                                    <td className="px-6 py-4 text-center">{user.name}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        {user.deleteAt === null ? (
                                                            <button
                                                            className="rounded-lg px-5 py-2 bg-green-500 text-white dark:text-blue-500 hover:bg-green-600"

                                                            onClick={() => lockAccountUser(user._id)}

                                                        >
                                                            <p className="flex flex-row">
                                                                <svg
                                                                    width="1em"
                                                                    height="1em"
                                                                    fill="currentColor"
                                                                    className="text-lg mr-4"
                                                                >
                                                                    <FaCheck />
                                                                </svg>{" "}
                                                                Active
                                                            </p>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="rounded-lg px-7 py-2 bg-red-500 text-white dark:text-blue-500 hover:bg-red-600"
                                                            onClick={() => alert("Ban/Unban Account")}
                                                        >
                                                            <p className="flex flex-row">
                                                                <svg
                                                                    width="1em"
                                                                    height="1em"
                                                                    fill="currentColor"
                                                                    className="text-lg mr-4"
                                                                >
                                                                    <FaBan />
                                                                </svg>{" "}
                                                                Ban
                                                            </p>
                                                        </button>
                                                    )}
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}

export default AccountsManage;