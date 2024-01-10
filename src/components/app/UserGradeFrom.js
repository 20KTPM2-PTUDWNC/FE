import React, { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { handleTitle } from "../../utils/handleTitle";
import ExportCSVForm from "./ExportCSVForm";
import { CSVLink, CSVDownload } from "react-csv";

import { formatDateTime } from "../../utils/formatDate.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCookies, getUser } from "../../features/user";
import { addAssignment, showAssignmentGrade } from "../../api/assignment/assignment.api.js";
import Cookies from "universal-cookie";
import { exportStudentList } from "../../api/class/class.api";
import { getClassGrade, showGradeById } from "../../api/grade/grade.api";
const dataEx = [
    {
        "gradeCompositionName": "Excercise",
        "assignmentName": "E2",
        "grade": 8
    },
    {
        "gradeCompositionName": "Excercise",
        "assignmentName": "E2",
        "grade": 8
    },
    {
        "gradeCompositionName": "Final",
        "assignmentName": "Final",
        "grade": 8
    }
]
function UserGradeFrom({ onClose, onClick, userId, className }) {
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
    const [header, setHeader] = useState([]);
    const [body, setBody] = useState([])
    const [editedGrade, setEditedGrade] = useState('');
    const [editPos, setEditPos] = useState(-1)
    const [data, setData] = useState([])
    const getStudentGradeBoard = async () => {
        console.log("grade student In")
        try {
            const res = await showGradeById(userId);
            const obj_data = res.data
            obj_data.assignmentsInfo.push({ "Total Grade": obj_data.totalGrade })
            console.log(obj_data)
            setData(obj_data)
            console.log("grade student", obj_data)
            // const headerSet = new Set(data.flatMap(obj => Object.keys(obj)))
            // setHeader(Array.from(headerSet))
            // setBody(data.map(obj => Object.values(obj)))
            // // const listData = [header, ...body]
            // // const [status, setStatus] = useState(false)
            // console.log("grade: ", data)
            // setListStudent(data);
        }
        catch (err) {
            console.log("err student Grade", err)
        }
    }
    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
        else {
            getStudentGradeBoard()
        }
    }, []);


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

    // useEffect(() => {

    //     // loadImg();


    //     return () => {
    //         console.log("useEffect done");
    //     }
    // }, [])
    // async function loadImg() {

    //     const res = await fetch(`https://api.unsplash.com/search/photos?query=""&client_id=V5Xdz9okJnQnuvIQFN0OjsUaeExGt67obOT3bmCIq0o`)
    //     const imgJson = await res.json()
    //     setImages(imgJson.results)

    // }

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 text-black bg-opacity-75 flex justify-center items-center">
            <div className="w-[1000px] h-[500px] bg-white rounded-lg p-8 max-w-[1100px]">
                <div className="relative flex justify-between items-center">
                    <div className="flex justify-between items-center mb-4 w-full">
                        <span className="text-2xl text-[#5f27cd]  font-bold">Grade Board</span>
                    </div>

                    <button
                        className="absolute top-[0px] right-[0px] bg-[#ff4757] text-white px-3 py-1 font-bold rounded"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>



                <div className="relative overflow-y-auto w-full h-full font-sans">

                    <div className="relative overflow-y-auto w-full h-full font-sans p-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="bg-gray-200">
                                    <th className="px-6 py-3 text-center border">GradeComposition Name</th>
                                    <th className="px-6 py-3 text-center border">Assignment Name</th>
                                    <th className="px-6 py-3 text-center border">Grade</th>

                                </tr>
                            </thead>
                            <tbody>
                                {data && data.assignmentsInfo &&
                                    <>
                                        {data.assignmentsInfo.map((item, index) => (
                                            <tr key={index}
                                                className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ${index === body.length - 1 ? 'border-b-2' : ''}`}>
                                                <td className="px-6 py-3 text-center border">{item.gradeCompositionName}</td>
                                                <td className="px-6 py-3 text-center border">{item.assignmentName}</td>
                                                <td className="px-6 py-3 text-center border">{item.grade}</td>
                                                {/* <td className="px-6 py-3 text-center border">
                                            <ul className="list-disc list-inside">
                                                {item.assignments.map((assignment, i) => (
                                                    <li key={i}>
                                                        {assignment.name}: {assignment.grade} (Scale: {assignment.scale})
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="border p-2">{item.total}</td> */}
                                            </tr>

                                        )
                                        )}
                                        <tr
                                            className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-b-2`}>
                                            <td className="px-6 py-3 text-center border"></td>
                                            <td className="px-6 py-3 text-center border"></td>
                                            <td className="px-6 py-3 text-center border"><span className="font-semibold">Total Grade: </span>{data.totalGrade}</td>
                                            {/* <td className="px-6 py-3 text-center border">
                                            <ul className="list-disc list-inside">
                                                {item.assignments.map((assignment, i) => (
                                                    <li key={i}>
                                                        {assignment.name}: {assignment.grade} (Scale: {assignment.scale})
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="border p-2">{item.total}</td> */}
                                        </tr>
                                    </>
                                }
                                {/* <tr>

                                </tr> */}
                            </tbody>
                        </table>
                        {data && data.assignmentsInfo &&
                            <div className="my-10">

                                <CSVLink
                                    data={data.assignmentsInfo}
                                    filename={"my grade board_ " + className}
                                    className="bg-[#ff4757] text-white py-2 px-3 rounded-lg hover:opacity-90"
                                // onClick={() => setEdit(true)}
                                >
                                    Download
                                </CSVLink>
                            </div>
                        }

                    </div>
                </div>

            </div>
        </div>
    );
}

export default UserGradeFrom;
