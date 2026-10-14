import { Link } from "@tanstack/react-router";

export function Header() {
    return (
        <header className="flex w-full items-center justify-between border-b border-gray-200 bg-white px-4 py-6 md:px-10 lg:px-20">
            <div className="flex items-center gap-8">
                <Link to="/" className="text-xl font-bold text-gray-900">
                    UMCine
                </Link>

                <nav className="flex items-center gap-6 text-sm text-gray-700">
                    <Link to="/">영화</Link>
                    <Link to="/search" search={{}}>
                        검색
                    </Link>
                    <span>내 정보</span>
                </nav>
            </div>

            <div className="flex items-center gap-3">
                <Link
                    to="/search"
                    search={{}}
                    aria-label="검색"
                    className="rounded-md border border-gray-200 p-2"
                >
                    <span>⌕</span>
                </Link>

                <button
                    type="button"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                >
                    로그인
                </button>
            </div>
        </header>
    );
}