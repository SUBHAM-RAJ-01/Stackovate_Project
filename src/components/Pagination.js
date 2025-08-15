import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../styles/Pagination.css';

const Pagination = ({ total, page, pageSize = 6, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const goPrev = () => canPrev && onPageChange(page - 1);
  const goNext = () => canNext && onPageChange(page + 1);

  // Generate a compact range of page numbers
  const pages = [];
  const maxButtons = 5;
  let start = Math.max(1, page - Math.floor(maxButtons / 2));
  let end = Math.min(totalPages, start + maxButtons - 1);
  start = Math.max(1, Math.min(start, end - maxButtons + 1));
  for (let p = start; p <= end; p++) pages.push(p);

  if (total === 0) return null;

  return (
    <div className="pagination">
      <div className="pagination-info">
        <span>Total: {total}</span>
        <span>Page {page} of {totalPages}</span>
      </div>

      <div className="pagination-controls">
        <button className="page-btn prev" onClick={goPrev} disabled={!canPrev} aria-label="Previous page">
          <FiChevronLeft />
        </button>

        <div className="page-numbers">
          {start > 1 && (
            <>
              <button className="page-num" onClick={() => onPageChange(1)}>1</button>
              {start > 2 && <span className="ellipsis">…</span>}
            </>
          )}

          {pages.map((p) => (
            <button
              key={p}
              className={`page-num ${p === page ? 'active' : ''}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          ))}

          {end < totalPages && (
            <>
              {end < totalPages - 1 && <span className="ellipsis">…</span>}
              <button className="page-num" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
            </>
          )}
        </div>

        <button className="page-btn next" onClick={goNext} disabled={!canNext} aria-label="Next page">
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
