import React, { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { handleTitle } from "../../utils/handleTitle";
import ExportCSVForm from "./ExportCSVForm";
import { FaBan, FaCheck } from "react-icons/fa";

import { formatDateTime } from "../../utils/formatDate.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCookies, getUser } from "../../features/user";
import { addAssignment, showAssignmentGrade } from "../../api/assignment/assignment.api.js";
import Cookies from "universal-cookie";
import { exportStudentList } from "../../api/class/class.api";
import { CSVLink } from "react-csv";
import { giveStudentGrade } from "../../api/grade/grade.api";
import { updateId } from "../../api/user/user.api";
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
function ShowGrade({ onClose, onClick, assignmentId, studentList }) {
    const [name, setName] = useState("");
    const [_scale, setScale] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);
    const [gradedStudent, setGradedStudent] = useState([])
    const navigate = useNavigate();
    const user = getUser();
    const cookie = new Cookies();
    const params = useParams();
    const [header, setHeader] = useState([]);
    const [body, setBody] = useState([])
    const [editedGrade, setEditedGrade] = useState({ userId: '', grade: 0 });
    const [editPos, setEditPos] = useState(-1)
    const [list, setList] = useState([])
    const [students, setStudents] = useState([])
    const [action, setAction] = useState(false)
    const [selectedObj, setSelectedObj] = useState(null)
    const [selectedStudentId, setSelectedStudentId] = useState({ userId: '', studentId: '' })
    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
        else {
            getStudentList()
        }
    }, [action]);
    const getStudentList = async () => {
        try {
            const res = await showAssignmentGrade(assignmentId);
            // const data = [
            //     {
            //         "studentId": "12345",
            //         "grade": 10
            //     },
            //     {
            //         "studentId": "12345",
            //         "grade": 10
            //     }, {
            //         "studentId": "12345",
            //         "grade": 9
            //     },
            // ]
            const data = res.data
            setGradedStudent(data)
            const headerSet = new Set(data.flatMap(obj => Object.keys(obj)))
            setHeader(Array.from(headerSet))
            setBody(data.map(obj => Object.values(obj)))
            const listData = [header, ...body]
            setList(listData)
            // const [status, setStatus] = useState(false)
            console.log("grade: ", data)
            const filteredArray = studentList.filter(objA => !data.some(objB => objA.studentId === objB.studentId));
            setStudents(filteredArray)

        }
        catch (err) {
            console.log(err)
        }
    }
    const handleStudentGrade = async (grade) => {
        const studentData = {
            "assignmentId": assignmentId,
            "mark": "0",
            "userId": grade.userId,
            "grade": grade.grade
        }
        console.log(studentData)
        try {
            const res = await giveStudentGrade(studentData);
            setAction(!action)
        } catch (err) {
            alert("Error: ", err)
        }

    }
    const handleUpdateStudentId = async (userId, studentId) => {
        console.log("StudentId available ", userId, studentId);
        const studentIdMapping = {
            studentId,
            userId
        }
        if (studentId && (studentId === 0 || studentId.trim() === "0"))
            return alert("StudentId is not accepted");
        try {

            await updateId(studentIdMapping)
            // if (avatar)
            //     await updateAvatar(user?._id, Avatar)
            alert("Update studentID successfully!");


        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Fail to update");
            return alert("Fail to update")
        }
        alert("StudentId available ", userId, studentId);
    }
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 text-black bg-opacity-75 flex justify-center items-center">
            <div className="w-[1000px] h-[500px] bg-white rounded-lg p-8 max-w-[1100px]">
                <div className="relative flex justify-between items-center">
                    <div className="flex justify-between items-center mb-4 w-full">
                        <span className="text-2xl text-[#5f27cd]  font-bold">Assignment Grade</span>
                    </div>

                    <button
                        className="absolute top-[0px] right-[0px] bg-[#5f27cd] text-white px-3 py-1 font-bold rounded"
                        onClick={onClose}
                    >
                        Back
                    </button>
                </div>



                <div className="relative overflow-y-auto overflow-x-auto w-full h-full font-sans">
                    <table className="overflow-y-auto overflow-x-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center border">
                                    StudentId
                                </th>
                                <th scope="col" className="px-6 py-3 text-center border">
                                    Grade
                                </th>
                                <th scope="col" className="px-6 py-3 text-center border">
                                    Edit Grade
                                </th>
                                <th scope="col" className="px-6 py-3 text-center border">
                                    Graded
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {students.map((row, index) => (
                                <tr
                                    key={row._id ? row._id : index}
                                    className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ${index === body.length - 1 ? 'border-b-2' : ''}`}
                                >
                                    <td
                                        className={`px-6 py-4 text-center border border-r-2`}
                                    >
                                        <input
                                            type="text"
                                            value={selectedStudentId.userId !== row._id ? row.studentId : selectedStudentId.studentId}
                                            onChange={(e) => setSelectedStudentId({ userId: row._id, studentId: e.target.value })}
                                            className="text-center py-2 bg-none border"

                                        />

                                        <button
                                            className="ml-2 bg-green-500 font-semibold text-white py-2 px-3 rounded-lg hover:opacity-90"
                                            onClick={() => handleUpdateStudentId(row._id, selectedStudentId.studentId)}
                                        >
                                            Map
                                        </button>
                                    </td>
                                    <td
                                        className={`px-6 py-4 text-center border border-r-2`}
                                    >
                                        <input
                                            type="number"
                                            value={editedGrade.userId !== row._id ? 0 : editedGrade.grade < 0 ? 0 : editedGrade.grade > 10 ? 10 : editedGrade.grade}
                                            onChange={(e) => setEditedGrade({ userId: row._id, grade: e.target.value })}

                                            className="text-center py-2 bg-none border"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-center border">
                                        <button
                                            className="bg-[#ff4757] font-semibold text-white py-2 px-3 rounded-lg hover:opacity-90"
                                            onClick={() => handleStudentGrade(editedGrade)}
                                        >
                                            Edit Grade
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-center border">
                                        <button
                                            className="bg-[#ff4757] font-semibold text-white py-2 px-3 rounded-lg hover:opacity-90"
                                        >
                                            <FaBan />
                                        </button>
                                    </td>

                                </tr>
                            ))}
                            {gradedStudent.map((row, index) => (
                                <tr
                                    key={row.studentId}
                                    className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ${index === body.length - 1 ? 'border-b-2' : ''}`}
                                >
                                    <td
                                        className={`px-6 py-4 text-center border border-r-2`}
                                    >

                                        <input
                                            type="number"
                                            value={selectedStudentId.userId !== selectedObj?._id ? row.studentId : selectedStudentId.studentId}
                                            onChange={(e) => {
                                                const foundObject = studentList.find(obj => obj.studentId === row.studentId);
                                                setSelectedObj(foundObject)
                                                setSelectedStudentId({ userId: foundObject._id, studentId: e.target.value })
                                            }}

                                            className="text-center py-2 bg-none border"
                                        />
                                        <button
                                            className="ml-2 bg-green-500 font-semibold text-white py-2 px-3 rounded-lg hover:opacity-90"
                                            onClick={() => handleUpdateStudentId(selectedObj?._id, selectedStudentId.studentId)}
                                        >
                                            Map
                                        </button>
                                    </td>
                                    <td
                                        className={`px-6 py-4 text-center border border-r-2`}
                                    >
                                        <input
                                            type="number"
                                            value={editedGrade.userId !== selectedObj?._id ? 0 : editedGrade.grade < 0 ? 0 : editedGrade.grade > 10 ? 10 : editedGrade.grade}
                                            onChange={(e) => {
                                                const foundObject = studentList.find(obj => obj.studentId === row.studentId);
                                                setSelectedObj(foundObject)
                                                setEditedGrade({ userId: foundObject._id, grade: e.target.value < 0 ? 0 : e.target.value > 10 ? 10 : e.target.value })
                                            }}

                                            className="text-center py-2 bg-none border"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-center border">
                                        <button
                                            className="bg-[#ff4757] font-semibold text-white py-2 px-3 rounded-lg hover:opacity-90"
                                            onClick={() => handleStudentGrade(editedGrade)}
                                        >
                                            Edit Grade
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-center border">
                                        <button
                                            className="bg-green-500 font-semibold text-white py-2 px-3 rounded-lg hover:opacity-90"
                                        >
                                            <FaCheck />
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
