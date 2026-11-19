import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/members/me";
import { useAuthStore } from "../../stores/auth-store";

export function Header() {

    const accessToken = useAuthStore((state) => state.accessToken);

    const meQuery = useQuery({
        queryKey: ["members", "me"],
        queryFn: getMe,
        enabled: Boolean(accessToken),
        staleTime: 5 * 60 * 1000,
        retry: false,
    });

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

                {!accessToken ? (
                    <Link to="/login">로그인</Link>
                ) : meQuery.isLoading ? (
                    <span className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
                ) : (
                    <Link to="/my">마이페이지</Link>
                )};
            </div>
        </header>
    );
}