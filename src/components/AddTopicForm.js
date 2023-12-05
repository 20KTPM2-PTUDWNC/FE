import React, { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";

import { approveCV, getCVByPostId, inviteCV, pendingCV, rejectCV } from "../api/cv/cv.api.js";
import { sendEmail } from "../api/email/email.api.js";
import { selectUser } from "../features/userSlice.js";
import { formatDateTime } from "../utils/formatDate.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCookies, getUser } from "../features/user";
import { addGradeComposition } from "../api/grade/grade.api.js";
import Cookies from "universal-cookie";

function AddTopicForm({ onClose }) {
    const [name, setName] = useState("");
    const [scale, setScale] = useState("");
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);

    const navigate = useNavigate();
    const user = getUser();
    const cookie = new Cookies();
    const params = useParams();
    const classId = params.classId;

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
        else {
            cookie.set('token', getCookies(), { path: `/v1/grade/addGradeStructure/${classId}` });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !scale) {
            return setError("Please fill all field!");
        }

        let gradeScale = Number(scale);

        let newGrade = {
            name, gradeScale
        };

        try {
            const response = await addGradeComposition(classId, newGrade);
            if (response.status === 200) {
                alert("Add new grade composition successfully!");
                onClose();
            }
        } catch (error) {
            setError(error.response.data.message);
            alert(error.response.data.message)
            console.log(error);
            
        }
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

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 text-black bg-opacity-75 flex justify-center items-center">
            <div className="w-[600px] bg-white rounded-lg p-8 max-w-[1100px]">
                <div className="relative flex justify-between items-center">
                    <div className="flex justify-between items-center mb-4 w-full">
                        <span className="text-2xl text-[#5f27cd]  font-bold">Options</span>
                    </div>

                    <button
                        className="absolute top-[-16px] right-[-16px] bg-[#5f27cd] text-white px-3 py-1 font-bold rounded"
                        onClick={onClose}
                    >
                        Back
                    </button>
                </div>

                {/* Render CV list */}

                <div className="relative overflow-y-auto w-full h-64 font-sans">
                    <div className="flex flex-col">
                        <div className="mt-5">
                            <p className="text-[#5f27cd] font-semibold mb-1">Name</p>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="text-black border-b-2 border-[#5f27cd] p-2 w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mt-5">
                            <p className="text-[#5f27cd] font-semibold mb-1">Description</p>
                            <input
                                type="text"
                                name="scale"
                                id="scale"
                                className="text-black border-b-2 border-[#5f27cd] p-2 w-full"
                                value={scale}
                                onChange={(e) => setScale(e.target.value)}
                            />
                        </div>
                        <button
                            className="absolute bottom-[0px] w-full bg-[#ff4757] text-white py-2 px-3 rounded-lg hover:opacity-90"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Add
                        </button>
                    </div>
                </div>



            </div>
        </div>
    );
}

export default AddTopicForm;
