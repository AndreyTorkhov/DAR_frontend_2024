import "../styles/pagination.css";

import React from "react";

function Pagination({ cardsPerPage, totalCards, currentPage, paginate }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  const showStartEllipsis = currentPage > 5;
  const showEndEllipsis = totalPages - currentPage > 5;

  const handlePrevButtonClick = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextButtonClick = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  if (totalPages <= 9) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    if (showStartEllipsis) pageNumbers.push(null);
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      pageNumbers.push(i);
    }
    if (showEndEllipsis) pageNumbers.push(null);
    pageNumbers.push(totalPages);
  }

  return (
    <nav>
      <div className="pagination-container">
        <div
          className="page-button"
          onClick={handlePrevButtonClick}
          disabled={currentPage === 1}
        >
          {"<"}
        </div>
        {pageNumbers.map((number, index) => (
          <React.Fragment key={index}>
            {number ? (
              <div
                className={`page-button ${
                  number === currentPage ? "active" : ""
                }`}
                onClick={() => paginate(number)}
              >
                {number}
              </div>
            ) : (
              <div className="ellipsis">...</div>
            )}
          </React.Fragment>
        ))}
        <div
          className="page-button"
          onClick={handleNextButtonClick}
          disabled={currentPage === totalPages}
        >
          {">"}
        </div>
      </div>
    </nav>
  );
}

export { Pagination };
