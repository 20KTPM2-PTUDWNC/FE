import React, { useEffect, useState } from "react";

import { getCookies, getUser } from "../../features/user";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createClass } from "../../api/class/class.api.js";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faFile, faFileAlt } from '@fortawesome/free-regular-svg-icons';
function UploadFileForm({ onClose, onClick }) {
    const [fileInfo, setFileInfo] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log("handelFileChange ",selectedFile)
        displayFileInfo(selectedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        console.log("handleDrop ",droppedFile)
        displayFileInfo(droppedFile);
    };

    const displayFileInfo = (file) => {
        if (file) {
            setFileInfo({
                name: file.name,
                size: file.size,
                type: file.type,
            });
        }
    };

    const getFileIcon = () => {
        if (fileInfo) {
            if (fileInfo.type.startsWith('image/')) {
                return <FontAwesomeIcon icon={faFileImage} size="4x" />;
            } else if (fileInfo.type.startsWith('text/')) {
                return <FontAwesomeIcon icon={faFileAlt} size="4x" />;
            } else {
                return <FontAwesomeIcon icon={faFile} size="4x" />;
            }
        }
        return null;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
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
                        <div
                            className="flex items-center justify-center w-full"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {getFileIcon()}
                                    {fileInfo ? (
                                        <>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">{fileInfo.name}</span>
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {fileInfo.type}, {fileInfo.size} bytes
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                SVG, PNG, JPG, or GIF (MAX. 800x400px)
                                            </p>
                                        </>
                                    )}
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
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

export default UploadFileForm;
