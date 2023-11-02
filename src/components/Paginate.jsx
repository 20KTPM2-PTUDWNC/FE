import React from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";

function PaginatedItems({ jobs, pageCount }) {
    const handlePageClick = (event) => {
        console.log(event.selected);
    };
    return (
        <div>
            <div className="flex flex-wrap justify-center">
                <div className="w-full px-4">
                    <div className="grid sm:grid-cols-5 md:grid-cols-1 gap-5">
                        {/* Grid Items */}
                        {jobs.map((job, index) => (
                            <div
                                key={index}
                                className="shadow-sm shadow-[#040c16] rounded-md flex justify-center items-center text-center mx-auto bg-[#FAE3D9]"
                            >
                                <div
                                    style={{ backgroundImage: `url(${job.image})` }}
                                    className="group container rounded-t flex justify-center items-center text-center mx-auto content-div"
                                >
                                    {/* Hover Effects */}
                                    <div className="overlay rounded-t group-hover:opacity-60"></div>
                                    <div className="opacity-0 z-10 group-hover:opacity-100 ">
                                        <span className="pt-2">{formatDate(new Date(job.deadline))}</span>
                                        <div className="text-center pt-4">
                                            <Link to={`/job/${job.id}`}>
                                                <button className="text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg group-hover:translate-y-[-10px] ">
                                                    <span className="flex items-center">Detail</span>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-2 text-black px-3 py-4">
                                    <span className="text-2xl font-bold">{job.company}</span>
                                    <p className="pt-1">{job.title}</p>
                                    <p className="pt-1">{job.address}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    pageClassName={"inline-flex -space-x-px"}
                    pageLinkClassName={
                        "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }
                    previousClassName={
                        "px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }
                    nextClassName={
                        "px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }
                    activeClassName={
                        "px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    }
                />
            </div>
        </div>
    );
}

export default PaginatedItems;
