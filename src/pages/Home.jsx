/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllClassById } from "../api/class/class.api.js";
import Filter from "../components/Filter";
import Jobs from "../components/Jobs";
import { getCookies, getUser } from "../features/user";
import Logo from "../assets/cover.jpg";
import AddNewClass from "../components/AddNewClassForm";
import JoinClass from "../components/JoinClassForm";
import Cookies from "universal-cookie";

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
    const cookie = new Cookies();
    const [showAddNewClass, setShowAddNewClass] = useState(false);
    const [showJoinClass, setShowJoinClass] = useState(false);
    const [listClass, setListClass] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/signin")
        }
        
    }, [])
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
      }, []);

    return (
        <div name="home" className="bg-white w-full h-full text-black">
            <div className="pt-[120px] pb-[50px] max-w-[1100px] mx-auto p-4 flex flex-col justify-center w-full h-full">
                {/* <p className="text-4xl font-bold inline text-[#00ADB5] border-b-4 border-pink-600 text-center"> My Courses</p>
                <p className="py-4 mt-10 text-4xl text-center">No Courses Recently</p> */}
                <div className="pb-10">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-4xl  font-bold inline text-[#5f27cd] border-b-4 border-[#ff4757]">My Class</p>

                        </div>
                        <div className="flex pr-10 font-bold">

                            <button
                                className="flex items-center bg-[#ff4757] mr-5 text-white py-2 px-3 rounded-lg hover:opacity-90"
                                onClick={() => setShowAddNewClass(true)}
                            >
                                Add new class
                            </button>


                            <button
                                className="bg-[#ff4757] text-white py-2 px-3 rounded-lg hover:opacity-90"
                                onClick={() => setShowJoinClass(true)}
                            >
                                Join class
                            </button>

                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 grid-flow-row gap-10 text-center">
                    {listClass.map((_class, index) =>
                        <div key={index}>
                            <Link to={`/class/${_class._id}`}>
                                <div class="h-[250px] w-[300px] relative">
                                    <img src={Logo} alt="" className="rounded-lg" />
                                    <div class="absolute rounded-lg bottom-0 px-4 py-3 bg-[#5f27cd] w-full">
                                        <h1 class="text-white font-semibold text-2xl">{_class.name}</h1>
                                        <p class="text-gray-200">
                                        {_class.subject}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                </div>
            </div>
            {showAddNewClass && <AddNewClass onClose={() => setShowAddNewClass(false)} />}
            {showJoinClass && <JoinClass onClose={() => setShowJoinClass(false)} />}
        </div>
    );
}

export default Home;
