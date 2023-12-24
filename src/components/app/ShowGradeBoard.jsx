import React, { useEffect, useState } from "react";
import { getCookies, getUser } from "../../features/user.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { exportGradeBoard } from "../../api/grade/grade.api.js";
import Cookies from "universal-cookie";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";

function ShowGradeBoard({ onClose, onClick, classId }) {
  const navigate = useNavigate();
  const user = getUser();
  const cookie = new Cookies();

  const [gradeBoard, setGradeBoard] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      cookie.set("token", getCookies(), { path: `/v1/class/createClass` });
    }
  }, []);

  useEffect(() => {
    async function fetchGradeData(classId) {
      try {
        const response = await exportGradeBoard(classId);
        console.log(response)

        if (response.status === 200) {
          const gradeBoardData = response.data;
          setGradeBoard(gradeBoardData.gradeBoard);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    fetchGradeData(classId);
  }, [classId]);

  const columns = [
    {
      name: "No.",
      cell: (row, index) => <span>{index + 1}</span>,
      width: "60px",
    },
    {
      name: "Grade Composition",
      selector: (row) => row.name,
      width: "150px",
    },
    {
      name: "Grade Scale",
      selector: (row) => row.gradeScale,
      width: "100px",
    },
    {
      name: "Assignments",
      cell: (row) => {
        if (row.assignments) {
          return (
            <DataTable
              columns={nestedColumns}
              data={row.assignments}
              noHeader
              dense
            />
          );
        }
        return null;
      },
    },
  ];

  const nestedColumns = [
    {
      name: "No.",
      selector: (row, index) => index + 1,
    },
    {
      name: "Assignment Name",
      selector: (row) => row.name,
    },
    {
      name: "Scale",
      selector: (row) => row.scale,
    },
  ];

  const csvData = gradeBoard && gradeBoard.gradeCompositions ? gradeBoard.gradeCompositions.reduce((acc, composition) => {
    const assignments = composition.assignments.map(assignment => ({
      "Grade Composition": composition.name,
      "Grade Scale": composition.gradeScale,
      "Assignment Name": assignment.name,
      "Scale": assignment.scale,
    }));
  
    return acc.concat(assignments);
  }, []) : [];

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
                <div className="mb-3">
                    <CSVLink
                    data={csvData}
                    headers={[
                        { label: "Grade Composition", key: "Grade Composition" },
                        { label: "Grade Scale", key: "Grade Scale" },
                        { label: "Assignment Name", key: "Assignment Name" },
                        { label: "Scale", key: "Scale" },
                    ]}
                    filename={`grade_board_${classId}.csv`}
                    className="bg-[#ff4757] font-semibold text-white py-2 px-3 rounded-lg hover:opacity-90"
                    >
                    Export to CSV
                    </CSVLink>
                </div>
                {gradeBoard && <DataTable columns={columns} data={gradeBoard.gradeCompositions} />}
            </div>
      </div>
    </div>
  );
}

export default ShowGradeBoard;
