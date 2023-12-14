/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllClass } from "../../api/class/class.api.js";
import { getCookies, getUser } from "../../features/user";
import Logo from "../../assets/cover.jpg";
import Cookies from "universal-cookie";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import DataTable from "react-data-table-component"
function MemberOfClass() {
    const navigate = useNavigate();
    const user = getUser();
    const cookie = new Cookies();
    const [showAddNewClass, setShowAddNewClass] = useState(false);
    const [showJoinClass, setShowJoinClass] = useState(false);
    const [listClass, setListClass] = useState([]);
    const [images, setImages] = useState([])
    const [isAddClass, setIsAddClass] = useState(0)
    const [records, setRecords] = useState([])

    // useEffect(() => {
    //     if (!user) {
    //         navigate("/signin")
    //     }
    //     else {
    //         cookie.set('token', getCookies(), { path: `/v1/className/getAllClassById` });
    //     }
    // }, [])

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
            selector: row => row.email,
            sortable: true
        },
        {
            name: "Code"
        },
        {
            name: "Author"
        },
        {
            name: "Status"
        },
        {
            name: "Number of members"
        },
        {
            name: "List of members",
            cell: row => <FaEye onClick={() => handleEyeClick(row.id)} />
        },
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
        // async function fetchClasses() {
        //     try {
        //         const response = await getAllClass();
        //         if (response.status === 200) {
        //             setListClass(response.data);
        //             console.log(response.data)
        //         }
        //     } catch (error) {
        //         console.log("Error: ", error);
        //     }
        // }
        // fetchClasses();

        async function fetchData(){
            axios.get('http://jsonplaceholder.typicode.com/users')
            .then(res => setRecords(res.data))
            .then(console.log(records))
            .catch(err => console.log(err));
        }
        fetchData();
    }, []);

    const handleEyeClick = (rowId) => {
        console.log("Eye clicked for row:", rowId);
    };

    return (
        <>
            <main className="ml-60 pt-16 max-h-screen overflow-auto">
                <div className="px-6 py-8">
                    <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 mb-5">
                    <h3 className="text-3xl font-bold mb-10">Class name: {records.name}</h3>
                    <h5 className="text-xl font-bold mb-10">List of members</h5>
                        <DataTable
                            columns = {column}
                            data = {records}
                            pagination>
                        </DataTable>
                    </div>
                </div>
            </main>
        </>
    );
}

export default MemberOfClass;
