/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";

import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfile, updateProfile, updateAvatar } from "../../api/user/user.api";
import { getCookies, getUser } from "../../features/user";

import { IoSettingsOutline } from "react-icons/io5";
import { GrScorecard } from "react-icons/gr";
import Options from "../../components/app/Options.jsx";
import ShowGrade from "../../components/app/AssignmentGradeForm";
import StudentReviewForm from "../../components/app/StudentReviewForm";
import ShowReviews from "../../components/app/ShowReviews";
import { showMemberList } from "../../api/class/class.api";
import { getAssigmentGrade, getClassGrade, showGradeStructure } from "../../api/grade/grade.api";
import { assignmentReview, getAssignmentDetail, showAssignmentList, studentReview } from "../../api/assignment/assignment.api";
import { splitTextWithLineBreaks } from "../../utils/splitTextWithLineBreaks";
import StudentReviewList from "../../components/app/StudentReviewList";
import UploadFileForm from "../../components/public/UploadFileForm";

function splitStr(a) {
    let re = "";
    for (let i = 0; i < a.length; i++) {
        re = re + a[i] + "\n";
    }
    return re;
}

const TextInput = ({ onInputChange, value }) => {
    return (
        <div className="text-input mb-8">
            <input
                className="w-full border p-2 text-[#6F1E51]"
                value={value}
                onChange={(e) => onInputChange(e.target.value)}
            />
        </div>
    );
};
const StudentSearch = ({ data, getReview, memberList, setUserIdOfStudent, firstStudentId }) => {
    const [searchTerm, setSearchTerm] = useState(firstStudentId);
    const [showId, setShowId] = useState(false)
    const [filteredStudentIds, setFilteredStudentIds] = useState([]);
    const searchContainerRef = useRef(null);
    useEffect(() => {
        console.log(memberList)
    }, [])
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchTerm(inputValue);
        if (inputValue.length !== 0)
            setShowId(true)
        // Filter student IDs based on the input value
        const filteredIds = memberList.students
            .filter((item) => item.studentId?.toString().includes(inputValue))
            .map((item) => item.studentId);

        setFilteredStudentIds(filteredIds);
    };

    const handleStudentClick = (studentId) => {
        // Set the selected student ID in the search bar
        setSearchTerm(studentId);

        // Use the selected student ID to get the corresponding object
        const selectedObject = memberList.students.find((item) => item.studentId === parseInt(studentId));
        getReview(selectedObject._id)
        setUserIdOfStudent(selectedObject._id)
        console.log("selected: ", selectedObject); // You can use the selectedObject as needed
    };
    const handleClickOutside = (e) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
            // Click outside the search container, hide the list
            setShowId(false);
        }
    };

    useEffect(() => {
        // Attach click event listener when the component mounts
        document.addEventListener('click', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <div
            className="font-sans text-black"
            ref={searchContainerRef}
        >
            <input
                type="text"
                placeholder="Search by Student ID"
                value={searchTerm}
                onChange={handleInputChange}
                className="border-b-2 border-[#5f27cd] pl-2"
            />
            {searchTerm && showId &&
                <ul className="shadow-md bg-white ">
                    {filteredStudentIds.map((studentId) => (
                        <li key={studentId} onClick={() => handleStudentClick(studentId)}>
                            {studentId}
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
};
const checkStudent = (memberList, id) => {
    return memberList && memberList.students && memberList.students.some(student => student._id === id)
}
const CommentSection = ({ data, getReview, memberList, userId, setUserIdOfStudent, firstStudentId, setShowReview }) => {
    const check = checkStudent(memberList, userId)
    return (
        <div className="comment-section mb-8">
            <div className="flex flex-row mb-3">
                <h2 className="text-2xl font-bold mb-4">Comment</h2>
                {data && data.userReview.length > 0 &&
                    <button
                        className="bg-[#5f27cd] text-white font-bold px-4 py-2 rounded-lg ml-5"
                        onClick={setShowReview}
                    >
                        Review Details
                    </button>
                }
            </div>
            {!check && data && <>

                <div className="absolute top-[15px] right-[20px] flex flex-row">

                    <StudentSearch
                        firstStudentId={firstStudentId}
                        setUserIdOfStudent={setUserIdOfStudent}
                        data={data}
                        getReview={getReview}
                        memberList={memberList} />
                </div>
            </>
            }


            <ul>
                {data && data.userReview.map((comment, index) => (
                    <li key={index} className="mb-2 text-[#6F1E51]"><span className="font-bold">{comment.userId.name}: </span>{comment.text}</li>
                ))}
            </ul>
        </div>
    );
};
const StudentGrade = ({ onClick, reviews }) => {
    return (
        <div className="absolute top-[110px] right-[20px] h-full">
            <div className="flex flex-col text-[#5f27cd] rounded-lg border-2 border-[#5f27cd] p-5">

                <p className="font-bold mb-2">Your Grade:</p>
                <p className="font-bold mb-2 text-center text-2xl">{reviews && (reviews.mark === 0 ? '...' : reviews.grade)}</p>
                {reviews && reviews.userReview.length === 0 &&
                    <button
                        className={`bg-[#5f27cd] text-white font-bold px-4 py-2 rounded-lg `}
                        onClick={onClick}
                    >
                        Review
                    </button>
                }
            </div>
        </div>
    );
}

function AssignmentDetails() {
    const user = getUser();
    const navigate = useNavigate();
    const id = user._id
    const params = useParams()
    const assignmentId = params.assignmentId
    const classId = params.classId
    const idStudent = params.idStudent
    const [openReview, setOpenReview] = useState(false)
    const [assigmentDetails, setAssigmentDetails] = useState(null)

    useEffect(() => {
        if (!user || (user && user.userFlag === 0))
            navigate("/signin")
        else {
            console.log(assignmentId)
            getAssignmentDetails()
        }
    }, [])

    const getAssignmentDetails = async () => {
        const res = await getAssignmentDetail(assignmentId);
        if (res.status === 200) {
            setAssigmentDetails(res.data)
        }
    }
    // const [avatar, setAvatar] = useState(null);
    // const [name, setName] = useState("");

    // const [address, setAddress] = useState("");
    // const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [text, setText] = useState('');
    const [comments, setComments] = useState([]);
    const [showAssignmentOption, setShowAssignmentOption] = useState(false);
    const [showGrade, setShowGrade] = useState(false)
    const [showReviews, setShowReviews] = useState(false)
    const [reviewList, setReviewList] = useState([])
    const [review, setReview] = useState(null)
    const [memberList, setMemberList] = useState([])
    const [action, setAction] = useState(false)
    const [action1, setAction1] = useState(false)
    const [userIdOfStudent, setUserIdOfStudent] = useState('')
    const [firstStudentId, setFirstStudentId] = useState('')
    const [showUploadGrade, setShowUploadGrade] = useState(false)
    const [showReviewList, setShowReviewList] = useState(false)
    const handleInputChange = (inputText) => {
        setText(inputText);
    };
    async function getStudentReviewList() {
        const res = await assignmentReview(assignmentId)
        if (res.status === 200) {
            setReviewList(res.data)
            alert("getReviewList")
            setShowReviewList(true)
        }
        else {
            alert("fail")
        }
    }
    const reviewFromStudent = () => {
        getStudentReviewList()
        setShowAssignmentOption(false)
    }
    const showUpload = () => {
        setShowUploadGrade(true)
        setShowAssignmentOption(false)
    }
    const assignmentOption = [
        {
            name: "Reviews from students",
            todo: reviewFromStudent
        },
        {
            name: "Upload student grade",
            todo: showUpload
        },
        // {
        //     name: "Add Topic",
        //     todo: addGradeStructure
        // }
    ]
    const closeTab = {
        asssignmentOptions: {
            close: function () {
                setShowAssignmentOption(false)
            }
        },
        showGrade: {
            close: function () {
                setShowGrade(false)
            }
        },
        showReviews: {
            close: function () {
                setShowReviews(false)
            }
        },
        showReviewList: {
            close: function () {
                setShowReviewList(false)
            }
        },
        showUpload: {
            close: function () {
                setShowUploadGrade(false)
            }
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
    async function getMemberList1(classId) {
        try {
            const response = await showMemberList(classId);

            if (response.status === 200) {
                console.log(response.data)
                setMemberList(response.data)
                let memberList = response.data
                if (!checkStudent(memberList, id)) {
                    getReview(response.data.students[0]._id)
                    setUserIdOfStudent(response.data.students[0]._id)
                    if (idStudent)
                        setFirstStudentId(idStudent)
                    else
                        setFirstStudentId(response.data.students[0].studentId)
                }
                else {
                    getReview(id)
                }
            }
        } catch (error) {
            console.log("Error123: ", error);

        }
    }
    async function getReview(idOfStudent) {
        const check = checkStudent(memberList, id)
        if (check) {
            try {

                const response = await getAssigmentGrade(assignmentId, id)
                if (response.status === 200) {
                    console.log("review: ", response.data)
                    setReview(response.data)
                    setAction(!action)
                }
            } catch (error) {
                console.log("ErrorReview: ", error);
            }
        }
        else {
            try {
                console.log("getReview: ", assignmentId, id)
                const response = await getAssigmentGrade(assignmentId, idOfStudent)
                if (response.status === 200) {
                    console.log("review: ", response.data)
                    setReview(response.data)
                    setAction(!action)
                }
            } catch (error) {
                console.log("ErrorReview: ", error);
            }
        }
    }

    useEffect(() => {
        getMemberList(classId)
    }, [action])
    useEffect(() => {
        getMemberList1(classId)
    }, [action1])

    // useEffect(() => {
    //     const review = studentReviews.find((item) => item.studentId === parseInt(studentIdComment))
    //     setComments(review.userReview)
    //     // console.log(studentReviews[0].userReview)
    // }, [studentIdComment])
    const handleAddComment = async () => {
        setText('');
        const data = {
            "expectedGrade": review?.assignmentReview?.expectedGrade,
            "userReview": [
                {
                    "text": text,
                    "sort": "4",
                    "userId": user._id
                }
            ]
        }
        console.log(data)
        await studentReview(review?._id, data)
        getReview(userIdOfStudent)
        setText('');
    };
    const deleteAssignment = () => {
        alert("Delete this assignment")
    }



    useEffect(() => {
        if (showAssignmentOption
        ) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [showAssignmentOption]);

    return (
        <div className={`w-full ${review ? 'h-full' : 'h-screen'} relative`} >
            <div className="h-full pt-[120px] pb-[50px] max-w-[900px] text-[#5f27cd] mx-auto p-4  justify-center w-full h-full">
                <div className="pb-4 mb-5 relative">
                    <p className="text-4xl font-bold inline text-[#5f27cd] border-b-4 border-[#ff4757]">
                        Assignment Details
                    </p>
                    {user && memberList && memberList.teachers && memberList.teachers.some(teacher => teacher._id === user._id) &&
                        <button
                            className="ml-5 font-bold hover:opacity-90 rounded duration-200"
                            onClick={() => setShowAssignmentOption(true)}
                        >
                            <IoSettingsOutline className="text-[#5f27cd] duration-200" size={"30px"} />
                        </button>
                    }
                    {user && memberList && memberList.teachers && memberList.teachers.some(teacher => teacher._id === id) &&
                        <button
                            className="ml-5 font-bold hover:opacity-90 rounded duration-200"
                            onClick={() => setShowGrade(true)}
                        >
                            <GrScorecard className="text-[#5f27cd] duration-200" size={"30px"} />
                        </button>
                    }
                </div>

                {error && (
                    <p className="bg-[#D14D72] text-sm text-white font-bold py-4 px-4 rounded mb-8 w-4/12">{error}</p>
                )}


                <div className="flex p-8 ">
                    <div className="flex-1 pr-8">
                        <div className="content-text mb-8 ">
                            <h2 className="text-2xl font-bold mb-4 ">{assigmentDetails?.name}</h2>
                            <p className="text-[#6F1E51]">{splitTextWithLineBreaks(assigmentDetails?.content)}</p>
                        </div>

                        <div className="relative rounded-lg border-2 border-[#5f27cd] p-5 -ml-10">
                            <CommentSection
                                memberList={memberList}
                                userId={id}
                                data={review}
                                getReview={getReview}
                                setUserIdOfStudent={setUserIdOfStudent}
                                firstStudentId={firstStudentId}
                                setShowReview={() => setShowReviews(true)}
                            />
                            <div className="my-10">
                                <TextInput value={text} onInputChange={handleInputChange} />
                            </div>
                            {user && review && memberList && memberList.teachers && memberList.teachers.some(teacher => teacher._id === user._id) && review.userReview.length > 0 &&
                                <button
                                    className="bg-[#5f27cd] text-white font-bold px-4 py-2 rounded-lg"
                                    onClick={handleAddComment}
                                >
                                    Comment
                                </button>
                            }
                            {user && memberList && memberList.students && memberList.students.some(student => student._id === user._id) &&
                                <button
                                    className={`bg-[#5f27cd] text-white font-bold px-4 py-2 rounded-lg ${review && review.userReview.length > 0 ? '' : 'opacity-50 pointer-events-none'}`}
                                    onClick={handleAddComment}
                                >
                                    Comment
                                </button>
                            }
                        </div>



                    </div>


                </div>


            </div>
            {user && memberList && memberList.students && memberList.students.some(student => student._id === user._id) &&

                <StudentGrade
                    reviews={review}
                    onClick={() => setOpenReview(!openReview)} />

            }
            {showAssignmentOption &&
                <Options
                    data={assignmentOption}
                    onClose={closeTab.asssignmentOptions.close}

                />
            }
            {showReviews &&
                <ShowReviews
                    selectedReview={review}
                    onClose={closeTab.showReviews.close}
                    onClick={() => setAction(!action)}
                    isStudent={checkStudent(memberList, user._id)}
                />
            }
            {showReviewList &&
                <StudentReviewList
                    data={reviewList}
                    setStudentId={setUserIdOfStudent}
                    onClose={closeTab.showReviewList.close}
                    getReview={getReview}
                />
            }
            {user && memberList && memberList.teachers && memberList.teachers.some(teacher => teacher._id === user._id) && showGrade &&
                <ShowGrade
                    onClose={closeTab.showGrade.close}
                    assignmentId={assignmentId}
                    classId={classId}
                    studentList={memberList.students}
                    onClick={() => setAction(!action)}
                />
            }
            {openReview &&
                <StudentReviewForm
                    onClose={() => setOpenReview(!openReview)}
                    studentGradeId={review._id}
                    onClick={()=>setAction(!action)}
                />
            }
            {showUploadGrade &&
                <UploadFileForm
                    onClose={closeTab.showUpload.close}
                    uploadType={"grade list"}
                    classId={classId}
                    assignmentId={assignmentId}
                />
            }
        </div >
    );
}
export default AssignmentDetails;
