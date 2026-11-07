
interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const startPage = Math.max(
    1,
    Math.min(page - 2, totalPages - 4)
  );

  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => startPage + index
  );

  return (
    <div className="flex items-center justify-center gap-2 mt-10 mb-8">

      {/* 이전 버튼 */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 h-9 rounded-lg text-sm font-medium
          text-gray-600 hover:bg-gray-200
          disabled:opacity-30 disabled:cursor-not-allowed
          transition-colors"
      >
        {"<"}
      </button>

      {/* 페이지 번호 */}
      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`w-9 h-9 rounded-lg text-sm font-semibold
            transition-all duration-200
            ${
              page === pageNumber
                ? "bg-[#111827] text-white shadow-md"
                : "text-gray-600 hover:bg-gray-200"
            }`}
        >
          {pageNumber}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 h-9 rounded-lg text-sm font-medium
          text-gray-600 hover:bg-gray-200
          disabled:opacity-30 disabled:cursor-not-allowed
          transition-colors"
      >
        {">"}
      </button>

    </div>
  );
}
