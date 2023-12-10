import React, { useState } from "react";
import { useNavigate } from "react-router";
import { updateJob } from "../../api/post/post.api";
import { formatDateISO, formatDateYMD } from "../../utils/formatDate";

function UpdateForm({ job, authToken, onClose }) {
    const [updatedJob, setUpdatedJob] = useState({
        title: job?.title,
        position: job?.position,
        address: job?.address,
        salary: job?.salary,
        description: job?.description,
        jobRequirement: job?.jobRequirement,
    });
    const [expiredDate, setExpiredDate] = useState(formatDateYMD(job?.expiredDate));
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleUpdate = async () => {
        const data = {
            ...updatedJob,
            expiredDate: formatDateISO(expiredDate),
        };

        if (
            !data.title ||
            !data.position ||
            !data.address ||
            !data.salary ||
            !data.description ||
            !data.jobRequirement
        ) {
            return setError("Please fill all fields!");
        }

        if (new Date(data.expiredDate) < new Date()) {
            return setError("Expired date must be greater than today!");
        }

        // If updatedJob === job
        if (JSON.stringify(updatedJob) === JSON.stringify(job) && expiredDate === formatDateYMD(job?.expiredDate)) {
            return setError("No changes!");
        }

        console.log(expiredDate);
        console.log(formatDateYMD(job?.expiredDate));

        // If updatedJob !== job
        try {
            await updateJob({ id: job?._id, data, authToken });

            alert("Update job successfully. Please wait for admin to approve your job!");
            onClose();
            navigate("/myjobs");
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Failed to update job");
        }
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 text-black bg-opacity-75 flex justify-center items-center">
            <div className="w-[800px] bg-white rounded-lg p-8 max-w-[1100px]">
                <div className="relative flex justify-between items-center">
                    <h2 className="text-2xl font-bold mb-4">Update Job</h2>

                    <button
                        className="absolute top-[-16px] right-[-16px] bg-[#da4167] text-white px-3 py-1 font-bold rounded"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>

                {error && <p className="bg-[#D14D72] text-sm text-white font-bold py-3 px-4 rounded mb-4">{error}</p>}

                <div className="overflow-y-auto w-full h-[320px] font-sans">
                    <div className="flex flex-col">
                        <div className="flex">
                            <div className="w-6/12">
                                <p className="font-bold">Title</p>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="border-2 border-gray-400 rounded-md p-2 w-11/12"
                                    value={updatedJob?.title}
                                    onChange={(e) => setUpdatedJob({ ...updatedJob, title: e.target.value })}
                                />
                            </div>

                            <div className="w-6/12">
                                <p className="font-bold">Position</p>
                                <input
                                    type="text"
                                    name="position"
                                    id="position"
                                    className="border-2 border-gray-400 rounded-md p-2 w-full"
                                    value={updatedJob?.position}
                                    onChange={(e) => setUpdatedJob({ ...updatedJob, position: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex mt-4">
                            <div className="w-6/12">
                                <p className="font-bold">Address</p>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    className="border-2 border-gray-400 rounded-md p-2 w-11/12"
                                    value={updatedJob?.address}
                                    onChange={(e) => setUpdatedJob({ ...updatedJob, address: e.target.value })}
                                />
                            </div>

                            <div className="w-3/12">
                                <p className="font-bold">Salary</p>
                                <input
                                    type="text"
                                    name="salary"
                                    id="salary"
                                    className="border-2 border-gray-400 rounded-md p-2 w-11/12"
                                    value={updatedJob?.salary}
                                    onChange={(e) => setUpdatedJob({ ...updatedJob, salary: e.target.value })}
                                />
                            </div>

                            <div className="w-3/12">
                                <p className="font-bold">Deadline</p>
                                <input
                                    type="date"
                                    name="deadline"
                                    id="deadline"
                                    className="border-2 border-gray-400 rounded-md p-2 w-full"
                                    value={expiredDate}
                                    onChange={(e) => setExpiredDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="font-bold">Description</p>
                            <textarea
                                name="description"
                                id="description"
                                className="border-2 border-gray-400 rounded-md p-2 w-full"
                                rows={5}
                                value={updatedJob?.description}
                                onChange={(e) => setUpdatedJob({ ...updatedJob, description: e.target.value })}
                            />
                        </div>

                        <div className="mt-4">
                            <p className="font-bold">Requirements</p>
                            <textarea
                                name="requirements"
                                id="requirements"
                                className="border-2 border-gray-400 rounded-md p-2 w-full"
                                rows={5}
                                value={updatedJob?.jobRequirement}
                                onChange={(e) => setUpdatedJob({ ...updatedJob, jobRequirement: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button className="bg-[#A4D0A4] text-white px-4 py-2 rounded mr-4" onClick={handleUpdate}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateForm;
