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

function AdminPage() {
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
    const [showAddNewClass, setShowAddNewClass] = useState(false);
    const [showJoinClass, setShowJoinClass] = useState(false);
    const [listClass, setListClass] = useState([]);
    const [isAddClass, setIsAddClass] = useState(0)

    // useEffect(() => {
    //     if (!user) {
    //         navigate("/signin")
    //     }
    //     else {
    //         cookie.set('token', getCookies(), { path: `/v1/className/getAllClassById` });
    //     }
    // }, [])
    useEffect(() => {
        if (showAddNewClass || showJoinClass) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [showAddNewClass, showJoinClass]);
    const [images, setImages] = useState([])

    useEffect(() => {

        loadImg();


        return () => {
            console.log("useEffect done");
        }
    }, [])
    async function loadImg() {

        const res = await fetch(`https://api.unsplash.com/search/photos?query=""&client_id=V5Xdz9okJnQnuvIQFN0OjsUaeExGt67obOT3bmCIq0o`)
        const imgJson = await res.json()
        setImages(imgJson.results)

    }

    useEffect(() => {
        async function fetchClasses() {
            try {
                const response = await getAllClassById();
                if (response.status === 200) {
                    setListClass(response.data);
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        }
        fetchClasses();
    }, [isAddClass]);

    return (
        <>
            {/* <header className="fixed right-0 top-0 left-60 bg-yellow-50 py-3 px-4 h-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between">
                            <div>
                                <button type="button" className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-yellow-600 focus:text-yellow-600 font-semibold p-2 border border-transparent hover:border-yellow-300 focus:border-yellow-300 transition">
                                    <span className="inline-flex items-center justify-center w-6 h-6 text-gray-600 text-xs rounded bg-white transition mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                        </svg>
                                    </span>
                                    <span className="text-sm">Archive</span>
                                </button>
                            </div>
                            <div className="text-lg font-bold">Today's Plan</div>
                            <div>
                                <button type="button" className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-yellow-600 focus:text-yellow-600 font-semibold p-2 border border-transparent hover:border-yellow-300 focus:border-yellow-300 transition">
                                    <span className="text-sm">This week</span>
                                    <span className="inline-flex items-center justify-center w-6 h-6 text-gray-600 text-xs rounded bg-white transition ml-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header> */}



            <main className="ml-60 pt-16 max-h-screen overflow-auto">
                <div className="px-6 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl p-8 mb-5">
                            <h1 className="text-3xl font-bold mb-10">Messaging ID framework development for the marketing branch</h1>
                            <div className="flex items-center justify-between">
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
                            </div>

                            <hr className="my-10" />

                            <div className="grid grid-cols-2 gap-x-20">
                                <div>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}

export default AdminPage;
