import React, { useEffect, useState } from "react";

import { getCookies, getUser } from "../../features/user";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createClass } from "../../api/class/class.api.js";
import Cookies from "universal-cookie";

function StudentReviewForm({ onClose, onClick }) {
    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const user = getUser();
    const cookie = new Cookies();
    const params = useParams();

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
        else {
            cookie.set('token', getCookies(), { path: `/v1/class/createClass` });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!name) {
        //     return setError("Please fill name field!");
        // }

        // let newClass = {
        //     name, subject
        // };

        // try {
        //     const response = await createClass(newClass);
        //     if (response.status === 200) {
        //         alert("Create new class successfully!");
        //         onClose()
        //         onClick()
        //         navigate('/home');
        //     }
        // } catch (error) {
        //     setError(error.response.data.message);
        //     alert(error.response.data.message)
        //     console.log(error);

        // }
        onClose()
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 text-black bg-opacity-75 flex justify-center items-center">
            <div className="relative w-[600px] bg-white rounded-lg p-8 max-w-[1100px]">
                <div className="relative flex justify-between items-center">
                    <div className="flex justify-between items-center mb-4 w-full">
                        <span className="text-2xl text-[#5f27cd] font-bold">Fill your Review Form</span>

                    </div>

                    <button
                        className="absolute top-[-16px] right-[-16px] bg-[#ff4757] text-white px-3 py-1 font-bold rounded"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>

                <div className="overflow-y-auto w-full h-64 font-sans">
                    <div className="flex flex-col">
                        <div className="mt-5">
                            <p className="text-[#5f27cd] font-semibold mb-1">Your Expected Grade</p>
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
                                className="text-black border-b-2 border-[#5f27cd] p-2 w-full"
                                value={des}
                                onChange={(e) => setDes(e.target.value)}
                            />
                        </div>
                        <button
                            className="absolute bottom-[20px] w-11/12 bg-[#ff4757] text-white py-2 px-3 rounded-lg hover:opacity-90"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentReviewForm;
