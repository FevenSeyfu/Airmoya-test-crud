import React from 'react';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-8 h-8 border border-gray-700 rounded-md bg-white text-black hover:bg-gray-200 disabled:opacity-50"
      >
        <IoMdArrowDropleft size={24} />
      </button>
      <span className="mx-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-8 h-8 border border-gray-700 rounded-md bg-white text-black hover:bg-gray-200 disabled:opacity-50"
      >
        <IoMdArrowDropright size={24} />
      </button>
    </div>
  );
};

export default Pagination;