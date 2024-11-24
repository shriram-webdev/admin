import React from "react";

const Pagination = ({
  totalPosts,
  postPerPage,
  setCurrentPage,
  currentPage,
  handleDeleteSelected,
}) => {
  const pages = Array.from({ length: Math.ceil(totalPosts / postPerPage) }, (_, i) => i + 1);

  return (
    <div className="pagi">
      <div>
        <button className="delAll" onClick={handleDeleteSelected}>
          Delete Selected
        </button>
      </div>
      <div>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? "active pageNum" : "pageNum"}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
