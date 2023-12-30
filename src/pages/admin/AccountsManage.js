/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllClassById } from "../../api/class/class.api.js";
import Filter from "../../components/app/Filter";
import Jobs from "../../components/app/Jobs";
import { getCookies, getUser } from "../../features/user";
import Logo from "../../assets/cover.jpg";
import AddNewClass from "../../components/app/AddNewClassForm";
import JoinClass from "../../components/app/JoinClassForm";
import Cookies from "universal-cookie";
import { FaBan, FaCheck } from "react-icons/fa";

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
    const [status, setStatus] = useState(false)
    // useEffect(() => {
    //     if (!user) {
    //         navigate("/signin")
    //     }
    //     else {
    //         cookie.set('token', getCookies(), { path: `/v1/className/getAllClassById` });
    //     }
    // }, [])
    // useEffect(() => {
    //     if (showAddNewClass || showJoinClass) {
    //         document.body.classList.add("overflow-hidden");
    //     } else {
    //         document.body.classList.remove("overflow-hidden");
    //     }
    // }, [showAddNewClass, showJoinClass]);
    // const [images, setImages] = useState([])

    // useEffect(() => {
    //     async function fetchClasses() {
    //         try {
    //             const response = await getAllClassById();
    //             if (response.status === 200) {
    //                 setListClass(response.data);
    //             }
    //         } catch (error) {
    //             console.log("Error: ", error);
    //         }
    //     }
    //     fetchClasses();
    // }, [isAddClass]);

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
                                            {body.map((row, rowIndex) => (
                                                <tr
                                                    key={rowIndex}
                                                    className={`${rowIndex % 2 === 0
                                                        ? 'even:bg-gray-50 even:dark:bg-gray-800'
                                                        : 'odd:bg-white odd:dark:bg-gray-900'
                                                        } border-b dark:border-gray-700`}
                                                >
                                                    {row.map((data, colIndex) => (
                                                        <td key={colIndex} className="px-6 py-4 text-center">
                                                            {colIndex === row.length - 1 ? (data ?
                                                                <button
                                                                    className="rounded-lg px-5 py-2 bg-green-500 text-white dark:text-blue-500 hover:bg-green-600"
                                                                    onClick={() => alert("Ban/Unban Account")}
                                                                >
                                                                    <p className="flex flex-row">
                                                                        <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4   ">
                                                                            <FaCheck />
                                                                        </svg> Active
                                                                    </p>
                                                                </button>
                                                                :
                                                                <button
                                                                    className="rounded-lg px-7 py-2 bg-red-500 text-white dark:text-blue-500 hover:bg-red-600"
                                                                    onClick={() => alert("Ban/Unban Account")}
                                                                >
                                                                    <p className="flex flex-row">
                                                                        <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4   ">
                                                                            <FaBan />
                                                                        </svg> Ban
                                                                    </p>
                                                                </button>) : data}
                                                        </td>
                                                    ))}

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* <div>
                                    <h2 className="text-2xl font-bold mb-4">Stats</h2>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <div className="p-4 bg-green-100 rounded-xl">
                                                <div className="font-bold text-xl text-gray-800 leading-none">Good day, <br />Kristin</div>
                                                <div className="mt-5">
                                                    <button type="button" className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition">
                                                        Start tracking
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                                            <div className="font-bold text-2xl leading-none">20</div>
                                            <div className="mt-2">Tasks finished</div>
                                        </div>
                                        <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                                            <div className="font-bold text-2xl leading-none">5,5</div>
                                            <div className="mt-2">Tracked hours</div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="p-4 bg-purple-100 rounded-xl text-gray-800">
                                                <div className="font-bold text-xl leading-none">Your daily plan</div>
                                                <div className="mt-2">5 of 8 completed</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Your tasks today</h2>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                                            <div className="flex justify-between">
                                                <div className="text-gray-400 text-xs">Number 10</div>
                                                <div className="text-gray-400 text-xs">4h</div>
                                            </div>
                                            <Link to="javascript:void(0)" className="font-bold hover:text-yellow-800 hover:underline">Blog and social posts</Link>
                                            <div className="text-sm text-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-gray-800 inline align-middle mr-1" viewBox="0 0 16 16">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                </svg>Deadline is today
                                            </div>
                                        </div>
                                        <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                                            <div className="flex justify-between">
                                                <div className="text-gray-400 text-xs">Grace Aroma</div>
                                                <div className="text-gray-400 text-xs">7d</div>
                                            </div>
                                            <Link to="javascript:void(0)" className="font-bold hover:text-yellow-800 hover:underline">New campaign review</Link>
                                            <div className="text-sm text-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-gray-800 inline align-middle mr-1" viewBox="0 0 16 16">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                </svg>New feedback
                                            </div>
                                        </div>
                                        <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
                                            <div className="flex justify-between">
                                                <div className="text-gray-400 text-xs">Petz App</div>
                                                <div className="text-gray-400 text-xs">2h</div>
                                            </div>
                                            <Link to="javascript:void(0)" className="font-bold hover:text-yellow-800 hover:underline">Cross-platform and browser QA</Link>
                                        </div>

                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}

export default AccountsManage;
