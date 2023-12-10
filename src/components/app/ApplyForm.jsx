// import React, { useState } from "react";
// import { createCV } from "../api/cv/cv.api";
// import { handleTitle } from "../utils/handleTitle";

// function ApplyForm({ jobId, authToken, onClose }) {
//     const [description, setDescription] = useState("");
//     const [file, setFile] = useState(null);

//     const handleApply = async () => {
//         if (!description || !file) {
//             return alert("Please fill all fields!");
//         }

//         const formData = new FormData();
//         formData.append("description", description);
//         formData.append("file", file);
//         formData.append("postId", jobId);

//         try {
//             await createCV({ formData, authToken });
//             alert("Apply successfully!");
//             onClose();
//         } catch (error) {
//             console.log(error);
//             alert("Failed to apply!");
//         }
//     };

//     return (
//         <div className="fixed top-0 left-0 w-full h-full bg-gray-900 text-black bg-opacity-75 flex justify-center items-center">
//             <div className="w-[600px] bg-white rounded-lg p-8 max-w-[1100px]">
//                 <div className="relative flex justify-between items-center">
//                     <h2 className="text-2xl font-bold mb-4">Upload your CV</h2>

//                     <button
//                         className="absolute top-[-16px] right-[-16px] bg-[#da4167] text-white px-3 py-1 font-bold rounded"
//                         onClick={onClose}
//                     >
//                         X
//                     </button>
//                 </div>

//                 <div className="overflow-y-auto w-full h-64 font-sans">
//                     <div className="flex flex-col">
//                         <div className="flex flex-col mt-4">
//                             <div className="mt-2">
//                                 {/* Attached File */}
//                                 <div className="flex justify-between items-center">
//                                     <p className="font-bold">{file ? handleTitle(file.name, 40) : "No file"}</p>
//                                     <label
//                                         htmlFor="file"
//                                         className="bg-[#00ADB5] text-white px-4 py-2 rounded cursor-pointer"
//                                     >
//                                         Choose File
//                                     </label>
//                                     <input
//                                         type="file"
//                                         name="file"
//                                         id="file"
//                                         className="hidden"
//                                         onChange={(e) => setFile(e.target.files[0])}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="mt-2">
//                                 <p className="font-bold">Description</p>
//                                 <textarea
//                                     type="text"
//                                     name="description"
//                                     id="description"
//                                     className="border-2 border-gray-300 rounded-md p-2 w-full"
//                                     rows={5}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex justify-end mt-8">
//                     <button className="bg-[#A4D0A4] text-white px-4 py-2 rounded mr-4" onClick={handleApply}>
//                         Apply
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ApplyForm;
