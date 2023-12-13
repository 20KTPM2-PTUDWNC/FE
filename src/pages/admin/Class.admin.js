/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllClass } from "../../api/class/class.api.js";
import Filter from "../../components/app/Filter";
import Jobs from "../../components/app/Jobs";
import { getCookies, getUser } from "../../features/user";
import Logo from "../../assets/cover.jpg";
import AddNewClass from "../../components/app/AddNewClassForm";
import JoinClass from "../../components/app/JoinClassForm";
import Cookies from "universal-cookie";
import { FaEye } from "react-icons/fa";
import { Button } from "react-scroll";
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
                const response = await getAllClass();
                if (response.status === 200) {
                    setListClass(response.data);
                    console.log(response.data)
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        }
        fetchClasses();
    }, [isAddClass]);

    return (
        <>
            <main className="ml-60 pt-16 max-h-screen overflow-auto">
                <div className="px-6 py-8">
                    <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 mb-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray dark:text-gray-400 mx-auto">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Code</th>
                                    <th>Author</th>
                                    <th>Number of members</th>
                                    <th>List of members</th>
                                </tr>
                            </thead>
                            
                            <div>
                            <hr className="my-3" />
                            </div>
                            <tbody>
                                {images.map((image, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>Name</td>
                                        <td>Description</td>
                                        <td>Code</td>
                                        <td>Author</td>
                                        <td>Number of members</td>
                                        <td><button><FaEye className="duration-200" size={"20px"}/></button></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
}

export default AdminPage;
