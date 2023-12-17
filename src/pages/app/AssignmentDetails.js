/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfile, updateProfile, updateAvatar } from "../../api/user/user.api";
import { getCookies, getUser } from "../../features/user";
import { selectUser } from "../../features/userSlice";
import { IoSettingsOutline } from "react-icons/io5";
import { GrScorecard } from "react-icons/gr";
import Options from "../../components/app/Options.jsx";
import ShowGrade from "../../components/app/AssignmentGradeForm";
import StudentReviewForm from "../../components/app/StudentReviewForm";

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

const CommentSection = ({ comments }) => {
    return (
        <div className="comment-section mb-8">
            <h2 className="text-2xl font-bold mb-4">Comment</h2>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index} className="mb-2 text-[#6F1E51]"><span className="font-bold">User name: </span>{comment}</li>
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
    const handleInputChange = (inputText) => {
        setText(inputText);
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
        }
    }
    const handleAddComment = () => {
        setComments([...comments, text]);
        setText('');
    };
    const deleteAssignment = () => {
        alert("Delete this assignment")
    }
    const assignmentOption = [

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
                        <div className="rounded-lg border-2 border-[#5f27cd] p-5 -ml-10">
                            <CommentSection comments={comments} />
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
