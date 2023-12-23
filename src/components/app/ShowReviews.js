import React, { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";

import { formatDateTime } from "../../utils/formatDate.js";
import { Link } from "react-router-dom";

function ShowReviews({ onClose, data, setStudentId }) {
    const [selectedReview, setSelectedReview] = useState(null)
    const [images, setImages] = useState([])
    const [finalGrade, setFinalGrade] = useState(-1)
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

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 text-black bg-opacity-75 flex justify-center items-center">
            <div className="w-[600px] h-[450px] bg-white rounded-lg p-8 max-w-[1100px]">
                <div className="relative flex justify-between items-center">
                    <div className="flex justify-between items-center mb-4 w-full">
                        <span className="text-2xl text-[#5f27cd]  font-bold">Student Review</span>
                        {/* {!selectedCv && (
                            <select
                                className="border border-gray-400 text-black py-1 px-1 rounded-lg mr-10"
                                value={filter}
                                onChange={(e) => {
                                    setFilter(e.target.value);
                                }}
                            >
                                <option value="1">Pending</option>
                                <option value="2">Rejected</option>
                                <option value="3">Approved</option>
                                <option value="4">Invited</option>
                            </select>
                        )} */}
                    </div>

                    <button
                        className="absolute top-[-16px] right-[-16px] bg-[#ff4757] text-white px-3 py-1 font-bold rounded"
                        onClick={() => {
                            if (selectedReview)
                                setSelectedReview(false)
                            else
                                onClose()
                        }}
                    >
                        {selectedReview ? "Back" : "X"}
                    </button>
                </div>


                {!selectedReview &&
                    <div className="overflow-y-auto w-full font-sans">
                        <div className="flex flex-col">
                            {data.map((item, index) =>
                                <button
                                    key={index}
                                    className="flex justify-between hover:bg-[#48dbfb] px-2 py-4 rounded-sm"
                                    onClick={() => {
                                        setSelectedReview(item);
                                        alert("Selected Reviews")
                                    }}
                                >
                                    <p
                                        className="font-bold hover:text-[#00ADB5]"
                                    >
                                        {item.studentId} - {item.assignmentReview.expectedGrade}
                                    </p>
                                </button>
                            )}


                        </div>
                    </div>
                }
                {selectedReview &&
                    <div className="overflow-y-auto w-full font-sans">
                        <div className="flex flex-col">
                            <ul>
                                <li className="py-2">
                                    <p className="font-semibold">StudentID: <span className="font-light">{selectedReview.studentId}</span> </p>
                                </li>
                                <li className="py-2">
                                    <p className="font-semibold">Grade: <span className="font-light text-green-500">{selectedReview.grade}</span> </p>
                                </li>
                                <li className="py-2">
                                    <p className="font-semibold">Expected Grade From Student: <span className="font-light text-red-500">{selectedReview.assignmentReview.expectedGrade}</span> </p>
                                </li>
                                <li className="py-2">
                                    <p className="font-semibold">Explanation:{" "}
                                        <span className="font-light">
                                            Thay cham diem thap qua
                                        </span>
                                    </p>
                                </li>
                                <hr className="my-5" />
                                <li className="py-2 flex flex-row items-center">
                                    <p className="font-semibold">Final Grade: {" "}</p>
                                    <input
                                        type="number"
                                        className="ml-2 pl-2 py-1 border-b-2 border-black"
                                        value={finalGrade === -1 ? '' : finalGrade > 10 ? 10 : finalGrade < 0 ? 0 : finalGrade}
                                        onChange={(e) => {
                                            const grade = e.target.value
                                            if (grade.length !== 0)
                                                setFinalGrade(e.target.value)
                                            else
                                                setFinalGrade(-1)
                                        }}
                                    />
                                </li>
                            </ul>


                        </div>
                        <div className="my-5 flex flex-row items-center justify-center">
                            <button
                                className=" bg-[#ff4757] text-white px-3 py-1 font-bold rounded"
                                onClick={() => {
                                    setStudentId(selectedReview.studentId)
                                    onClose()
                                }}
                            >
                                Go to comment
                            </button>
                            {finalGrade !== -1 &&
                                <button
                                    className="ml-5 bg-[#ff4757] text-white px-3 py-1 font-bold rounded"

                                >
                                    Final Score
                                </button>
                            }

                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ShowReviews;
