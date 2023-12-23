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

function splitStr(a) {
    let re = "";
    for (let i = 0; i < a.length; i++) {
        re = re + a[i] + "\n";
    }
    return re;
}
const Content = ({ content }) => {
    return (
        <div className="content-text mb-8 ">
            <h2 className="text-2xl font-bold mb-4 ">Assignment Name</h2>
            <p className="text-[#6F1E51]">{content}</p>
        </div>
    );
};

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
const StudentSearch = ({ data, setStudentId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showId, setShowId] = useState(false)
    const [filteredStudentIds, setFilteredStudentIds] = useState([]);
    const searchContainerRef = useRef(null);
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchTerm(inputValue);
        if (inputValue.length !== 0)
            setShowId(true)
        // Filter student IDs based on the input value
        const filteredIds = data
            .filter((item) => item.studentId.toString().includes(inputValue))
            .map((item) => item.studentId);

        setFilteredStudentIds(filteredIds);
    };

    const handleStudentClick = (studentId) => {
        // Set the selected student ID in the search bar
        setSearchTerm(studentId);
        setStudentId(studentId.toString());
        // Use the selected student ID to get the corresponding object
        const selectedObject = data.find((item) => item.studentId === parseInt(studentId));

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
                <ul className="shadow-md ">
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
const CommentSection = ({ comments, data, setStudentId }) => {

    return (
        <div className="comment-section mb-8">

            <h2 className="text-2xl font-bold mb-4">Comment</h2>
            <div className="absolute top-[15px] right-[20px]">
                <StudentSearch data={data} setStudentId={setStudentId} />
            </div>

            <ul>
                {comments.map((comment, index) => (
                    <li key={index} className="mb-2 text-[#6F1E51]"><span className="font-bold">{comment.userId.name}: </span>{comment.text}</li>
                ))}
            </ul>
        </div>
    );
};
const StudentGrade = ({ onClick }) => {
    return (
        <div className="flex flex-col text-[#5f27cd] rounded-lg border-2 border-[#5f27cd] p-5">

            <p className="font-bold mb-2">Your Grade:</p>
            <p className="font-bold mb-2 text-center text-2xl">10</p>
            <button
                className="bg-[#5f27cd] text-white font-bold px-4 py-2 rounded-lg"
                onClick={onClick}
            >
                Review
            </button>
        </div>
    );
}

function AssignmentDetails() {
    const user = getUser();
    const navigate = useNavigate();
    const id = user._id
    const params = useParams()
    const assignmentId = params.assignmentId
    const [openReview, setOpenReview] = useState(false)
    useEffect(() => {
        if (!user)
            navigate("/signin")
    }, [])

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
    const [review, setReview] = useState(null)
    const studentReviews = [
        {
            "_id": "6575bad10d638bbf98c96b5c",
            "assignmentId": "6565906131761443bcfcd788",
            "studentId": 20127490,
            "__v": 0,
            "createdAt": "2023-12-10T13:19:08.158Z",
            "deleteAt": null,
            "mark": 0,
            "updatedAt": "2023-12-10T15:07:43.153Z",
            "grade": 8,
            "assignmentReview": {
                "deleteAt": null,
                "_id": "6575ea360c7934d00351afd9",
                "studentGradeId": "6575bad10d638bbf98c96b5c",
                "expectedGrade": 9.5,
                "updatedAt": "2023-12-16T14:39:24.753Z",
                "createdAt": "2023-12-16T14:44:26.405Z"
            },
            "userReview": [
                {
                    "deleteAt": null,
                    "_id": "6575ea710c7934d00351afda",
                    "assignmentReviewId": "6575ea360c7934d00351afd9",
                    "userId": {
                        "_id": "6564c0a777616e8efdc4d551",
                        "name": "Tín",
                        "studentId": 20127490
                    },
                    "text": "I want 10",
                    "sort": "1",
                    "createdAt": "2023-12-16T14:44:26.682Z",
                    "updatedAt": "2023-12-16T14:44:26.682Z"
                },
                {
                    "deleteAt": null,
                    "_id": "6575eaf10c7934d00351afdc",
                    "assignmentReviewId": "6575ea360c7934d00351afd9",
                    "userId": {
                        "_id": "6564c0a777616e8efdc4d551",
                        "name": "Tín",
                        "studentId": 20127490
                    },
                    "text": "No, u cann't",
                    "sort": "2",
                    "createdAt": "2023-12-16T14:44:26.682Z",
                    "updatedAt": "2023-12-16T14:44:26.682Z"
                },
                {
                    "deleteAt": null,
                    "_id": "6575eb0b0c7934d00351afdd",
                    "assignmentReviewId": "6575ea360c7934d00351afd9",
                    "userId": {
                        "_id": "6564c0a777616e8efdc4d551",
                        "name": "Tín",
                        "studentId": 20127490
                    },
                    "text": "why??",
                    "sort": "3",
                    "createdAt": "2023-12-16T14:44:26.682Z",
                    "updatedAt": "2023-12-16T14:44:26.682Z"
                }
            ]
        },
        {
            "_id": "6575bad10d638bbf98c96b5c",
            "assignmentId": "6565906131761443bcfcd788",
            "studentId": 20127491,
            "__v": 0,
            "createdAt": "2023-12-10T13:19:08.158Z",
            "deleteAt": null,
            "mark": 0,
            "updatedAt": "2023-12-10T15:07:43.153Z",
            "grade": 8,
            "assignmentReview": {
                "deleteAt": null,
                "_id": "6575ea360c7934d00351afd9",
                "studentGradeId": "6575bad10d638bbf98c96b5c",
                "expectedGrade": 9.5,
                "updatedAt": "2023-12-16T14:39:24.753Z",
                "createdAt": "2023-12-16T14:44:26.405Z"
            },
            "userReview": [
                {
                    "deleteAt": null,
                    "_id": "6575ea710c7934d00351afda",
                    "assignmentReviewId": "6575ea360c7934d00351afd9",
                    "userId": {
                        "_id": "6564c0a777616e8efdc4d551",
                        "name": "Nguyễn Thị Ngọc Hải",
                        "studentId": 20127490
                    },
                    "text": "I want 10",
                    "sort": "1",
                    "createdAt": "2023-12-16T14:44:26.682Z",
                    "updatedAt": "2023-12-16T14:44:26.682Z"
                },
                {
                    "deleteAt": null,
                    "_id": "6575eaf10c7934d00351afdc",
                    "assignmentReviewId": "6575ea360c7934d00351afd9",
                    "userId": {
                        "_id": "6564c0a777616e8efdc4d551",
                        "name": "Nguyễn Thị Ngọc Hải",
                        "studentId": 20127490
                    },
                    "text": "No, u cann't",
                    "sort": "2",
                    "createdAt": "2023-12-16T14:44:26.682Z",
                    "updatedAt": "2023-12-16T14:44:26.682Z"
                },
                {
                    "deleteAt": null,
                    "_id": "6575eb0b0c7934d00351afdd",
                    "assignmentReviewId": "6575ea360c7934d00351afd9",
                    "userId": {
                        "_id": "6564c0a777616e8efdc4d551",
                        "name": "Nguyễn Thị Ngọc Hải",
                        "studentId": 20127490
                    },
                    "text": "why??",
                    "sort": "3",
                    "createdAt": "2023-12-16T14:44:26.682Z",
                    "updatedAt": "2023-12-16T14:44:26.682Z"
                }
            ]
        }
    ]
    const handleInputChange = (inputText) => {
        setText(inputText);
        setReview({
            "deleteAt": null,
            "_id": "6575ea710c7934d00351afda",
            "assignmentReviewId": "6575ea360c7934d00351afd9",
            "userId": {
                "_id": user._id,
                "name": user.name,
                "studentId": null
            },
            "text": inputText,
            "sort": "1",
            "createdAt": "2023-12-16T14:44:26.682Z",
            "updatedAt": "2023-12-16T14:44:26.682Z"
        })
    };
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
    }
    const [studentIdComment, setStudentIdComment] = useState(studentReviews[0].studentId)
    useEffect(() => {
        const review = studentReviews.find((item) => item.studentId === parseInt(studentIdComment))
        setComments(review.userReview)
        // console.log(studentReviews[0].userReview)
    }, [studentIdComment])
    const handleAddComment = () => {
        setComments([...comments, review]);
        setText('');
        setReview(null)
    };
    const deleteAssignment = () => {
        alert("Delete this assignment")
    }
    const reviewFromStudent = () => {
        setShowReviews(true);
    }
    const assignmentOption = [
        {
            name: "Reviews from students",
            todo: reviewFromStudent
        },
        {
            name: "Delete Assignment",
            todo: deleteAssignment
        },
        // {
        //     name: "Add Topic",
        //     todo: addGradeStructure
        // }
    ]

    useEffect(() => {
        if (showAssignmentOption
        ) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [showAssignmentOption,

    ]);

    return (
        <div className="w-full h-full relative" >
            <div className="h-full pt-[120px] pb-[50px] max-w-[900px] text-[#5f27cd] mx-auto p-4  justify-center w-full h-full">
                <div className="pb-4 mb-5 relative">
                    <p className="text-4xl font-bold inline text-[#5f27cd] border-b-4 border-[#ff4757]">
                        Assignment Details
                    </p>

                    <button
                        className="ml-5 font-bold hover:opacity-90 rounded duration-200"
                        onClick={() => setShowAssignmentOption(true)}
                    >
                        <IoSettingsOutline className="text-[#5f27cd] duration-200" size={"30px"} />
                    </button>
                    <button
                        className="ml-5 font-bold hover:opacity-90 rounded duration-200"
                        onClick={() => setShowGrade(true)}
                    >
                        <GrScorecard className="text-[#5f27cd] duration-200" size={"30px"} />
                    </button>
                </div>

                {error && (
                    <p className="bg-[#D14D72] text-sm text-white font-bold py-4 px-4 rounded mb-8 w-4/12">{error}</p>
                )}


                <div className="flex p-8 ">
                    <div className="flex-1 pr-8">
                        <Content content="Assignment Content" />
                        <div className="relative rounded-lg border-2 border-[#5f27cd] p-5 -ml-10">
                            <CommentSection
                                comments={comments}
                                data={studentReviews}
                                setStudentId={setStudentIdComment}
                            />
                            <div className="my-10">
                                <TextInput value={text} onInputChange={handleInputChange} />
                            </div>
                            <button
                                className="bg-[#5f27cd] text-white font-bold px-4 py-2 rounded-lg"
                                onClick={handleAddComment}
                            >
                                Comment
                            </button>
                        </div>

                    </div>


                </div>


            </div>
            <div className="absolute top-[110px] right-[20px] h-full">
                <StudentGrade onClick={() => setOpenReview(!openReview)} />
            </div>
            {showAssignmentOption &&
                <Options
                    data={assignmentOption}
                    onClose={closeTab.asssignmentOptions.close}

                />
            }
            {showReviews &&
                <ShowReviews
                    data={studentReviews}
                    onClose={closeTab.showReviews.close}
                    setStudentId={setStudentIdComment}
                />
            }
            {showGrade &&
                <ShowGrade
                    onClose={closeTab.showGrade.close}
                    assignmentId={assignmentId}
                />
            }
            {openReview &&
                <StudentReviewForm
                    onClose={() => setOpenReview(!openReview)}
                />
            }
        </div >
    );
}
export default AssignmentDetails;
