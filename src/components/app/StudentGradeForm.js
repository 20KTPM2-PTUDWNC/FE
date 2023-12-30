import React, { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { handleTitle } from "../../utils/handleTitle";
import ExportCSVForm from "./ExportCSVForm";


import { formatDateTime } from "../../utils/formatDate.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCookies, getUser } from "../../features/user";
import { addAssignment, showAssignmentGrade } from "../../api/assignment/assignment.api.js";
import Cookies from "universal-cookie";
import { exportStudentList } from "../../api/class/class.api";
import { getClassGrade } from "../../api/grade/grade.api";
const dataEx = [
    {
        "userId": {
            "_id": "6566a434093c6f99801a7ba9",
            "name": "LETHUYNGA",
            "studentId": 20127249
        },
        "assignments": [
            {
                "name": "A",
                "grade": 0.08,
                "scale": 1
            },
            {
                "name": "E2",
                "grade": 0.4,
                "scale": 5
            }
        ],
        "total": 0.48000000000000004
    },
    {
        "userId": {
            "_id": "6566a434093c6f99801a7ba9",
            "name": "LETHUYNGA",
            "studentId": 20127249
        },
        "assignments": [
            {
                "name": "A",
                "grade": 0.08,
                "scale": 1
            },
            {
                "name": "E2",
                "grade": 0.4,
                "scale": 5
            }
        ],
        "total": 0.48000000000000004
    },
    {
        "userId": {
            "_id": "6566a434093c6f99801a7ba9",
            "name": "LETHUYNGA",
            "studentId": 20127249
        },
        "assignments": [
            {
                "name": "A",
                "grade": 0.08,
                "scale": 1
            },
            {
                "name": "E2",
                "grade": 0.4,
                "scale": 5
            }
        ],
        "total": 0.48000000000000004
    }
]
function StudentGradeForm({ onClose, onClick, classId }) {
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
            const response = await getClassGrade(classId);
            setData(response.data)
            console.log(response)
            // const headerSet = new Set(data.flatMap(obj => Object.keys(obj)))
            // setHeader(Array.from(headerSet))
            // setBody(data.map(obj => Object.values(obj)))
            // // const listData = [header, ...body]
            // // const [status, setStatus] = useState(false)
            // console.log("grade: ", data)
            // setListStudent(data);
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
                        <span className="text-2xl text-[#5f27cd]  font-bold">Options</span>
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
                                    <th className="px-6 py-3 text-center border">User ID</th>
                                    <th className="px-6 py-3 text-center border">Name</th>
                                    <th className="px-6 py-3 text-center border">Student ID</th>
                                    <th className="px-6 py-3 text-center border">Assignments</th>
                                    <th className="px-6 py-3 text-center border">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}
                                        className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ${index === body.length - 1 ? 'border-b-2' : ''}`}>
                                        <td className="px-6 py-3 text-center border">{item.userId._id}</td>
                                        <td className="px-6 py-3 text-center border">{item.userId.name}</td>
                                        <td className="px-6 py-3 text-center border">{item.userId.studentId}</td>
                                        <td className="px-6 py-3 text-center border">
                                            <ul className="list-disc list-inside">
                                                {item.assignments.map((assignment, i) => (
                                                    <li key={i}>
                                                        {assignment.name}: {assignment.grade} (Scale: {assignment.scale})
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="border p-2">{item.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="my-10">

                            <button
                                className="bg-[#ff4757] text-white py-2 px-3 rounded-lg hover:opacity-90"
                            // onClick={() => setEdit(true)}
                            >
                                Download
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default StudentGradeForm;
