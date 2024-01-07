/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUser, updateId, unmapStudentId } from "../../api/user/user.api.js";
import { getCookies, getUser } from "../../features/user";
import Cookies from "universal-cookie";
import { FaLock, FaUnlock, FaCheck } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa6";
import UploadFileForm from "../../components/public/UploadFileForm.js";

function MapStudentID() {
    const navigate = useNavigate();
    const user = getUser();
    const cookie = new Cookies();
    useEffect(() => {
        if (!user) {
            navigate("/signin")
        }

    }, [])
    const [editedStudentId, setEditedStudentId] = useState('');
    const list = [
        {
            "studentId": "12345",
            "name": "Nguyen Van A",
            "status": true
        },
        {
            "studentId": "12345",
            "name": "Nguyen Van A",
            "status": true
        },
        {
            "studentId": "12345",
            "name": "Nguyen Van A",
            "status": false
        },
    ]
    const headerSet = new Set(list.flatMap(obj => Object.keys(obj)))
    const header = Array.from(headerSet)
    const body = list.map(obj => Object.values(obj))
    const listData = [header, ...body]
    const [status, setStatus] = useState(false)
    const [showMappingCSV, setShowMappingCSV] = useState(false)
    const [editPos, setEditPos] = useState(-1)
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/signin")
        }
        else {
            cookie.set('token', getCookies(), { path: `/v1/className/getAllClassById` });
        }
    }, [])
    useEffect(() => {
        if (showMappingCSV) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [showMappingCSV]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getAllUser();
                if (response.status === 200) {
                    setUserData(response.data);
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        }

        fetchData();
    }, []);

    const handleMapButtonClick = async (userId) => {
        try {
            const studentId = editedStudentId;
            const data = {
                studentId, userId
            }
            const response = await updateId(data);
            if (response.status === 200) {
                const updatedUserData = userData.map((user) =>
                    user._id === userId ? { ...user, studentId: editedStudentId } : user
                );
                setUserData(updatedUserData);
                alert("Mapping successful");
            }
        } catch (error) {
            console.log("Error: ", error);
            alert("Mapping failed");
        }
    };

    const handleUnMapButtonClick = async (userId) => {
        try {
            
            const response = await unmapStudentId(userId);
            if (response.status === 200) {
                const updatedUserData = userData.map((user) =>
                    user._id === userId ? { ...user, studentId: '' } : user
                );
                setUserData(updatedUserData);
                alert("Unmapping successful");
            }
        } catch (error) {
            console.log("Error: ", error);
            alert("Unmapping failed");
        }
    };

    return (
        <>
            <main className=" ml-60 pt-16 h-screen bg-yellow-50 overflow-auto">
                <div className="px-6 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl p-8 mb-5">
                            <div className="flex flex-row justify-between">
                                <h1 className="text-3xl font-bold mb-10">Mapping Student ID</h1>
                                <button
                                    className="rounded-lg px-7 py-2 h-9 items-center bg-yellow-200 text-yellow-900 dark:text-blue-500 hover:bg-yellow-100"
                                    onClick={() => setShowMappingCSV(!showMappingCSV)}
                                >
                                    <p className="flex flex-row font-semibold">
                                        <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4   ">
                                            <FaFileCsv />
                                        </svg> Mapping with CSV
                                    </p>
                                </button>
                            </div>

                            <hr className="mb-10" />

                            {/* <div className="grid grid-cols-2 gap-x-20"> */}
                            <div>
                                <div className="relative max-h-[389px] overflow-x-auto shadow-md sm:rounded-lg border-2">

                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                {header.map((col, index) => (
                                                    <th key={index} scope="col" className="px-6 py-3 text-center">
                                                        {col}
                                                    </th>
                                                ))}
                                                <th scope="col" className="px-6 py-3 text-center">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userData.map((user) => (
                                                <tr
                                                key={user._id}
                                                className={`${user._id % 2 === 0
                                                        ? 'even:bg-gray-50 even:dark:bg-gray-800'
                                                        : 'odd:bg-white odd:dark:bg-gray-900'
                                                        } border-b dark:border-gray-700`}
                                                >
                                                    <td className="px-6 py-4 text-center">
                                                                <input
                                                                    type="text"
                                                                    value={editPos === user._id ? editedStudentId : user.studentId}
                                                                    onChange={(e) => {
                                                                        if (!user.studentId) {
                                                                            setEditedStudentId(e.target.value);
                                                                        }
                                                                    }}
                                                                    onClick={() => setEditPos(user._id)}
                                                                    onBlur={() => {
                                                                        setEditPos(-1);
                                                                    }}
                                                                    readOnly={!!user.studentId}
                                                                    className="text-center py-2 border-2 rounded-lg"
                                                                />
                                                    </td>
                                                    <td className="px-6 py-4 text-center">{user.name}</td>
                                                    <td className="px-6 py-4 text-center">{user.deleteAt === null ? 'Active' : 'Banned'}</td>
                                                    
                                                    <td className="px-6 py-4 text-center">
                                                        <button
                                                            className="rounded-lg px-7 py-2 bg-yellow-200 text-yellow-900 dark:text-blue-500 hover:bg-yellow-100"
                                                            onClick={() => handleMapButtonClick(user._id)}
                                                        >
                                                            <p className="flex flex-row">
                                                                <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4   ">
                                                                    <FaLock />
                                                                </svg> Map
                                                            </p>
                                                        </button>
                                                        <button
                                                            className="rounded-lg ml-3 px-7 py-2 bg-yellow-200 text-yellow-900 dark:text-blue-500 hover:bg-yellow-100"
                                                            onClick={() => handleUnMapButtonClick(user._id)}
                                                        >
                                                            <p className="flex flex-row">
                                                                <svg width="1em" height="1em" fill="currentColor" className="text-lg mr-4   ">
                                                                    <FaUnlock />
                                                                </svg> Un Map
                                                            </p>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showMappingCSV &&
                    <UploadFileForm
                        onClose={() => setShowMappingCSV(!showMappingCSV)}

                    />}
            </main>


        </>
    );
}

export default MapStudentID;
