import React, { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { handleTitle } from "../../utils/handleTitle";
import ExportCSVForm from "./ExportCSVForm";
import { FaBan, FaCheck } from "react-icons/fa";

import { formatDateTime } from "../../utils/formatDate.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCookies, getUser } from "../../features/user";
import { addAssignment, assignmentReview, showAssignmentGrade } from "../../api/assignment/assignment.api.js";
import Cookies from "universal-cookie";
import { exportStudentList } from "../../api/class/class.api";
import { CSVLink } from "react-csv";
import { getAssigmentGrade, getAssigmentGradeBoard, giveStudentGrade } from "../../api/grade/grade.api";
import { updateId } from "../../api/user/user.api";

function ShowGrade({ onClose, onClick, assignmentId, classId, studentList }) {
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
    const [editedGrade, setEditedGrade] = useState(-1);
    const [editPos_graded, setEditPos_graded] = useState(-1)
    const [editPos_studentID, setEditPos_studentID] = useState(-1)
    const [editPosGraded_studentID, setEditPosGraded_studentID] = useState(-1)
    const [editPosGraded_graded, setEditPosGraded_graded] = useState(-1)
    const [list, setList] = useState([])
    const [students, setStudents] = useState([])
    const [action, setAction] = useState(false)
    const [selectedObjGrade, setSelectedObjGrade] = useState(null)
    const [selectedObjStudentID, setSelectedObjStudentID] = useState(null)
    const [selectedStudentId, setSelectedStudentId] = useState('')
    const [editStudentID, setEditStudentID] = useState(-1)
    const [editStudentIDGraded, setEditStudentIDGraded] = useState(-1)

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }

    }, []);
    useEffect(() => {
        getStudentList()
    }, [action])
    // async function getStudentReviewList() {
    //     const res = await assignmentReview(assignmentId)
    //     if (res.status === 200) {
    //         setReviewList(res.data)
    //         alert("getReviewList")
    //         setShowReviewList(true)
    //     }
    //     else {
    //         alert("fail")
    //     }
    // }
    const getStudentList = async () => {
        try {

            const res1 = await getAssigmentGradeBoard(classId, assignmentId)
            const res = await assignmentReview(assignmentId)
            const reviews = res.data
            console.log("review", reviews)
            const raw_data = res1.data.gradedStudentIds
            // const gradedStudentId = res1.data.gradedStudentIds
            // const arrayObjects_gradedStudentId = gradedStudentId.map(_id => ({ _id }));
            // const idToStudentIdMap = {};

            // studentList.forEach(item => {
            //     idToStudentIdMap[item._id] = item.studentId ? item.studentId : "";
            // });
            // console.log(idToStudentIdMap)
            // console.log(gradedStudentId)
            // // Update arrayA with the "studentId" property from arrayB
            // arrayObjects_gradedStudentId.forEach(item => {
            //     item.studentId = idToStudentIdMap[item._id];
            // });

            // const idToNameMap_Graded = {};
            // studentList.forEach(item => {
            //     idToNameMap_Graded[item._id] = item.name;
            // });
            // arrayObjects_gradedStudentId.forEach(item => {
            //     item.name = idToNameMap_Graded[item._id];
            // });

            // const idToStudentIdMap_Graded = {};
            // studentList.forEach(item => {
            //     idToStudentIdMap_Graded[item._id] = item.name;
            // });
            // raw_data.forEach(item => {
            //     item.name = idToNameMap_Graded[item._id];
            // });
            // // Update arrayB with the "name" property from arrayA
            const data = raw_data
            const gradedStudent = data.map((obj2) => {
                const matchedObj1 = reviews.find((obj1) => obj1.studentGradeId.userId._id === obj2.userId);
                if (matchedObj1) {
                    obj2.finalDecision = matchedObj1.finalDecision;
                } else {
                    obj2.finalDecision = 0; // Set finalDecision to 0 if not found in reviews
                }
                return obj2;
            });

            setGradedStudent(gradedStudent)
            const headerSet = new Set(data.flatMap(obj => Object.keys(obj)))
            setHeader(Array.from(headerSet))
            setBody(data.map(obj => Object.values(obj)))
            const listData = [header, ...body]
            setList(listData)
            // const [status, setStatus] = useState(false)
            console.log("grade: ", data)

            console.log("No grade ", res1.data)
            const studentNoGraded = res1.data.studentsWithoutGrade
            // const idToNameMap = {};
            // studentList.forEach(item => {
            //     idToNameMap[item._id] = item.name;
            // });

            // // Update arrayB with the "name" property from arrayA
            // const updatedStudentsNoGraded = studentNoGraded.map(item => ({
            //     ...item,
            //     name: idToNameMap[item._id],
            // }));
            setStudents(studentNoGraded)
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleStudentGrade = async (id, grade, mark) => {
        const studentData = {
            "assignmentId": assignmentId,
            "mark": mark,
            "userId": id,
            "grade": grade
        }
        console.log("studentData", studentData)
        try {
            const res = await giveStudentGrade(studentData);
            setAction(!action)
            onClick()
        } catch (err) {
            alert("Error: ", err)
        }
        setAction(!action)
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
            console.log(studentIdMapping)
            await updateId(studentIdMapping)
            // if (avatar)
            //     await updateAvatar(user?._id, Avatar)
            setAction(!action)

            onClick()
            alert("Update studentID successfully!");


        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Fail to update");
            return alert("Fail to update")
        }
        alert("StudentId available ", userId, studentId);
    }
    return (
        <div
            onClick={() => setAction(!action)}
            className="absolute overflow-y-auto overflow-x-auto top-0 left-0 w-full h-full bg-gray-900 text-black bg-opacity-75 flex justify-center items-center">
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



                <div className=" overflow-y-auto overflow-x-auto w-full max-h-[300px]  font-sans">
                    <table className="overflow-y-auto overflow-x-auto max-h-[300px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center border">
                                    Name
                                </th>
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
                                    Is Graded
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {students.map((row, index) => (
                                <tr
                                    key={index}
                                    className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ${index === body.length - 1 ? 'border-b-2' : ''}`}
                                >
                                    <td
                                        className={`px-6 py-4 text-center border border-r-2`}
                                    >
                                        <p className="px-6 py-3 text-center">
                                            {row.name}
                                        </p>

                                    </td>
                                    <td
                                        className={`px-6 py-4 text-center border border-r-2`}
                                    >
                                        {/* <input
                                            type="text"
                                            value={selectedStudentId.userId !== row._id ? row.studentId : selectedStudentId.studentId}
                                            onChange={(e) => setSelectedStudentId(e.target.value)}
                                            className="text-center py-2 bg-none border"

                                        /> */}
                                        <input
                                            type="text"
                                            value={editPos_studentID === index ? selectedStudentId : row.studentId}
                                            onChange={(e) => {
                                                setSelectedStudentId(e.target.value)
                                            }}
                                            onClick={() => setEditPos_studentID(index)}
                                            onBlur={() => setEditPos_studentID(-1)}
                                            className="text-center py-2 bg-none border"
                                        />
                                        <button
                                            className="ml-2 bg-green-500 font-semibold text-white py-2 px-3 rounded-lg hover:opacity-90"
                                            onClick={() => {
                                                const prevPos = editPos_studentID;
                                                setEditPos_studentID(index)
                                                if (prevPos === index)
                                                    handleUpdateStudentId(row.userId, selectedStudentId)
                                            }
                                            }>
                                            Map
                                        </button>
                                    </td>
                                    <td
                                        className={`px-6 py-4 text-center border border-r-2`}
                                    >
                                        <input
                                            type="number"
                                            value={editPos_graded === index ? editedGrade === -1 ? 0 : editedGrade : row.grade}
                                            onChange={(e) => {

                                                setEditedGrade(e.target.value < 0 ? 0 : e.target.value > 10 ? 10 : e.target.value)

                                            }}
                                            onClick={() => setEditPos_graded(index)}


                                            className="text-center py-2 bg-none border"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-center border">
                                        <button
                                            className="bg-[#ff4757] font-semibold text-white py-2 px-3 rounded-lg hover:opacity-90"
                                            onClick={() => {
                                                const prevPos = editPos_graded;
                                                setEditPos_graded(index)
                                                if (prevPos === index)
                                                    if (editedGrade !== -1)
                                                        handleStudentGrade(row.userId, editedGrade, row.mark)
                                            }}
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
                                        <p className="px-6 py-3 text-center">
                                            {row.name}
                                        </p>

                                    </td>
                                    <td
                                        className={`px-6 py-4 text-center border border-r-2`}
                                    >
                                        <input
                                            type="text"
                                            value={editPosGraded_studentID === index ? selectedStudentId : row.studentId}
                                            onChange={(e) => {
                                                const foundObject = studentList.find(obj => obj.studentId === row.studentId);
                                                console.log(foundObject)
                                                setSelectedObjStudentID(foundObject)

                                                setSelectedStudentId(e.target.value)

                                            }}
                                            onClick={() => setEditPosGraded_studentID(index)}
                                            onBlur={() => setEditPosGraded_studentID(-1)}
                                            className="text-center py-2 bg-none border"
                                        />
                                        {/* <input
                                            type="text"
                                            value={selectedStudentId.userId !== selectedObjStudentID?._id ? row.studentId : selectedStudentId.studentId}
                                            onChange={(e) => {
                                                const foundObject = studentList.find(obj => obj.studentId === row.studentId);
                                                setSelectedObjGrade(foundObject)
                                                setSelectedStudentId({ userId: foundObject._id, studentId: e.target.value })
                                            }}

                                            className="text-center py-2 bg-none border"
                                        /> */}
                                        <button
                                            className="ml-2 bg-green-500 font-semibold text-white py-2 px-3 rounded-lg hover:opacity-90"
                                            onClick={() => {
                                                const foundObject = studentList.find(obj => obj.studentId === row.studentId);
                                                setSelectedObjGrade(foundObject)
                                                const prevPos = editPosGraded_studentID;
                                                setEditPosGraded_studentID(index)
                                                if (prevPos === index)
                                                    handleUpdateStudentId(foundObject?._id, selectedStudentId)
                                            }}
                                        >
                                            Map
                                        </button>
                                    </td>
                                    <td
                                        className={`px-6 py-4 text-center border border-r-2`}
                                    >
                                        {row.finalDecision === 0 ? <>
                                            <input
                                                type="number"
                                                value={editPosGraded_graded === index ? editedGrade === -1 ? row.grade : editedGrade : row.grade}
                                                onChange={(e) => {
                                                    setEditedGrade(row.grade)
                                                    const foundObject = studentList.find(obj => obj.studentId === row.studentId);
                                                    setSelectedObjGrade(foundObject)

                                                    setEditedGrade(e.target.value < 0 ? 0 : e.target.value > 10 ? 10 : e.target.value)

                                                }}
                                                onClick={() => setEditPosGraded_graded(index)}
                                                onBlur={() => setEditPosGraded_graded(-1)}
                                                className="text-center py-2 bg-none border"
                                            />
                                            <button
                                                className={`ml-2 ${row.mark === 0 ? 'bg-green-500' : 'bg-red-400'} font-semibold text-white py-2 px-3 rounded-lg hover:opacity-90`}
                                                onClick={() => {
                                                    const foundObject = studentList.find(obj => obj.studentId === row.studentId);
                                                    setSelectedObjGrade(foundObject)
                                                    const prevPos = editPosGraded_graded;
                                                    setEditPosGraded_graded(index)
                                                    if (prevPos === index)
                                                        handleStudentGrade(foundObject._id, row.grade, row.mark === 0 ? 1 : 0)
                                                }}
                                            >
                                                {row.mark === 0 ? 'Mark' : 'Un Mark'}
                                            </button> </>
                                            :
                                            <p className="px-6 py-3 text-center">
                                                {row.grade}
                                            </p>
                                        }
                                        {/* <input
                                            type="number"
                                            value={editPosGraded_graded === index ? editedGrade === -1 ? row.grade : editedGrade : row.grade}
                                            onChange={(e) => {
                                                setEditedGrade(row.grade)
                                                const foundObject = studentList.find(obj => obj.studentId === row.studentId);
                                                setSelectedObjGrade(foundObject)

                                                setEditedGrade(e.target.value < 0 ? 0 : e.target.value > 10 ? 10 : e.target.value)

                                            }}
                                            onClick={() => setEditPosGraded_graded(index)}
                                            onBlur={() => setEditPosGraded_graded(-1)}
                                            className="text-center py-2 bg-none border"
                                        />
                                        <button
                                            className={`ml-2 ${row.mark === 0 ? 'bg-green-500' : 'bg-red-400'} font-semibold text-white py-2 px-3 rounded-lg hover:opacity-90`}
                                            onClick={() => {
                                                const foundObject = studentList.find(obj => obj.studentId === row.studentId);
                                                setSelectedObjGrade(foundObject)
                                                const prevPos = editPosGraded_graded;
                                                setEditPosGraded_graded(index)
                                                if (prevPos === index)
                                                    handleStudentGrade(foundObject._id, row.grade, row.mark === 0 ? 1 : 0)
                                            }}
                                        >
                                            {row.mark === 0 ? 'Mark' : 'Un Mark'}
                                        </button> */}
                                    </td>
                                    <td className="px-6 py-4 text-center border">
                                        <button
                                            className={`bg-[#ff4757] font-semibold text-white py-2 px-3 rounded-lg hover:opacity-90 ${row.finalDecision === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                                            onClick={() => {
                                                if (row.finalDecision === 1)
                                                    return
                                                const foundObject = studentList.find(obj => obj.studentId === row.studentId);
                                                setSelectedObjGrade(foundObject)
                                                const prevPos = editPosGraded_graded;
                                                setEditPosGraded_graded(index)
                                                if (prevPos === index)
                                                    if (editedGrade !== -1)
                                                        handleStudentGrade(foundObject._id, editedGrade, row.mark)
                                            }}
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

                </div>
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
    );
}

export default ShowGrade;
