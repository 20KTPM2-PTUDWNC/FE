/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { showClassDetail } from "../../api/class/class.api.js";
import { getCookies, getUser } from "../../features/user";
import Logo from "../../assets/cover.jpg";
import Cookies from "universal-cookie";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import DataTable from "react-data-table-component"
import { showMemberList } from "../../api/class/class.api.js";

function MemberOfClass() {
    const navigate = useNavigate();
    const user = getUser();
    const cookie = new Cookies();
    const params = useParams();
    console.log(params);
    const classId = params.classId;
    const [showAddNewClass, setShowAddNewClass] = useState(false);
    const [showJoinClass, setShowJoinClass] = useState(false);
    const [listClass, setListClass] = useState([]);
    const [images, setImages] = useState([])
    const [isAddClass, setIsAddClass] = useState(0)
    const [records, setRecords] = useState([])
    const [classDetail, setClassDetail] = useState({});
    const [teacherList, setTeacherList] = useState([]);
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/signin")
        }
        else {
            cookie.set('token', getCookies(), { path: `/v1/className/showClassDetail/${classId}` });
        }
    }, [])

    const columnTeacher = [
        {
            name: "No.",
            cell: (row, index) => <span>{index + 1}</span>,
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true
        },
        {
            name: "Role",
            selector: row => "Teacher",
            sortable: true
        }
    ]

    const columnStudent = [
        {
            name: "No.",
            cell: (row, index) => <span>{index + 1}</span>,
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true
        },
        {
            name: "Role",
            selector: row => "Student",
        }
    ]
    useEffect(() => {
        if (showAddNewClass || showJoinClass) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [showAddNewClass, showJoinClass]);

    useEffect(() => {

        loadImg();


        return () => {
            console.log("useEffect done");
        }
    }, [])
    async function loadImg() {

        const res = await fetch(`https://api.unsplash.com/search/photos?query=""&client_id=V5Xdz9okJnQnuvIQFN0OjsUaeExGt67obOT3bmCIq0o`)
        const imgJson = await res.json()
        setImages(imgJson.results)

    }

    useEffect(() => {
        async function fetchClasses() {
            try {
                const response = await showClassDetail(classId);
                if (response.status === 200) {
                    setClassDetail(response.data);
                    console.log(response.data)
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        }
        
        async function getMemberList(classId) {
            try {
                const response = await showMemberList(classId);
        
                if (response.status === 200) {
                    setTeacherList(response.data.teachers);
                    setStudentList(response.data.students);
                    console.log(response.data)
                }
            } catch (error) {
                console.log("Error123: ", error);
            }
        }

        fetchClasses();
        getMemberList(classId);
    }, [classId]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    return (
        <>
            <main className="ml-60 pt-16 h-screen bg-yellow-50 overflow-auto">
                <div className="px-6 py-8">
                    <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 mb-5">
                        <div className="grid grid-cols-2 gap-x-20">
                            <h3 className="text-2xl font-bold mb-10">Class name: {classDetail.name}</h3> 
                            <h3 className="text-xl mb-10">Code: {classDetail.code}</h3>
                            <h3 className="text-2xl font-bolds mb-10">Description: {classDetail.subject}</h3>
                            <h3 className="text-xl mb-10">Creation date: {formatDate(classDetail.createdAt)}</h3>
                        </div>
                        
                        <h5 className="text-xl font-bold mb-10">List of teachers</h5>
                        <DataTable
                            columns = {columnTeacher}
                            data = {teacherList}
                            pagination>
                        </DataTable>
                        <h5 className="text-xl font-bold mb-10">List of students</h5>
                        <DataTable
                            columns = {columnStudent}
                            data = {studentList}
                            pagination>
                        </DataTable>
                        </div>
                </div>
            </main>
        </>
    );
}

export default MemberOfClass;