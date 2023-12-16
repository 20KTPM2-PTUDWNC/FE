/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllClass, getAllClassById } from "../../api/class/class.api.js";
import { getCookies, getUser } from "../../features/user";
import Logo from "../../assets/cover.jpg";
import Cookies from "universal-cookie";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import DataTable from "react-data-table-component"
import { getProfile } from "../../api/user/user.api";
import { showMemberList } from "../../api/class/class.api.js";

function ClassAdminPage() {
    const navigate = useNavigate();
    const user = getUser();
    const cookie = new Cookies();
    const [showAddNewClass, setShowAddNewClass] = useState(false);
    const [showJoinClass, setShowJoinClass] = useState(false);
    const [listClass, setListClass] = useState([]);
    const [images, setImages] = useState([])
    const [memberCounts, setMemberCounts] = useState({});

    useEffect(() => {
        if (!user) {
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
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Description",
            selector: row => row.subject,
            sortable: true
        },
        {
            name: "Code",
            selector: row => row.code,
        },
        {
            name: "Author",
            selector: row => row.author,
        },
        {
            name: "Status",
            selector: row => row.status,
            cell: row => (
                <span style={{ color: row.status === 0 ? "green" : "red" }}
                    onClick={() => handleStatusChange(row._id)}>
                    {row.status === 0 ? "Active" : "Inactive"}
                </span>
            )
        },
        {
            name: "Number of members",
            cell: row => <span>{memberCounts[row._id] || 0}</span>
        },
        {
            name: "List of members",
            cell: row => <FaEye onClick={() => handleEyeClick(row._id)} />
        },
    ]


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
                    console.log(response.data);
                    listClass.forEach((_class) => {
                        authorInfor(_class.authorId);
                        getMemberList(_class._id);
                    });
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        }
        fetchClasses();
        
    }, []);

    async function authorInfor(authorId) {
        try {
            const response = await getProfile(authorId);

            if (response.status === 200) {
                const authorInfo = response.data;
                setListClass(prevClasses => prevClasses.map(_class => {
                    if (_class.authorId === authorId) {
                        _class.author = authorInfo.name;
                    }
                    return _class;
                }));
            }
        } catch (error) {
            console.log("Error123: ", error);
        }
    }

    async function getMemberList(classId) {
        try {
            const response = await showMemberList(classId);
    
            if (response.status === 200) {
                const listMember = response.data;
                const studentsLength = listMember.students.length;
                const teachersLength = listMember.teachers.length;
    
                console.log("Students length:", studentsLength);
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
        const newData = listClass.filter(row => row.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setListClass(newData);
    }

    const handleEyeClick = (rowId) => {
        console.log("Eye clicked for row:", rowId);
        navigate(`/admin/class/member-details/${rowId}`);
    };

    const handleStatusChange = async (classId) => {
        //try {
        //   const response = await updateClassStatus(classId);
        //   if (response.status === 200) {
            setListClass((prevList) =>
                prevList.map((item) =>
                    item._id === classId ? { ...item, status: 1 - item.status } : item
                )
            );
        //}
        // } catch (error) {
        //   console.error("Error updating status:", error);
        // }
      };

    return (
        <>
            <main className="ml-60 pt-16 h-screen bg-yellow-50 overflow-auto">
                <div className="px-6 py-8">
                    <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 mb-5">
                        <div style={{display: 'flex', justifyContent: 'right'}}>
                            <input type="text" placeholder="Search..." onChange={handleFilter} 
                            style={{ border: '1px solid black', borderRadius: '4px', padding: '8px' }}></input>
                        </div>
                        <DataTable
                            columns = {column}
                            data = {listClass}
                            pagination>
                        </DataTable>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ClassAdminPage;
