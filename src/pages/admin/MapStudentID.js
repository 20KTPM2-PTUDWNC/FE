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
import { FaLock, FaUnlock, FaCheck } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa6";
import UploadFileForm from "../../components/public/UploadFileForm.js";

function MapStudentID() {
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
    const [editedStudentId, setEditedStudentId] = useState('');
    const list = [
        {
            "studentId": "12345",
            "name": "Nguyen Van A",
            "status": true
        },
        {
            "studentId": "12345",
            "name": "Nguyen Van A",
            "status": true
        },
        {
            "studentId": "12345",
            "name": "Nguyen Van A",
            "status": false
        },
    ]
    const headerSet = new Set(list.flatMap(obj => Object.keys(obj)))
    const header = Array.from(headerSet)
    const body = list.map(obj => Object.values(obj))
    const listData = [header, ...body]
    const [status, setStatus] = useState(false)
    const [showMappingCSV, setShowMappingCSV] = useState(false)
    // useEffect(() => {
    //     if (!user) {
    //         navigate("/signin")
    //     }
    //     else {
    //         cookie.set('token', getCookies(), { path: `/v1/className/getAllClassById` });
    //     }
    // }, [])
    useEffect(() => {
        if (showMappingCSV) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [showMappingCSV]);
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
            <main className=" ml-60 pt-16 h-screen bg-yellow-50 overflow-auto">
                <div className="px-6 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl p-8 mb-5">
                            <div className="flex flex-row justify-between">
                                <h1 className="text-3xl font-bold mb-10">Mapping Student ID</h1>
                                <button
                                    className="rounded-lg px-7 py-2 h-9 items-center bg-yellow-200 text-yellow-900 dark:text-blue-500 hover:bg-yellow-100"
                                    onClick={() => setShowMappingCSV(!showMappingCSV)}
                                >
                                    <p className="flex flex-row font-semibold">
                                        <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4   ">
                                            <FaFileCsv />
                                        </svg> Mapping with CSV
                                    </p>
                                </button>
                            </div>
                            {/* <div className="flex items-center justify-between">
                                <div className="flex items-stretch">
                                    <div className="text-gray-400 text-xs">Members<br />connected</div>
                                    <div className="h-100 border-l mx-4"></div>
                                    <div className="flex flex-nowrap -space-x-3">
                                        <div className="h-9 w-9">
                                            <img className="object-cover w-full h-full rounded-full" src="https://ui-avatars.com/api/?background=random" />
                                        </div>
                                        <div className="h-9 w-9">
                                            <img className="object-cover w-full h-full rounded-full" src="https://ui-avatars.com/api/?background=random" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <button type="button" className="inline-flex items-center justify-center h-9 px-3 rounded-xl border hover:border-gray-400 text-gray-800 hover:text-gray-900 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-chat-fill" viewBox="0 0 16 16">
                                            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition">
                                        Open
                                    </button>
                                </div>
                            </div> */}

                            <hr className="mb-10" />

                            {/* <div className="grid grid-cols-2 gap-x-20"> */}
                            <div>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-2">

                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                {header.map((col, index) => (
                                                    <th key={index} scope="col" className="px-6 py-3 text-center">
                                                        {col}
                                                    </th>
                                                ))}
                                                <th scope="col" className="px-6 py-3 text-center">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {body.map((row, rowIndex) => (
                                                <tr
                                                    key={rowIndex}
                                                    className={`text-center ${rowIndex % 2 === 0
                                                        ? 'even:bg-gray-50 even:dark:bg-gray-800'
                                                        : 'odd:bg-white odd:dark:bg-gray-900'
                                                        } border-b dark:border-gray-700`}
                                                >
                                                    {row.map((data, colIndex) => (
                                                        <td key={colIndex} className="px-6 py-4">
                                                            {colIndex === 0 ? (
                                                                <input
                                                                    type="text"
                                                                    value={editedStudentId === rowIndex ? editedStudentId : data}
                                                                    onChange={(e) => setEditedStudentId(e.target.value)}
                                                                    className="text-center"
                                                                />
                                                            ) : colIndex === row.length - 1 ? (
                                                                data ? (
                                                                    'Active'
                                                                ) : (
                                                                    'Banned'
                                                                )
                                                            ) : (
                                                                data
                                                            )}
                                                        </td>
                                                    ))}
                                                    <td className="px-6 py-4 text-center">
                                                        <button
                                                            className="rounded-lg px-7 py-2 bg-yellow-200 text-yellow-900 dark:text-blue-500 hover:bg-yellow-100"
                                                            onClick={() => alert("Ban/Unban Account")}
                                                        >
                                                            <p className="flex flex-row">
                                                                <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4   ">
                                                                    <FaLock />
                                                                </svg> Map
                                                            </p>
                                                        </button>
                                                        <button
                                                            className="rounded-lg ml-3 px-7 py-2 bg-yellow-200 text-yellow-900 dark:text-blue-500 hover:bg-yellow-100"
                                                            onClick={() => alert("Ban/Unban Account")}
                                                        >
                                                            <p className="flex flex-row">
                                                                <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4   ">
                                                                    <FaUnlock />
                                                                </svg> Un Map
                                                            </p>
                                                        </button>
                                                    </td>
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
                {showMappingCSV &&
                    <UploadFileForm
                        onClose={() => setShowMappingCSV(!showMappingCSV)}

                    />}
            </main>


        </>
    );
}

export default MapStudentID;
