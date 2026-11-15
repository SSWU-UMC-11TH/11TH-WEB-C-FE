interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (nextPage: number) => void;
}


export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const pageGroupSize = 5;

    const startPage = Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;
    const endPage = Math.min(startPage + pageGroupSize -1, totalPages);

    const pageNumbers = Array.from(
        { length: endPage - startPage + 1},
        (_, index) => startPage + index
    );

    return (
        <nav
            aria-label="페이지 이동"
            className="mt-8 flex items-center justify-center gap-2"
        >
            <button
                type="button"
                className="flex h-8 w-8 items-center justify-center text-gray-400"
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                &lt;
            </button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                    className={
                        page === currentPage
                            ? "flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-sm text-white"
                            : "flex h-8 w-8 items-center justify-center rounded-md text-sm text-gray-600 hover:bg-gray-200"
                    }
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                className="flex h-8 w-8 items-center justify-center text-gray-600"
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                &gt;
            </button>
        </nav>
    );
}
