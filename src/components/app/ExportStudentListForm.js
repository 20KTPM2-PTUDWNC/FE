import React, { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { handleTitle } from "../../utils/handleTitle";
import ExportCSVForm from "./ExportCSVForm";
import { approveCV, getCVByPostId, inviteCV, pendingCV, rejectCV } from "../../api/cv/cv.api.js";
import { sendEmail } from "../../api/email/email.api.js";

import { formatDateTime } from "../../utils/formatDate.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCookies, getUser } from "../../features/user";
import { addAssignment } from "../../api/assignment/assignment.api.js";
import Cookies from "universal-cookie";
import { exportStudentList, showMemberList } from "../../api/class/class.api";

function ExportStudentListForm({ onClose, onClick, classId }) {
    const [name, setName] = useState("");
    const [_scale, setScale] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);
    const [listStudent, setListStudent] = useState([])
    const navigate = useNavigate();
    const user = getUser();
    const cookie = new Cookies();
    const params = useParams();

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
        else {
            getStudentList()

        }
    }, []);
    const getStudentList = async () => {
        try {
            const response = await showMemberList(classId);
            const data = [
                {
                    "studentId": "12345",
                    "name": "Nguyen Van A"
                },
                {
                    "studentId": "12345",
                    "name": "Nguyen Van A"
                }, {
                    "studentId": "12345",
                    "name": "Nguyen Van A"
                },
            ]
            console.log("list student: ", response.data)
            // setListStudent(response.data.students);
            setListStudent(response.data.students)
        }
        catch (err) {
            console.log(err)
        }

    }
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!name || !_scale) {
    //         return setError("Please fill all field!");
    //     }

    //     let scale = Number(_scale);

    //     let newAssignment = {
    //         name, scale
    //     };

    //     try {
    //         const response = await addAssignment(gradeStructureId, newAssignment);
    //         if (response.status === 200) {
    //             alert("Add new assignment successfully!");
    //             onClose();
    //             onClick()
    //         }
    //     } catch (error) {
    //         setError(error.response.data.message);
    //         alert(error.response.data.message)
    //         console.log(error);

    //     }
    // };

    useEffect(() => {

        // loadImg();


        return () => {
            console.log("useEffect done");
        }
    }, [])
    async function loadImg() {

        const res = await fetch(`https://api.unsplash.com/search/photos?query=""&client_id=V5Xdz9okJnQnuvIQFN0OjsUaeExGt67obOT3bmCIq0o`)
        const imgJson = await res.json()
        setImages(imgJson.results)

    }

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 text-black bg-opacity-75 flex justify-center items-center">
            <div className="w-[1000px] h-[600px] bg-white rounded-lg p-8 max-w-[1100px]">
                <div className="relative flex justify-between items-center">
                    <div className="flex justify-between items-center mb-4 w-full">
                        <span className="text-2xl text-[#5f27cd]  font-bold">Options</span>
                    </div>

                    <button
                        className="absolute top-[0px] right-[0px] bg-[#5f27cd] text-white px-3 py-1 font-bold rounded"
                        onClick={onClose}
                    >
                        Back
                    </button>
                </div>



                <div className="relative overflow-y-auto w-full h-full font-sans">
                    <ExportCSVForm
                        list={listStudent}
                        fileName={"studentList"}
                        className="m-5 border-2 "
                    >

                    </ExportCSVForm>
                </div>
            </div>
        </div>
    );
}

export default ExportStudentListForm;
