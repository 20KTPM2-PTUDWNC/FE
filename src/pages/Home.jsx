/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../api/post/post.api";
import Filter from "../components/Filter";
import Jobs from "../components/Jobs";
import { getUser } from "../features/user";

function Home() {
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
    useEffect(() => {
        if (!user) {
            navigate("/signin")
        }
    }, [])
    return (
        <div name="home" className="w-full h-screen text-gray-300 bg-gradient-to-r from-[#000000] to-[#393E46]">
            <div className="pt-[120px] pb-[50px] max-w-[1100px] mx-auto p-4 flex flex-col justify-center w-full h-full">
                {/* <div className="pb-4">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-4xl font-bold inline text-[#00ADB5] border-b-4 border-pink-600">Jobs</p>
                            <p className="py-4">Recently posted jobs</p>
                        </div>
                        <Filter onFilter={handleFilter} />
                    </div>
                </div> */}

                {/* <Jobs jobs={jobs} currentPage={currentPage} pageNumber={pageNumber} setCurrentPage={setCurrentPage} /> */}
                <p className="text-4xl font-bold inline text-[#00ADB5] border-b-4 border-pink-600 text-center"> My Courses</p>
                <p className="py-4 mt-10 text-4xl text-center">No Courses Recently</p>
            </div>
        </div>
    );
}

export default Home;
