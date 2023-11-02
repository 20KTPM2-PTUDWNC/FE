import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const limit = 5;
        let startPage = Math.max(currentPage - 2, 1);
        let endPage = Math.min(startPage + limit - 1, totalPages);

        if (endPage - startPage < limit - 1) {
            startPage = Math.max(endPage - limit + 1, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers.map((number) => (
            <button
                key={number}
                className={`px-3 py-2 mx-1 rounded-md ${
                    currentPage === number ? "bg-[#00ADB5] text-white" : "bg-gray-500 text-gray-300"
                }`}
                onClick={() => onPageChange(number)}
            >
                {number}
            </button>
        ));
    };

    return <div className="flex justify-center mt-10 font-sans">{renderPageNumbers()}</div>;
}

export default Pagination;
