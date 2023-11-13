// import React, { useEffect, useState } from "react";
// import { AiOutlineDownload } from "react-icons/ai";
// import { useSelector } from "react-redux";
// import { approveCV, getCVByPostId, inviteCV, pendingCV, rejectCV } from "../api/cv/cv.api.js";
// import { sendEmail } from "../api/email/email.api.js";
// import { selectUser } from "../features/userSlice.js";
// import { formatDateTime } from "../utils/formatDate.js";
// import { Link } from "react-router-dom";

// function CVListForm({ jobId, onClose }) {
//     const [CVList, setCVList] = useState([]);
//     const [selectedCv, setSelectedCv] = useState(null);
//     const [inviteForm, setInviteForm] = useState(false);
//     const [isHandle, setIsHandle] = useState(false);
//     const [filter, setFilter] = useState(1); // 1: Pending, 2: Rejected, 3: Approved, 4: Invited
//     const [error, setError] = useState("");

//     const [subjectEmail, setSubjectEmail] = useState("");
//     const [timeEmail, setTimeEmail] = useState("");
//     const [addressEmail, setAddressEmail] = useState();
//     const [messageEmail, setMessageEmail] = useState("");

//     const user = useSelector(selectUser);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await getCVByPostId({ postId: jobId, authToken: user?.token, status: filter });
//                 setIsHandle(false);
//                 setCVList(response.data);
//             } catch (error) {
//                 console.error(error);
//                 setError(error.response?.data?.message);
//             }
//         };

//         fetchData();
//     }, [jobId, user, filter, isHandle]);

//     const handlePending = async () => {
//         try {
//             await pendingCV({ id: selectedCv?._id, authToken: user?.token });
//             setSelectedCv(null);
//             setIsHandle(true);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleReject = async () => {
//         try {
//             await rejectCV({ id: selectedCv?._id, authToken: user?.token });
//             setSelectedCv(null);
//             setIsHandle(true);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleApprove = async () => {
//         try {
//             await approveCV({ id: selectedCv?._id, authToken: user?.token });
//             setSelectedCv(null);
//             setIsHandle(true);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleInvite = async (e) => {
//         e.preventDefault();
//         if (!subjectEmail || !messageEmail || !timeEmail || !addressEmail) {
//             return setError("Please fill all fields!");
//         }

//         if (new Date(timeEmail) < new Date()) {
//             return setError("Time must be greater than today!");
//         }

//         setError("");

//         const data = {
//             userId: user._id,
//             subject: subjectEmail,
//             message: messageEmail,
//             time: timeEmail,
//             address: addressEmail,
//             toEmail: selectedCv?.userId?.email,
//         };

//         try {
//             await Promise.all([sendEmail(data), inviteCV({ id: selectedCv?._id, authToken: user?.token })]);

//             alert("Emails sent successfully!");
//             setInviteForm(false);
//             setSelectedCv(null);
//             setIsHandle(true);
//         } catch (error) {
//             setError(error.response?.data?.message || "Failed to send email");
//             console.log(error);
//         }
//     };

//     return (
//         <div className="absolute top-0 left-0 w-full h-full bg-gray-900 text-black bg-opacity-75 flex justify-center items-center">
//             <div className="w-[600px] bg-white rounded-lg p-8 max-w-[1100px]">
//                 <div className="relative flex justify-between items-center">
//                     <div className="flex justify-between items-center mb-4 w-full">
//                         <span className="text-2xl font-bold">Applicant List</span>
//                         {!selectedCv && (
//                             <select
//                                 className="border border-gray-400 text-black py-1 px-1 rounded-lg mr-10"
//                                 value={filter}
//                                 onChange={(e) => {
//                                     setFilter(e.target.value);
//                                 }}
//                             >
//                                 <option value="1">Pending</option>
//                                 <option value="2">Rejected</option>
//                                 <option value="3">Approved</option>
//                                 <option value="4">Invited</option>
//                             </select>
//                         )}
//                     </div>

//                     <button
//                         className="absolute top-[-16px] right-[-16px] bg-[#da4167] text-white px-3 py-1 font-bold rounded"
//                         onClick={onClose}
//                     >
//                         X
//                     </button>
//                 </div>

