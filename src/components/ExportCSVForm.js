import React, { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { CSVLink, CSVDownload } from "react-csv";
import { approveCV, getCVByPostId, inviteCV, pendingCV, rejectCV } from "../api/cv/cv.api.js";
import { sendEmail } from "../api/email/email.api.js";
import { selectUser } from "../features/userSlice.js";
import { formatDateTime } from "../utils/formatDate.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCookies, getUser } from "../features/user";
import { addGradeComposition } from "../api/grade/grade.api.js";
import Cookies from "universal-cookie";

function ExportCSVForm({ list, fileName, className }) {
    const headerSet = new Set(list.flatMap(obj => Object.keys(obj)))
    const header = Array.from(headerSet)
    const body = list.map(obj => Object.values(obj))
    const listData = [header, ...body]
    useEffect(() => {
        console.log("list: ", list)
    }, [])
    if (list.length != 0)
        return (
            <>
                <div className={className}>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    {header.map((col, index) =>
                                        <th scope="col" className="px-6 py-3">
                                            {col}
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {body.map((row, index) =>
                                    <tr
                                        key={index}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                    >
                                        {row.map((data, i) =>
                                            <td key={i} className="px-6 py-4">
                                                {data}
                                            </td>
                                        )}
                                        {/* <td className="px-6 py-4">
                                    <p
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={() => alert("Edit grade")}
                                    >
                                        Edit
                                    </p>
                                </td> */}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="mt-5">

                    <CSVLink
                        data={listData}
                        filename={fileName}
                        target="_blank"
                        className="bg-[#ff4757] text-white py-2 px-3 rounded-lg hover:opacity-90"
                    >
                        Download me
                    </CSVLink>
                </div>
            </>
        );
    else return (
        <div className={className}>
            <p className="text-xl text-[#5f27cd] font-bold flex justify-center items-center">
                No students found
            </p>
        </div>
    );
}

export default ExportCSVForm;
