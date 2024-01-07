import React, { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";

import { formatDateTime } from "../../utils/formatDate.js";
import { Link } from "react-router-dom";
import { markFinal } from "../../api/grade/grade.api.js";

function StudentReviewList({ onClose, data, setStudentId, getReview }) {
    const [selectedReview, setSelectedReview] = useState(null)
    const [images, setImages] = useState([])
    const [finalGrade, setFinalGrade] = useState(-1)

    // const handleMarkFinal = async () => {
    //     const data = {
    //         "expectedGrade": finalGrade
    //     }
    //     const res = await markFinal(selectedReview.assignmentReview._id, data)
    //     if (res.status === 200) {
    //         onClose()
    //         alert("Mark successfully")
    //     }
    // }

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 text-black bg-opacity-75 flex justify-center items-center">
            <div className="w-[600px] h-[450px] bg-white rounded-lg p-8 max-w-[1100px]">
                <div className="relative flex justify-between items-center">
                    <div className="flex justify-between items-center mb-4 w-full">
                        <span className="text-2xl text-[#5f27cd]  font-bold">Student Review</span>

                    </div>

                    <button
                        className="absolute top-[-16px] right-[-16px] bg-[#ff4757] text-white px-3 py-1 font-bold rounded"
                        onClick={() => {

                            onClose()
                        }}
                    >
                        X
                    </button>
                </div>

                {
                    data.map((item, index) =>
                        <button
                            key={index}
                            className="flex justify-between hover:bg-[#48dbfb] px-2 py-4 rounded-sm"
                            onClick={() => {
                                setStudentId(item.studentGradeId.userId.studentId)
                                getReview(item.studentGradeId.userId._id)
                                onClose()
                            }
                            }>
                            <p
                                className="font-bold hover:text-[#00ADB5]"
                            >
                                {item.studentGradeId.userId.name} - {item.expectedGrade}
                            </p>
                        </button>
                    )
                }







            </div>
        </div>
    );
}

export default StudentReviewList;
