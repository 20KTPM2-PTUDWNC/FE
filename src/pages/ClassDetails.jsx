/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";

import { IoSettingsOutline } from "react-icons/io5";

import { Link, useNavigate, useParams } from "react-router-dom";
import { closeJobEmployer, deleteJob, getJob, openJobEmployer } from "../api/post/post.api.js";
import ApplyForm from "../components/ApplyForm.jsx";
import Options from "../components/Options.jsx";
import UpdateForm from "../components/UpdateForm.jsx";
import { formatDate, formatDateLeft } from "../utils/formatDate.js";
import { splitTextWithLineBreaks } from "../utils/splitTextWithLineBreaks.js";
import { showClassDetail, showMemberList } from "../api/class/class.api.js";
import { addGradeComposition, showGradeStructure } from "../api/grade/grade.api.js";
import Cookies from "universal-cookie";
import { getCookies, getUser } from "../features/user";

function ClassDetails() {
    const user = getUser()
    const params = useParams();
    const classId = params.classId;
    const [job, setJob] = useState({});

    const [showAssignmentOption, setShowAssignmentOption] = useState(false);
    const [showTopicOption, setShowTopicOption] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showApply, setShowApply] = useState(false);
    const [tab, setTab] = useState(1);
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [classDetail, setClassDetail] = useState({});
    const [memberList, setMemberList] = useState([]);
    const [gradeList, setGradeList] = useState([]);
    const cookie = new Cookies()

    const addTopic = () => {
        alert("add topic");
    }
    const addAssignment = () => {
        alert("add assignment");
    }
    const addGradeStructure = () => {
        alert("add grade structure");
    }
    const assignmentOption = [
        {
            name: "Add Topic",
            todo: addTopic
        },
        {
            name: "Add Assignment",
            todo: addAssignment
        },
        {
            name: "Add Topic",
            todo: addGradeStructure
        }
    ]
    const topicOption = [
        {
            name: "Add Assignment",
            todo: addAssignment
        },
        {
            name: "Add Topic",
            todo: addGradeStructure
        }
    ]
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
        if (showAssignmentOption || showTopicOption || showApply) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [showAssignmentOption, showUpdate, showApply]);

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
        else {
            cookie.set('token', getCookies(), { path: `/v1/userClass/${classId}` });
            getClassDetail(classId);
            getMemberList(classId);
            getGradeList(classId);
        }

    }, []);

    async function getClassDetail(classId) {
        try {
            const response = await showClassDetail(classId);

            if (response.status === 200) {
                console.log(response.data)
                setClassDetail(response.data)
            }
        } catch (error) {
            console.log("Error123: ", error);

        }
    }

    async function getMemberList(classId) {
        try {
            const response = await showMemberList(classId);

            if (response.status === 200) {
                console.log(response.data)
                setMemberList(response.data)
            }
        } catch (error) {
            console.log("Error123: ", error);

        }
    }

    async function getGradeList(classId) {
        try {
            const response = await showGradeStructure(classId);

            if (response.status === 200) {
                const gradeStructures = response.data;
                gradeStructures.sort((a, b) => a.sort - b.sort);
                console.log(gradeStructures);
                setGradeList(gradeStructures);
            }
        } catch (error) {
            console.log("Error123: ", error);

        }
    }

    if (classDetail && memberList && gradeList) {
        return (
            <div className="w-full h-full text-black overflow-hidden">
                <div className="pt-[120px] pb-[50px] flex flex-col justify-between items-center w-full h-full">
                    <div className="max-w-[1100px] w-full grid grid-cols-2 gap-8">
                        <div className="pb-8 pl-4">
                            <div className="relative ">

                                <div className="absolute top-0 right-[-450px] flex  justify-between items-center">
                                    {tab === 1 && (<>
                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#ff4757] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(1)}
                                        >
                                            <p>Overall</p>
                                        </button>

                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#5f27cd] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(2)}
                                        >
                                            <p>Assignments</p>
                                        </button>
                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#5f27cd] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(3)}
                                        >
                                            <p>Member List</p>
                                        </button>

                                    </>
                                    )}
                                    {tab === 2 && (<>
                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#5f27cd] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(1)}
                                        >
                                            <p>Overall</p>
                                        </button>

                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#ff4757] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(2)}
                                        >
                                            <p>Assignments</p>
                                        </button>
                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#5f27cd] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(3)}
                                        >
                                            <p>Member List</p>
                                        </button>

                                    </>
                                    )}
                                    {tab === 3 && (<>
                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#5f27cd] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(1)}
                                        >
                                            <p>Overall</p>
                                        </button>

                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#5f27cd] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(2)}
                                        >
                                            <p>Assignments</p>
                                        </button>
                                        <button
                                            className="mr-2 p-2 border-b-4 border-[#ff4757] text-[#5f27cd] font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setTab(3)}
                                        >
                                            <p>Member List</p>
                                        </button>

                                    </>
                                    )}
                                    <div className="ml-5 mt-2">
                                        <button
                                            className="font-bold hover:opacity-90 rounded duration-200"
                                            onClick={() => setShowAssignmentOption(true)}
                                        >
                                            <IoSettingsOutline className="text-[#5f27cd] duration-200" size={"30px"} />
                                        </button>
                                    </div>



                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="max-w-[1100px] w-full grid sm:grid-cols-2 gap-10 px-4 font-sans">
                        <div className="text-1xl px-5 m-5">
                            <div className="flex justify-center">
                                <img
                                    src={Logo}
                                    alt="Class details"
                                    className="mt-3 w-60 h-60 "
                                />
                            </div>
                            <div className="flex justify-center pt-4 pb-2">
                                <Link to={`/company_profile/${job?.userId?._id}`}>
                                    <p className="text-3xl text-center text-[#5f27cd] ">
                                        {classDetail.name}
                                    </p>
                                </Link>
                            </div>
                            <div className="flex justify-center mt-4 p-2 border-2 border-[#5f27cd] rounded-lg">

                                <p className="text-center text-2xl text-[#5f27cd]">
                                    {splitTextWithLineBreaks(`Class ID\n ${classDetail.code}`)}
                                </p>

                            </div>
                        </div>
                        <div>
                            <div className="text-base mt-10">
                                {tab === 1 && (
                                    <div>
                                        {gradeList.map((grade) =>
                                            <div key={grade._id}>
                                                <Link to="/class/classId">
                                                    <div class="relative flex align-center  hover:bg-[#5f27cd] hover:text-white my-8 py-4 px-6 rounded-lg shadow">
                                                        <p className="text-lg font-bold">{grade.name} - {grade.gradeScale}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {tab === 2 && (
                                    <div>
                                        {gradeList.map((grade) =>
                                            <div key={grade._id}>
                                                <div>
                                                    <div className="flex ml-5 mt-2">
                                                        <p className="text-4xl mr-5 font-bold inline text-[#5f27cd] border-b-4 border-[#ff4757]">{grade.name} - {grade.gradeScale}</p>
                                                        <button
                                                            className="font-bold hover:opacity-90 rounded duration-200"
                                                            onClick={() => setShowTopicOption(true)}
                                                        >
                                                            <IoSettingsOutline className="text-[#5f27cd] duration-200" size={"20px"} />
                                                        </button>
                                                    </div>
                                                </div>


                                                {images.map((imgUrl, index) =>
                                                    <div key={index}>
                                                        <Link to="/class/classId">
                                                            <div class="relative flex align-center  hover:bg-[#5f27cd] hover:text-white my-8 py-4 px-6 rounded-lg shadow">
                                                                <p className="text-lg font-bold">Assignment - {index + 1}</p>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                    </div>
                                )}
                                {tab === 3 && (
                                    <div>
                                        {memberList.teachers.map((teacher) =>
                                            <div key={teacher._id}>
                                                <Link to={`/class/${classId}`}>
                                                    <div class="relative flex align-center  hover:bg-[#5f27cd] hover:text-white my-8 py-3 px-6 rounded-lg shadow">
                                                        <p className="text-lg font-bold">{teacher.name} - Teacher</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                        
                                        {memberList.students.map((student) =>
                                            <div key={student._id}>
                                                <Link to={`/class/${classId}`}>
                                                    <div class="relative flex align-center  hover:bg-[#5f27cd] hover:text-white my-8 py-3 px-6 rounded-lg shadow">
                                                        <p className="text-lg font-bold">{student.name} - Student</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {showAssignmentOption && <Options data={assignmentOption} onClose={() => setShowAssignmentOption(false)} />}
                {showTopicOption && <Options data={topicOption} onClose={() => setShowTopicOption(false)} />}
            </div>
        );
    } else {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
}

export default ClassDetails;
