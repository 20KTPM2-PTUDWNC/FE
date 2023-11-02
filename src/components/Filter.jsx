import React, { useState } from "react";

const Filter = ({ filter = {}, onFilter }) => {
    const [address, setAddress] = useState("");
    const [minSalary, setMinSalary] = useState("");
    const [maxSalary, setMaxSalary] = useState("");

    const handleFilter = () => {
        const filterObj = { ...filter };

        if (address) {
            filterObj.address = address;
        }

        if (minSalary) {
            filterObj.minSalary = minSalary;
        }

        if (maxSalary) {
            filterObj.maxSalary = maxSalary;
        }

        onFilter(filterObj);
    };

    return (
        <div className="flex justify-between w-[400px] font-sans">
            <div className="flex flex-col">
                <label className="font-semibold mb-1">Address</label>
                <select
                    className="border border-gray-400 text-black py-2 px-2 rounded-lg"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="Ho Chi Minh">Ho Chi Minh</option>
                    <option value="Hanoi">Ha Noi</option>
                </select>
            </div>
            <div className="flex flex-col">
                <label className="font-semibold mb-1">Min salary</label>
                <input
                    className="border border-gray-400 text-black py-2 px-2 w-[80px] rounded-lg"
                    type="number"
                    min={0}
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold mb-1">Max salary</label>
                <input
                    className="border border-gray-400 text-black py-2 px-2 w-[80px] rounded-lg"
                    type="number"
                    min={0}
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                />
            </div>
            <div className="flex items-center">
                <button className="bg-[#1B9C85] text-white px-4 py-2 rounded" onClick={handleFilter}>
                    Filter
                </button>
            </div>
        </div>
    );
};

export default Filter;
