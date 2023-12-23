// import React from "react";
// import { formatDateLeft } from "../../utils/formatDate";
// import { handleTitle } from "../../utils/handleTitle";
// import { Link } from "react-router-dom";
// import Pagination from "./Pagination";

// function Jobs({ jobs, pageNumber, currentPage, setCurrentPage }) {
//     return (
//         <>
//             {jobs && jobs.length > 0 && (
//                 <>
//                     <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
//                         {jobs.map((job) => (
//                             <div
//                                 key={job?._id}
//                                 className="shadow-lg shadow-[#040c16] rounded-md flex flex-col justify-start items-center text-center mx-auto bg-[#FAE3D9] font-sans"
//                             >
//                                 <div
//                                     style={{ backgroundImage: `url(${job?.userId?.avatar})` }}
//                                     className="group container rounded-t flex flex-col justify-center items-center text-center mx-auto content-div"
//                                 >
//                                     <div className="overlay rounded-t group-hover:opacity-60"></div>
//                                     <div className="opacity-0 z-10 group-hover:opacity-100 ">
//                                         <span className="pt-2">{formatDateLeft(new Date(job?.expiredDate))}</span>
//                                         <div className="text-center pt-4">
//                                             <Link to={`/job/${job?._id}`}>
//                                                 <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg group-hover:translate-y-[-10px] ">
//                                                     <span className="flex items-center">Detail</span>
//                                                 </button>
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="pt-2 text-black px-3 py-4">
//                                     <span className="text-xl font-semibold">{handleTitle(job?.title)}</span>
//                                     <Link to={`/company_profile/${job?.userId?._id}`}>
//                                         <p className="text-lg font-semibold pt-1 hover:text-[#00ADB5]">
//                                             {job?.userId?.companyName}
//                                         </p>
//                                     </Link>
//                                     <p className="pt-1">{job?.address}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <Pagination currentPage={currentPage} totalPages={pageNumber} onPageChange={setCurrentPage} />
//                 </>
//             )}

//             {jobs && jobs.length === 0 && (
//                 <div className="flex justify-center items-center w-full h-full py-60">
//                     <p className="text-2xl font-bold">No jobs</p>
//                 </div>
//             )}
//         </>
//     );
// }

// export default Jobs;
