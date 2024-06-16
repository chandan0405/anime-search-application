import React from "react";
import { rigthIcon, leftIcon } from "../assets";

const Pagination = ({
  currentPage,
  totalRecords,
  recordsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };  

  return (
    <div className="pagination-container">
      <button
        onClick={handlePrevPage}
        className="left-icon-container"
        disabled={currentPage === 1}
      >
        <img src={leftIcon} alt="left" className="left-icon" />
      </button>
      <span className="page-info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        className="right-icon-container"
        disabled={currentPage === totalPages}
      >
        <img src={rigthIcon} alt="right" className="right-icon" />
      </button>
    </div>
  );
};

export default Pagination;
