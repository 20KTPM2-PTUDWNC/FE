import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { showClassDetail, showMemberList, showStudentList } from "../../api/class/class.api.js";
import { getCookies, getUser } from "../../features/user";
import Cookies from "universal-cookie";
import DataTable from "react-data-table-component";
import { getProfile } from "../../api/user/user.api.js";

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
    const [images, setImages] = useState([]);
    const [isAddClass, setIsAddClass] = useState(0);
    const [records, setRecords] = useState([]);
    const [classDetail, setClassDetail] = useState({});

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        } else {
            cookie.set('token', getCookies(), { path: `/v1/className/showClassDetail/${classId}` });
        }
    }, []);

    const getStudentEmail = async (userId) => {
        try {
            const user = await getProfile(userId);
            return user.data.email;
        } catch (error) {
            console.error("Error fetching student email: ", error);
            return "";
        }
    };

    useEffect(() => {
        async function getMemberList(classId) {
            try {
                const responseTeacher = await showMemberList(classId);
                const responseStudent = await showStudentList(classId);

                if (responseTeacher.status === 200 && responseStudent.status === 200) {
                    const teachersWithRole = responseTeacher.data.teachers.map(teacher => ({ ...teacher, role: "teacher" }));
                    const studentsWithRole = await Promise.all(responseStudent.data.map(async student => {
                        const email = student.userId ? await getStudentEmail(student.userId) : "";
                        return { ...student, role: "student", email };
                    }));
                    const combinedList = [...teachersWithRole, ...studentsWithRole];
                    setRecords(combinedList);
                }
            } catch (error) {
                console.log("Error123: ", error);
            }
        }

        async function fetchClasses() {
            try {
                const response = await showClassDetail(classId);
                if (response.status === 200) {
                    setClassDetail(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.log("Error: ", error);
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

    const columnCombined = [
        {
            name: "No.",
            cell: (row, index) => <span>{index + 1}</span>,
            width: "60px"
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
            name: "Student ID",
            selector: row => row.studentId, 
        },
        {
            name: "Role",
            selector: row => (row.role === "teacher" ? "Teacher" : "Student"),
            sortable: true
        }
    ];

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

                        <h5 className="text-xl font-bold mb-10">List of members</h5>
                        <DataTable
                            columns={columnCombined}
                            data={records}
                            pagination
                        />
                    </div>
                </div>
            </main>
        </>
    );
}

export default MemberOfClass;
