import "./pagination.css";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
}

export const Pagination = ({ currentPage = 1, totalPages = 5 }: PaginationProps) => {
  return (
    <nav className="pagination" aria-label="페이지 내비게이션">
      <button type="button" className="page-btn prev" disabled aria-label="이전 페이지">
        &lt;
      </button>
      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              className={`page-number-btn ${isActive ? "active" : ""}`}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button type="button" className="page-btn next" aria-label="다음 페이지">
        &gt;
      </button>
    </nav>
  );
};