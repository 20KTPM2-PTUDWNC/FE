import React, { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { handleTitle } from "../utils/handleTitle";
import { approveCV, getCVByPostId, inviteCV, pendingCV, rejectCV } from "../api/cv/cv.api.js";
import { sendEmail } from "../api/email/email.api.js";
import { selectUser } from "../features/userSlice.js";
import { formatDateTime } from "../utils/formatDate.js";
import { Link } from "react-router-dom";

function InvitationByEmailForm({ onClose, topic }) {
    const [email, setEmail] = useState("");
    const [searchResult, setSearchResult] = useState(null);

    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const handleInputChange = (event) => {
        setEmail(event.target.value);
    };
    const [images, setImages] = useState([])
    useEffect(() => {

        handleSearch()


        return () => {
            console.log("useEffect done");
        }
    }, [email])

    const handleSearch = async () => {
        try {
            const response = await fetch(`/api/email/search?email=${email}`);
            console.log(response)
            if (!response.ok) {
                // Handle non-successful response (e.g., display an error message)
                console.error('Error searching for email:', response.statusText);
                return;
            }

           
            setSearchResult(response.result);
        } catch (error) {
            console.error('Error searching for email:', error);
        }
    };
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 text-black bg-opacity-75 flex justify-center items-center">
            <div className="w-[600px] h-[300px] bg-white rounded-lg p-8 max-w-[1100px]">
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


                            <label>
                                <p className="text-[#5f27cd] font-semibold mb-1">Enter email address</p>
                                <input
                                    type="text"
                                    className="text-black border-b-2 border-[#5f27cd] p-2 w-full"
                                    value={email}
                                    onChange={handleInputChange} />
                            </label>


                            {searchResult && (
                                <div className="text-black border-b-2 border-[#5f27cd] p-2 w-full">
                                    <h3>Email Account Information:</h3>
                                    <p>Email: {searchResult.email}</p>
                                    <p>Name: {searchResult.name}</p>
                                    {/* Add more details as needed */}
                                </div>
                            )}
                        </div>


                        <button
                            className=" mt-5 w-full bg-[#ff4757] text-white py-2 px-3 rounded-lg hover:opacity-90"
                            type="submit"
                            onClick={onClose}
                        >
                            Invite
                        </button>
                    </div>
                </div>



            </div>
        </div>
    );
}

export default InvitationByEmailForm;