//                 {/* Render CV list */}
//                 {!selectedCv && (
//                     <div className="overflow-y-auto w-full h-64 font-sans">
//                         <div className="flex flex-col">
//                             {CVList &&
//                                 CVList.map((cv) => (
//                                     <button
//                                         className="flex justify-between hover:bg-[#98D8AA] px-2 py-4 rounded-sm"
//                                         key={cv?._id}
//                                         onClick={() => setSelectedCv(cv)}
//                                     >
//                                         <Link to={`/profile/${cv?.userId?._id}`}>
//                                             <p
//                                                 className="font-bold hover:text-[#00ADB5]"
//                                                 onClick={() => {
//                                                     setSelectedCv(null);
//                                                     onClose();
//                                                 }}
//                                             >
//                                                 {cv?.userId?.name}
//                                             </p>
//                                         </Link>
//                                         <p className="text-sm">{formatDateTime(cv?.createdAt)}</p>
//                                     </button>
//                                 ))}

//                             {CVList === null && (
//                                 <div className="flex justify-center items-center h-64">
//                                     <p className="text-2xl font-bold">No CVs</p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Render CV Detail Form*/}
//                 {selectedCv && !inviteForm && (
//                     <div className="overflow-y-auto w-full h-64 font-sans">
//                         <div className="flex flex-col">
//                             <div className="flex flex-col">
//                                 <div className="flex justify-between items-center">
//                                     <div className="flex">
//                                         <p className="font-bold">Status:</p>
//                                         {selectedCv?.status === 1 && (
//                                             <p className="ml-2 font-semibold text-[#00ADB5]">Pending</p>
//                                         )}
//                                         {selectedCv?.status === 2 && (
//                                             <p className="ml-2 font-semibold text-[#D14D72]">Rejected</p>
//                                         )}
//                                         {selectedCv?.status === 3 && (
//                                             <p className="ml-2 font-semibold text-[#8F43EE]">Approved</p>
//                                         )}
//                                         {selectedCv?.status === 4 && (
//                                             <p className="ml-2 font-semibold text-[#98D8AA]">Invited</p>
//                                         )}
//                                     </div>
//                                     <div className="mr-2">
//                                         <a href={selectedCv?.CVFileURL} target="_blank" rel="noopener noreferrer">
//                                             <div className="flex items-center text-[#6DA9E4]">
//                                                 <AiOutlineDownload size={"20px"} />
//                                                 <span className="font-semibold ml-1">Download CV</span>
//                                             </div>
//                                         </a>
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-row mt-2">
//                                     <div className="w-5/12">
//                                         <p className="font-bold">Name</p>
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             id="name"
//                                             className="border-2 border-gray-300 rounded-md p-2"
//                                             value={selectedCv?.userId?.name}
//                                             readOnly
//                                             disabled
//                                         />
//                                     </div>
//                                     <div className="w-7/12">
//                                         <p className="font-bold">Email</p>
//                                         <input
//                                             type="text"
//                                             name="email"
//                                             id="email"
//                                             className="border-2 border-gray-300 rounded-md p-2 w-full"
//                                             value={selectedCv?.userId?.email}
//                                             readOnly
//                                             disabled
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-row mt-2">
//                                     <div className="w-5/12">
//                                         <p className="font-bold">Phone</p>
//                                         <input
//                                             type="text"
//                                             name="phone"
//                                             id="phone"
//                                             className="border-2 border-gray-300 rounded-md p-2"
//                                             value={selectedCv?.userId?.phone}
//                                             readOnly
//                                             disabled
//                                         />
//                                     </div>
//                                     <div className="w-7/12">
//                                         <p className="font-bold">Address</p>
//                                         <input
//                                             type="text"
//                                             name="address"
//                                             id="address"
//                                             className="border-2 border-gray-300 rounded-md p-2 w-full"
//                                             value={selectedCv?.userId?.address}
//                                             readOnly
//                                             disabled
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="mt-2">
//                                     <p className="font-bold">Description</p>
//                                     <textarea
//                                         type="text"
//                                         name="description"
//                                         id="description"
//                                         className="border-2 border-gray-300 rounded-md p-2 w-full"
//                                         value={selectedCv?.description}
//                                         rows={5}
//                                         readOnly
//                                         disabled
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Render Invite Form */}
//                 {selectedCv && inviteForm && (
//                     <div className="overflow-y-auto w-full h-64 font-sans">
//                         <div className="flex flex-col">
//                             {error && (
//                                 <p className="bg-[#D14D72] text-sm text-white font-bold py-3 px-4 rounded">{error}</p>
//                             )}

