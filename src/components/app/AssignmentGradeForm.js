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
import { CSVLink } from "react-csv";
import { giveStudentGrade } from "../../api/grade/grade.api";
const studentEx = [
    {
        "studentId": null,
        "_id": "6564bba8eeb5819d77c4d119",
        "userFlag": 1,
        "email": "tintombolon@gmail.com",
        "password": null,
        "phone": "123",
        "address": "123",
        "name": "A",
        "deleteAt": null,
        "verified": true,
        "createdAt": "2023-11-27T15:54:16.110Z",
        "updatedAt": "2023-12-07T02:02:24.445Z",
        "__v": 0
    }
]
function ShowGrade({ onClose, onClick, assignmentId }) {
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
    const [list, setList] = useState([])
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
            // const res = await showAssignmentGrade(assignmentId);
            const data = [
                {
                    "studentId": "12345",
                    "grade": 10
                },
                {
                    "studentId": "12345",
                    "grade": 10
                }, {
                    "studentId": "12345",
                    "grade": 9
                },
            ]
            //const data = res.data
            const headerSet = new Set(data.flatMap(obj => Object.keys(obj)))
            setHeader(Array.from(headerSet))
            setBody(data.map(obj => Object.values(obj)))
            const listData = [header, ...body]
            setList(listData)
            // const [status, setStatus] = useState(false)
            console.log("grade: ", data)
            setListStudent(data);
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

    const handleStudentGrade = async () => {
        const studentData = {
            "assignmentId": assignmentId,
            "mark": "0",
            "userId": studentEx._id,
            "grade": "9"
        }
        await giveStudentGrade(studentData);
    }
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
                        className="absolute top-[0px] right-[0px] bg-[#5f27cd] text-white px-3 py-1 font-bold rounded"
                        onClick={onClose}
                    >
                        Back
                    </button>
                </div>



                <div className="relative overflow-y-auto w-full h-full font-sans">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {header.map((col, index) => (
                                    <th scope="col" key={index} className="px-6 py-3 text-center border">
                                        {col}
                                    </th>
                                ))}
                                <th scope="col" className="px-6 py-3 text-center border">
                                    Edit Grade
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {body.map((row, index) => (
                                <tr
                                    key={index}
                                    className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ${index === body.length - 1 ? 'border-b-2' : ''}`}
                                >
                                    {row.map((data, i) => (
                                        <td
                                            key={i}
                                            className={`px-6 py-4 text-center border ${i === row.length - 1 ? 'border-r-2' : ''}`}
                                        >
                                            {i === row.length - 1 ? (
                                                <input
                                                    type="number"
                                                    value={editPos === index ? editedGrade : data}
                                                    onChange={(e) => setEditedGrade(e.target.value)}
                                                    onClick={() => setEditPos(index)}
                                                    onBlur={() => {
                                                        setEditPos(-1);
                                                        setEditedGrade(data);
                                                    }}
                                                    className="text-center py-2 bg-none"
                                                />
                                            ) : data ? (
                                                data === true ? (
                                                    'True'
                                                ) : data === false ? (
                                                    'False'
                                                ) : (
                                                    data
                                                )
                                            ) : (
                                                'None'
                                            )}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 text-center border">
                                        <button
                                            className="bg-[#ff4757] font-semibold text-white py-2 px-3 rounded-lg hover:opacity-90"
                                            onClick={() => handleStudentGrade()}
                                        >
                                            Edit Grade
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-10 flex flex-row">

                        <CSVLink
                            data={list}
                            filename={"studentGrade"}
                            target="_blank"
                            className="bg-[#ff4757] font-semibold text-white py-2 px-3 rounded-lg hover:opacity-90"
                        >
                            Download
                        </CSVLink>

                        <button
                            className="ml-10 bg-[#ff4757] font-semibold text-white py-2 px-3 rounded-lg hover:opacity-90"
                            onClick={() => alert("abc")}
                        >
                            Mark Grade
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowGrade;
