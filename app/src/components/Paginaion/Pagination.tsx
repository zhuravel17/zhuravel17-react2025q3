import { ReactElement } from 'react';
import './Pagination.styles.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps): ReactElement {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="pagination-container">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
          className="pagination-button"
        >
          {page}
        </button>
      ))}
    </div>
  );
}