//                             <div className="flex flex-col mt-4">
//                                 <input
//                                     type="text"
//                                     name="subject"
//                                     id="subject"
//                                     className="border-2 border-gray-300 rounded-md p-2"
//                                     placeholder="Subject"
//                                     required
//                                     onChange={(e) => setSubjectEmail(e.target.value)}
//                                 />

//                                 <div className="flex justify-between items-center mt-4">
//                                     <input
//                                         type="text"
//                                         name="address"
//                                         id="address"
//                                         className="border-2 border-gray-300 rounded-md p-2 w-3/5 mr-3"
//                                         placeholder="Address"
//                                         required
//                                         onChange={(e) => setAddressEmail(e.target.value)}
//                                     />
//                                     <input
//                                         type="date"
//                                         name="time"
//                                         id="time"
//                                         className="border-2 border-gray-300 rounded-md p-2 w-2/5"
//                                         required
//                                         onChange={(e) => setTimeEmail(e.target.value)}
//                                     />
//                                 </div>

//                                 <textarea
//                                     type="text"
//                                     name="title"
//                                     id="title"
//                                     className="border-2 border-gray-300 rounded-md p-2 mt-4"
//                                     placeholder="Message"
//                                     required
//                                     rows={10}
//                                     onChange={(e) => setMessageEmail(e.target.value)}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 <div className="flex justify-end mt-8">
//                     {/* Button in CV Detail Form */}
//                     {selectedCv && !inviteForm && (
//                         <>
//                             <button
//                                 className="bg-[#B7B7B7] text-white px-4 py-2 rounded mr-4"
//                                 onClick={() => setSelectedCv(null)}
//                             >
//                                 Back
//                             </button>

//                             {/* If CV is "Pending" */}
//                             {selectedCv?.status === 1 && (
//                                 <>
//                                     <button
//                                         className="bg-[#D14D72] text-white px-4 py-2 rounded mr-4"
//                                         onClick={handleReject}
//                                     >
//                                         Reject
//                                     </button>
//                                     <button
//                                         className="bg-[#8F43EE] text-white px-4 py-2 rounded mr-4"
//                                         onClick={handleApprove}
//                                     >
//                                         Approve
//                                     </button>
//                                 </>
//                             )}

//                             {/* If CV is "Rejected" or "Approved" */}
//                             {(selectedCv?.status === 2 || selectedCv?.status === 3) && (
//                                 <button
//                                     className="bg-[#00ADB5] text-white px-4 py-2 rounded mr-4"
//                                     onClick={handlePending}
//                                 >
//                                     Pending
//                                 </button>
//                             )}

//                             {/* If CV is "Approved" */}
//                             {selectedCv?.status === 3 && (
//                                 <button
//                                     className="bg-[#A4D0A4] text-white px-4 py-2 rounded mr-4"
//                                     onClick={() => setInviteForm(true)}
//                                 >
//                                     Invite
//                                 </button>
//                             )}
//                         </>
//                     )}

//                     {/* Button in Invite Form */}
//                     {selectedCv && inviteForm && (
//                         <>
//                             <button
//                                 className="bg-[#B7B7B7] text-white px-4 py-2 rounded mr-4"
//                                 onClick={() => setInviteForm(false)}
//                             >
//                                 Back
//                             </button>
//                             <button className="bg-[#00ADB5] text-white px-4 py-2 rounded mr-4" onClick={handleInvite}>
//                                 Send
//                             </button>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CVListForm;
