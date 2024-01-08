/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllClass, getAllClassById } from "../../api/class/class.api.js";
import { getCookies, getUser } from "../../features/user";
import Logo from "../../assets/cover.jpg";
import Cookies from "universal-cookie";
import { FaEye, FaCheck, FaBan } from "react-icons/fa";
import axios from "axios";
import DataTable from "react-data-table-component"
import { getProfile } from "../../api/user/user.api";
import { showMemberList, activeClass, showStudentList } from "../../api/class/class.api.js";

function ClassAdminPage() {
    const navigate = useNavigate();
    const user = getUser();
    const cookie = new Cookies();
    const [showAddNewClass, setShowAddNewClass] = useState(false);
    const [showJoinClass, setShowJoinClass] = useState(false);
    const [listClass, setListClass] = useState([]);
    const [originalListClass, setOriginalListClass] = useState([]); // Thêm biến lưu giữ danh sách dữ liệu ban đầu
    const [images, setImages] = useState([]);
    const [memberCounts, setMemberCounts] = useState({});
    const [searchKeyword, setSearchKeyword] = useState(""); // Thêm state để lưu trữ từ khóa tìm kiếm

    useEffect(() => {
        if (!user || (user && user.userFlag !== 0)) {
            navigate("/signin")
        }
        else {
            cookie.set('token', getCookies(), { path: `/v1/className/getAllClass` });
        }
    }, [])

    const column = [
        {
            name: "No.",
            cell: (row, index) => <span>{index + 1}</span>,
            width: "50px"
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true,
            width: "150px"
        },
        {
            name: "Description",
            selector: row => row.subject,
            sortable: true,
            width: "150px"
        },
        {
            name: "Code",
            selector: row => row.code,
            width: "80px"
        },
        // {
        //     name: "Author",
        //     selector: row => row.author,
        //     width: "150px"
        // },
        {
            name: "Status",
            cell: row => (
                <button
                    className={`flex items-center rounded-lg px-2 py-2 ${
                        row.status === 0 ? "bg-green-500" : "bg-red-500"
                    } text-white hover:bg-opacity-80 transition`}
                    onClick={() => changeStatus(row._id)}
                >
                    {row.status === 0 ? (
                        <>
                            <span className="mr-1">
                                <FaCheck />
                            </span>
                            Active
                        </>
                    ) : (
                        <>
                            <span className="mr-1">
                                <FaBan />
                            </span>
                            Inactive
                        </>
                    )}
                </button>
            ),
            width: "150px"
        },        
        // {
        //     name: "Number of members",
        //     cell: row => <span>{memberCounts[row._id] || 0}</span>,
        //     width: "80px"
        // },
        {
            name: "List of members",
            cell: row => <FaEye onClick={() => handleEyeClick(row._id)} />,
            width: "100px"
        },
    ]

    const customStyles = {
        headCells: {
          style: {
            fontWeight: 'bold',
            color: 'black',
          },
        },
    };

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
                const response = await getAllClass();
                if (response.status === 200) {
                    setListClass(response.data);
                    setOriginalListClass(response.data); // Lưu giữ danh sách dữ liệu ban đầu
                    listClass.forEach((_class) => {
                        // if (_class.authorId){
                        //     authorInfor(_class.authorId);
                        // }
                        getMemberList(_class._id);
                    });
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        }
        fetchClasses();
    }, []);

    // async function authorInfor(authorId) {
    //     try {
    //         const response = await getProfile(authorId);

    //         if (response.status === 200) {
    //             const authorInfo = response.data;
    //             setListClass(prevClasses => prevClasses.map(_class => {
    //                 if (_class.authorId === authorId) {
    //                     _class.author = authorInfo.name;
    //                 }
    //                 return _class;
    //             }));
    //         }
    //     } catch (error) {
    //         console.log("Error123: ", error);
    //     }
    // }

    async function getMemberList(classId) {
        try {
            const responseTeacher = await showMemberList(classId);
            const responseStudent = await showStudentList(classId);
    
            if (responseTeacher.status === 200 && responseStudent.status === 200) {
                const listTeacher = responseTeacher.data;
                const listStudent = responseStudent.data;
                const studentsLength = listStudent.length;
                const teachersLength = listTeacher.teachers.length;
    
                console.log("Students length :", studentsLength);
                console.log("Teachers length:", teachersLength);
    
                setMemberCounts((prevCounts) => ({
                    ...prevCounts,
                    [classId]: studentsLength + teachersLength,
                }));
            }
        } catch (error) {
            console.log("Error123: ", error);
        }
    }

    const handleFilter = (e) => {
        setSearchKeyword(e.target.value);
    };

    useEffect(() => {
        if (searchKeyword === "") {
            setListClass([...originalListClass]); // Hiển thị lại bảng ban đầu khi xóa keyword
        } else {
            const newData = originalListClass.filter(
                (row) =>
                    row.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    row.subject.toLowerCase().includes(searchKeyword.toLowerCase())
            );
            setListClass(newData);
        }
    }, [searchKeyword, originalListClass]);

    const handleEyeClick = (rowId) => {
        console.log("Eye clicked for row:", rowId);
        navigate(`/admin/class/member-details/${rowId}`);
    };

    const changeStatus = async (classId) => {
        try {
            // Lấy trạng thái hiện tại của lớp học
            const currentStatus = listClass.find(item => item._id === classId).status;
    
            // Hiển thị hộp thoại xác nhận cho người dùng
            const confirmed = window.confirm(`Are you sure you want to change the status to ${currentStatus === 0 ? 'Inactive' : 'Active'}?`);
    
            if (confirmed) {
                // Gọi API với trạng thái ngược lại
                const newStatus = currentStatus === 0 ? 1 : 0;
                const response = await activeClass(classId, { status: newStatus });
    
                if (response.status === 200) {
                    // Cập nhật trạng thái local với trạng thái mới
                    setListClass((prevList) =>
                        prevList.map((item) =>
                            item._id === classId ? { ...item, status: newStatus } : item
                        )
                    );
    
                    // Hiển thị thông báo thành công cho người dùng
                    alert("Status changed successfully!!");
                }
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <>
            <main className="ml-60 pt-16 h-screen bg-yellow-50 overflow-auto">
                <div className="px-6 py-8">
                    <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 mb-5">
                        <h1 className="text-3xl font-bold mb-10">Manage Classes</h1>
                        <div style={{display: 'flex', justifyContent: 'right'}}>
                            <input type="text" placeholder="Search..." onChange={handleFilter} 
                            style={{ border: '1px solid black', borderRadius: '4px', padding: '8px' }}></input>
                        </div>
                        <DataTable
                            columns = {column}
                            data = {listClass}
                            customStyles={customStyles}
                            pagination>
                        </DataTable>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ClassAdminPage;
