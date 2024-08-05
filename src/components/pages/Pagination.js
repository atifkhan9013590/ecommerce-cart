import React from 'react'

function Pagination({ currentPage, itemsPerPage, totalItems, onPageChange }) {


const totalPages = Math.ceil(totalItems / itemsPerPage);

  const lastIndex = Math.min(currentPage * itemsPerPage, totalItems);
  const firstIndex = (currentPage - 1) * itemsPerPage + 1;
  
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  return (
    <>
      <div className="pagination">
        <div onClick={handlePrevious}>&lt;</div>
        {Array.from({ length: totalPages }, (_, index) => (
          <div
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={index + 1 === currentPage ? "active" : "buttons"}
          >
            {index + 1}
          </div>
        ))}
        <div onClick={handleNext}>&gt;</div>
      </div>
      <div className="shows">
        You're viewing {firstIndex}-{lastIndex} of {totalItems}
        products
      </div>
    </>
  );
}

export default Pagination