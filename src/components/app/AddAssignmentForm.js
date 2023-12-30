import React, { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { handleTitle } from "../../utils/handleTitle";

import { formatDateTime } from "../../utils/formatDate.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCookies, getUser } from "../../features/user";
import { addAssignment } from "../../api/assignment/assignment.api.js";
import Cookies from "universal-cookie";

function AddAssignmentForm({ onClose, topic, onClick, _gradeStructureId }) {
    const [name, setName] = useState("");
    const [_scale, setScale] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);

    const navigate = useNavigate();
    const user = getUser();
    const cookie = new Cookies();
    const params = useParams();
    const gradeStructureId = _gradeStructureId;
    const [content, setContent] = useState('')
    console.log(gradeStructureId)

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
        else {
            cookie.set('token', getCookies(), { path: `/v1/assignment/addAssignment/${gradeStructureId}` });
        }
    }, [_gradeStructureId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !_scale) {
            return setError("Please fill all field!");
        }

        let scale = Number(_scale);

        let newAssignment = {
            name, scale
        };

        try {
            const response = await addAssignment(gradeStructureId, newAssignment);
            if (response.status === 200) {
                alert("Add new assignment successfully!");
                onClose();
                onClick()
            }
        } catch (error) {
            setError(error.response.data.message);
            alert(error.response.data.message)
            console.log(error);

        }
    };

    useEffect(() => {

        // loadImg();


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
            <div className="w-[1000px] h-[600px] bg-white rounded-lg p-8 max-w-[1100px]">
                <div className="relative flex justify-between items-center">
                    <div className="flex justify-between items-center mb-4 w-full">
                        <span className="text-2xl text-[#5f27cd]  font-bold">Options</span>
                    </div>

                    <button
                        className="absolute top-[0px] right-[0px] bg-[#5f27cd] text-white px-3 py-1 font-bold rounded"
                        onClick={onClose}
                    >
                        Back
                    </button>
                </div>

                {/* Render CV list */}

                <div className="relative overflow-y-auto w-full font-sans">

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
                            <p className="text-[#5f27cd] font-semibold mb-1">Grade percentage</p>
                            <input
                                type="text"
                                name="_scale"
                                id="_scale"
                                className="text-black border-b-2 border-[#5f27cd] p-2 w-full"
                                value={_scale}
                                onChange={(e) => setScale(e.target.value)}
                            />
                        </div>
                        <div className="mt-10 mb-5">
                            {/* Attached File */}
                            <div className="flex justify-between p-5 items-center rounded-lg border-2 border-[#5f27cd]">
                                <button className="font-bold text-[#5f27cd] py-2 px-5 rounded-lg border-2 border-[#5f27cd]">{file ? handleTitle(file.name, 40) : "No file"}</button>
                                <label
                                    htmlFor="file"
                                    className="bg-[#5f27cd] text-white px-4 py-2 rounded cursor-pointer"
                                >
                                    Choose File
                                </label>
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    className="hidden"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                        </div>
                        <button
                            className=" mt-5 w-full bg-[#ff4757] text-white py-2 px-3 rounded-lg hover:opacity-90"
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

export default AddAssignmentForm;
