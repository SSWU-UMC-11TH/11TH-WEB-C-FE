import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router"
import "./MyPage.css";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { useBookmarkStore } from "../../stores/bookmark-store";
import Pagination from "../../components/movies/pagination";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../../api/members/get-my-info";

export default function MyPage()  {
    
    const bookmarkIds = useBookmarkStore((state) => state.bookmarkedMovieIds);
    const [page, setPage] = useState(1);
    const MOVIES_PER_PAGE = 3;
    const navigate = useNavigate();

    // 영화별 상세 정보 요청
    const movieQueries = useQueries({
        queries: bookmarkIds.map((movieId) => ({
            queryKey: ["movies", "detail", movieId],
            queryFn: () => getMovieDetail(movieId),
            staleTime: 30_000,
        })),
    });

    // 로딩 및 에러 상태
    const isLoading = movieQueries.some((query) => query.isPending);
    const hasError = movieQueries.some((query) => query.isError);
    movieQueries.forEach((query, index) => {
        if (query.isError) {
            console.error("영화 정보 조회 실패", {
                movieId: bookmarkIds[index],
                error: query.error,
            });
        }
    });

     // 로그인한 회원 정보 조회
    const memberQuery = useQuery({
        queryKey: ["members", "me"],
        queryFn: getMyInfo,
        retry: false,
    });
    

    // API 요청에 성공한 영화 목록
    const favoriteMovies = movieQueries.filter((query)=> query.isSuccess).map((query) => query.data);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(favoriteMovies.length / MOVIES_PER_PAGE);

    // 현재 페이지가 전체 페이지 수를 벗어나면 조정
    const currentPage = Math.min(page, Math.max(1, totalPages));

    // 현재 페이지에 표시할 영화 3개
    const paginatedMovies = favoriteMovies.slice((currentPage - 1) * MOVIES_PER_PAGE, currentPage * MOVIES_PER_PAGE);

    // 페이지 이동
    const handlePageChange = (nextPage: number) => { setPage(nextPage);};
    
    return (
       <main className="min-h-screen bg-[#F7F8FA] text-gray-900">
            <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-10 lg:px-20">

                {/* 내 정보 */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        내 정보
                    </h1>

                    <button
                        type="button"
                        onClick={() => navigate({ to: "/mypage/edit"})}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        정보 수정
                    </button>
                </div>

                <hr className="my-6 border-gray-200" />

                {/* 기본 정보 */}
                <section>
                    <h2 className="mb-6 text-lg font-bold">
                        기본 정보
                    </h2>
                    {memberQuery.isPending ? (
                        <p className="text-sm text-gray-500">
                            회원 정보를 불러오는 중...
                        </p>
                    ) : memberQuery.isError ? (
                         <p className="text-sm text-red-500">
                            회원 정보를 불러오지 못했어요.
                            로그인이 되어 있는지 확인해 주세요.
                        </p>
                    ) : (

                     <div className="flex items-center gap-8 py-2">
        {/* 프로필 아이콘 */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-200">
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-2a8 8 0 0 1 16 0v2H4Z" />
            </svg>
        </div>

        {/* 닉네임 */}
        <div className="min-w-0 flex-1">
            <p className="mb-1 text-xs text-gray-400">
                닉네임
            </p>
            <p className="truncate text-sm font-semibold">
                {memberQuery.data.nickname}
            </p>
        </div>

         {/* 이메일 */}
            <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs text-gray-400">
                    이메일
                 </p>
                <p className="truncate text-sm font-semibold">
                    {memberQuery.data.email}
                 </p>
                </div>
            </div>
            )}
        </section>

                <hr className="my-8 border-gray-200" />

                {/* 내 즐겨찾기 */}
                <section>
                    <h2 className="mb-5 text-lg font-bold">
                        내 즐겨찾기
                    </h2>

                    {isLoading ? (
                        <p className="text-sm text-gray-500">
                            즐겨찾기 목록을 불러오는 중...
                        </p>
                    ) : (
                        <>
                            {hasError && (
                                <p className="mb-4 text-sm text-red-500">
                                    일부 영화 정보를 불러오지 못했어요.
                                </p>
                            )}

                            {favoriteMovies.length === 0 ? (
                                <p className="text-sm text-gray-500">
                                    {hasError
                                        ? "영화 정보를 불러오지 못했어요."
                                        : "아직 북마크한 영화가 없어요."}
                                </p>
                            ) : (
                                <>
                                <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">                                    
                                    {paginatedMovies.map((movie) => (
                                        <Link
                                            key={movie.id}
                                            to="/movies/$movieId"
                                            params={{
                                                movieId: String(movie.id),
                                            }}
                                            className="group w-full sm:w-[170px] sm:shrink-0"                                      >
                                            {movie.poster_path ? (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                    alt={`${movie.title} 포스터`}
                                                    className="aspect-[2/3] w-full rounded-lg object-cover transition-transform group-hover:scale-[1.02]"
                                                />
                                            ) : (
                                                <div className="flex aspect-[2/3] items-center justify-center rounded-lg bg-gray-200 text-sm text-gray-500">
                                                    포스터 없음
                                                </div>
                                            )}

                                            <h3 className="mt-2 truncate text-sm font-semibold">
                                                {movie.title}
                                            </h3>

                                            <p className="text-xs text-gray-400">
                                                {movie.release_date}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                                {totalPages > 1 && (
                                    <div className="mt-8 flex justify-center">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                )}
                                </>
                            )}
                        </>
                    )}
                </section>
            </div>
        </main>
    );
};

