import React, { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";

import { formatDateTime } from "../../utils/formatDate.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCookies, getUser } from "../../features/user";
import { joinClass } from "../../api/class/class.api.js";
import Cookies from "universal-cookie";

function JoinClass({ onClose }) {
    const [images, setImages] = useState([]);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const user = getUser();
    const cookie = new Cookies();

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
        else {
            cookie.set('token', getCookies(), { path: `/v1/class/joinClass` });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!code) {
            return setError("Please fill all field!");
        }

        const userId = user._id;

        let joinNewClass = {
            code, userId
        };

        try {
            const response = await joinClass(joinNewClass);
            if (response.status === 200) {
                alert("Join new class successfully!");
                onClose()
                navigate('/home');
            }
        } catch (error) {
            setError(error.response.data.message);
            alert(error.response.data.message)
            console.log(error);
            
        }
    };
    // useEffect(() => {

    //     loadImg();


    //     return () => {
    //         console.log("useEffect done");
    //     }
    // }, [])
    // async function loadImg() {

    //     const res = await fetch(`https://api.unsplash.com/search/photos?query=""&client_id=V5Xdz9okJnQnuvIQFN0OjsUaeExGt67obOT3bmCIq0o`)
    //     const imgJson = await res.json()
    //     setImages(imgJson.results)

    // }


    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 text-black bg-opacity-75 flex justify-center items-center">
            <div className="relative w-[600px] bg-white rounded-lg p-8 max-w-[1100px]">
                <div className="relative flex justify-between items-center">
                    <div className="flex justify-between items-center mb-4 w-full">
                        <span className="text-2xl text-[#5f27cd] font-bold">Add New Class</span>

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
                        <div className="mt-5">
                            <p className="text-[#5f27cd] font-semibold mb-1">Enter Room ID</p>
                            <input
                                type="text"
                                name="code"
                                id="code"
                                className="text-black border-b-2 border-[#5f27cd] p-2 w-full"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
            
                        <button
                            className="absolute bottom-[20px] w-11/12 bg-[#ff4757] text-white py-2 px-3 rounded-lg hover:opacity-90"
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

export default JoinClass;
