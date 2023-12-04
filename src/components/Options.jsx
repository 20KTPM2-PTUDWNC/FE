import React, { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";

import { approveCV, getCVByPostId, inviteCV, pendingCV, rejectCV } from "../api/cv/cv.api.js";
import { sendEmail } from "../api/email/email.api.js";
import { selectUser } from "../features/userSlice.js";
import { formatDateTime } from "../utils/formatDate.js";
import { Link } from "react-router-dom";

function Options({ onClose, data }) {
    const [options, setOptions] = useState([]);
    const [selectedCv, setSelectedCv] = useState(null);
    const [inviteForm, setInviteForm] = useState(false);
    const [isHandle, setIsHandle] = useState(false);
    const [filter, setFilter] = useState(1); // 1: Pending, 2: Rejected, 3: Approved, 4: Invited
    const [error, setError] = useState("");

    const [subjectEmail, setSubjectEmail] = useState("");
    const [timeEmail, setTimeEmail] = useState("");
    const [addressEmail, setAddressEmail] = useState();
    const [messageEmail, setMessageEmail] = useState("");



    const [images, setImages] = useState([])
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
            <div className="w-[600px] bg-white rounded-lg p-8 max-w-[1100px]">
                <div className="relative flex justify-between items-center">
                    <div className="flex justify-between items-center mb-4 w-full">
                        <span className="text-2xl text-[#5f27cd]  font-bold">Options</span>
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
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>

                {/* Render CV list */}

                <div className="overflow-y-auto w-full h-64 font-sans">
                    <div className="flex flex-col">
                        {data.map((item, index) =>
                            <button
                                key={index}
                                className="flex justify-between hover:bg-[#48dbfb] px-2 py-4 rounded-sm"
                                onClick={item.todo}
                            >
                                <p
                                    className="font-bold hover:text-[#00ADB5]"
                                    onClick={() => {
                                        onClose();
                                    }}
                                >
                                    - {item.name}
                                </p>
                            </button>
                        )}


                    </div>
                </div>


              
         
            </div>
        </div>
    );
}

export default Options;
