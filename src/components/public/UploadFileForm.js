import React, { useEffect, useState } from "react";
import Papa from 'papaparse'; // Import papaparse for CSV parsing
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage, faFile, faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { uploadStudentList } from "../../api/class/class.api";
import { uploadGrade } from "../../api/grade/grade.api";

function UploadFileForm({ onClose, uploadType, classId }) {
    const [fileInfo, setFileInfo] = useState(null);
    const [file, setFile] = useState(null)
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile)
        displayFileInfo(selectedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile)
        displayFileInfo(droppedFile);
    };

    const displayFileInfo = (file) => {
        if (file) {
            setFileInfo({
                name: file.name,
                size: file.size,
                type: file.type,
            });

            // Parse the CSV file to check column names and validate data
            if (file.type === 'text/csv') {
                parseCSVFile(file);
            }
            else {
                setFile(null)
                alert("File must be CSV")
            }
        }
    };

    const parseCSVFile = (file) => {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: (result) => {
                // Check if the required column names exist
                let requiredColumnNames = [];
                if (uploadType === "grade list") {
                    requiredColumnNames = ['studentId', 'email', 'grade']
                }
                else if (uploadType === "mapping studentId") {
                    requiredColumnNames = ['studentId', 'name', 'email']
                }
                else if (uploadType === "student list") {
                    requiredColumnNames = ['studentId', 'name']
                }
                else {
                    alert("Invalid upload type");
                    return;
                }
                function areArraysEqual(arrayA, arrayB) {
                    // Check if the length is the same
                    if (arrayA.length !== arrayB.length) {
                        return false;
                    }

                    // Check each element in the arrays
                    for (let i = 0; i < arrayA.length; i++) {
                        if (arrayA[i] !== arrayB[i]) {
                            return false;
                        }
                    }

                    // If all elements are the same, the arrays are equal
                    return true;
                }
                const hasRequiredColumns = areArraysEqual(requiredColumnNames, result.meta.fields)



                if (hasRequiredColumns) {

                    // Validate column data
                    const isValidData = result.data.every(row => {
                        if (uploadType === "grade list") {
                            // Check if the email column contains valid email addresses
                            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email);
                            // ^: Asserts the start of the string.
                            // [^\s@]+: Matches one or more characters that are not whitespace (\s) or the at symbol (@). This ensures that there is at least one character before the "@" symbol in the local part of the email address.
                            // @: Matches the "@" symbol.
                            // [^\s@]+: Matches one or more characters that are not whitespace (\s) or the at symbol (@). This ensures that there is at least one character after the "@" symbol in the domain part of the email address.
                            // \.: Escapes the dot (.) character to match it literally. It ensures that there is a dot after the "@" symbol, separating the domain and top-level domain (TLD) parts of the email address.
                            // [^\s@]+: Matches one or more characters that are not whitespace (\s) or the at symbol (@). This ensures that there is at least one character after the dot in the TLD part of the email address.
                            // $: Asserts the end of the string.

                            // Check if the grade column contains numbers between 0 and 10
                            const isValidGrade = typeof row.grade === 'number' && row.grade >= 0 && row.grade <= 10;

                            return isValidEmail && isValidGrade;
                        }
                        if (uploadType === "mapping studentId") {
                            // Check if the email column contains valid email addresses
                            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email);
                            // ^: Asserts the start of the string.
                            // [^\s@]+: Matches one or more characters that are not whitespace (\s) or the at symbol (@). This ensures that there is at least one character before the "@" symbol in the local part of the email address.
                            // @: Matches the "@" symbol.
                            // [^\s@]+: Matches one or more characters that are not whitespace (\s) or the at symbol (@). This ensures that there is at least one character after the "@" symbol in the domain part of the email address.
                            // \.: Escapes the dot (.) character to match it literally. It ensures that there is a dot after the "@" symbol, separating the domain and top-level domain (TLD) parts of the email address.
                            // [^\s@]+: Matches one or more characters that are not whitespace (\s) or the at symbol (@). This ensures that there is at least one character after the dot in the TLD part of the email address.
                            // $: Asserts the end of the string.  

                            return isValidEmail
                        }
                        return true
                    });

                    if (isValidData) {
                        console.log('CSV file has valid data.');
                        // Call your API function here with result.data
                    } else {
                        setFile(null)
                        alert('CSV file contains invalid data.');
                        console.log('CSV file contains invalid data.');
                        // Handle the case where data is not valid
                    }
                } else {
                    setFile(null)
                    alert('CSV file error .');
                    console.log('CSV file is missing some required columns.');
                    // Handle the case where required columns are missing
                }
            },
            error: (error) => {
                alert('Error parsing CSV file:', error.message)
                console.error('Error parsing CSV file:', error.message);
                // Handle the CSV parsing error
            },
        });
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (file && fileInfo && fileInfo.type === 'text/csv') {
            const formData = new FormData();
            formData.append('file', file);
            console.log(formData)
            console.log(file)
            try {
                // Assuming you have an API function called uploadCSVFile
                // Replace 'yourApiFunction' with the actual API function
                let response = null
                if (uploadType === "grade list") {
                    response = await uploadGrade(classId, formData);
                }
                else if (uploadType === "mapping studentId") {
                    // requiredColumnNames = ['studentId', 'name', 'email']
                }
                else if (uploadType === "student list") {
                    response = await uploadStudentList(classId, formData); // Pass fileInfo or any other required parameters
                }
                else {
                    alert("Invalid upload type");
                    return;
                }


                // Handle the API response as needed
                console.log('API response:', response);

                // Close the modal or perform any other actions
                onClose();
            } catch (error) {
                // Handle API error
                console.error('API error:', error);
            }
        } else {
            // Handle the case where the file type is not CSV
            console.log('Invalid file type. Only CSV files are allowed.');
            // You can show an error message or take appropriate actions
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 text-black bg-opacity-75 flex justify-center items-center">
            <div className="w-[1000px] h-[450px] bg-white rounded-lg p-8 max-w-[1100px]">
                <div className="relative flex justify-between items-center">
                    <div className="flex justify-between items-center mb-4 w-full">
                        <span className="text-2xl text-[#5f27cd]  font-bold">Upload your file</span>
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
                            className="flex items-center justify-center content-center w-full"
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
                                            <p className="my-2 text-sm text-gray-500 dark:text-gray-400">
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