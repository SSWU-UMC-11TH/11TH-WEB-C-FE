
export default function Pagination() {
    return (
        <nav
            aria-label="페이지 이동"
            className="mt-8 flex items-center justify-center gap-2"
        >
            <button
                type="button"
                className="flex h-8 w-8 items-center justify-center text-gray-400"
                disabled
            >
                &lt;
            </button>

            {[1, 2, 3, 4, 5].map((page) => (
                <button
                    key={page}
                    type="button"
                    className={
                        page === 1
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
            >
                &gt;
            </button>
        </nav>
    );
}
