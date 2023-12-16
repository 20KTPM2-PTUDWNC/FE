import React, { useEffect, useState } from "react";
import { getCookies, getUser } from "../../features/user.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { showAssignmentList } from "../../api/assignment/assignment.api.js";
import { showGradeStructure } from "../../api/grade/grade.api.js";
import Cookies from "universal-cookie";
import DataTable from "react-data-table-component";

function ShowGradeBoard({ onClose, onClick, classId }) {
    const navigate = useNavigate();
    const user = getUser();
    const cookie = new Cookies();

    const [gradeList, setGradeList] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        } else {
            cookie.set('token', getCookies(), { path: `/v1/class/createClass` });
        }
    }, []);

    useEffect(() => {
        async function getGradeList(classId) {
            try {
                const response = await showGradeStructure(classId);
        
                if (response.status === 200) {
                    const gradeStructures = response.data;
                    gradeStructures.sort((a, b) => a.sort - b.sort);
        
                    // Thêm thuộc tính assignmentList cho mỗi grade
                    const updatedGradeList = await Promise.all(gradeStructures.map(async (grade) => {
                        const assignmentResponse = await showAssignmentList(grade._id);
                        if (assignmentResponse.status === 200) {
                            grade.assignmentList = assignmentResponse.data;
                        }
                        return grade;
                    }));
        
                    setGradeList(updatedGradeList);
                }
            } catch (error) {
                console.log("Error123: ", error);
            }
        }
        
        getGradeList(classId);
    }, []);
    const columns = [
        {
            name: "No.",
            cell: (row, index) => <span>{index + 1}</span>,
            width: "60px"
        },
        {
            name: "Name",
            selector: row => row.name,
            width: "150px"
        },
        {
            name: "Grade Scale",
            selector: row => row.gradeScale,
            width: "100px"
        },
        {
            name: "Assignment",
            cell: (row) => {
                if (row.assignmentList) {
                    return (
                        <DataTable
                            columns={nestedColumns}
                            data={row.assignmentList}
                        />
                    );
                }
                return null;
            },
        },
    ];
   
    const nestedColumns = [
        {
            name: "Assignment Name",
            selector: row => row.name,
        },
        {
            name: "Scale",
            selector: row => row.scale,
        },
    ];

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 text-black bg-opacity-75 flex justify-center items-center">
            <div className="w-[1000px] h-[500px] bg-white rounded-lg p-8 max-w-[1100px]">
                <div className="relative flex justify-between items-center">
                    <div className="flex justify-between items-center mb-4 w-full">
                        <span className="text-2xl text-[#5f27cd] font-bold">Grade Board</span>
                    </div>

                    <button
                        className="absolute top-[-16px] right-[-16px] bg-[#ff4757] text-white px-3 py-1 font-bold rounded"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>

                <div className="overflow-y-auto w-full h-[400px] font-sans">
                    <DataTable columns={columns} data={gradeList} />
                </div>
            </div>
        </div>
    );
}

export default ShowGradeBoard;
