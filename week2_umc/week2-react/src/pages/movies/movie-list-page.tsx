import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/movies/get-movies";

export const MovieListPage = () => {
// 현재 페이지 번호 관리
const [page, setPage] = useState(1);

// 영화 목록 데이터 요청
const moviesQuery = useQuery({
  queryKey: ["movies", "list", { page }],
  queryFn: () => getMovies({ page }),
});

// API 응답 데이터 가져오기
const movies = moviesQuery.data?.results ?? [];
const totalPages = moviesQuery.data?.total_pages ?? 0;

// 페이지 변경 함수
const handlePageChange = (nextPage: number) => {
  setPage(nextPage);
};

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f4f5f7] font-sans text-[#111]">
      <main className="w-full max-w-[1080px] mx-auto px-[20px] py-[16px] box-border flex-1">
        <h1 className="text-[22px] font-[800] text-left mt-[12px] mb-[16px] text-[#111]">
          영화 목록
        </h1>

        {/* 로딩, 에러, 성공 상태별 화면 처리 */}
      {/* 로딩, 에러, 성공 상태별 화면 처리 */}
      {moviesQuery.isPending ? (
        <div className="py-[40px] text-center text-[#6b7280]">
          영화를 불러오는 중입니다...
        </div>
      ) : moviesQuery.isError ? (
        <div className="py-[40px] text-center text-[#ef4444]">
          {moviesQuery.error.message}
        </div>
      ) : movies.length === 0 ? (
        <div className="py-[40px] text-center text-[#6b7280]">
          표시할 영화가 없어요.
        </div>
      ) : (
        <>
          <MovieGrid movies={movies} />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      </main>

      <footer className="w-full border-t border-[#e5e7eb] bg-white py-[16px] mt-[40px]">
        <div className="max-w-[1080px] mx-auto px-[20px] flex items-center justify-end gap-[8px] text-[11px] text-[#6b7280]">
          <img
            src="/icons/tmdb-logo.svg"
            alt="TMDB Logo"
            className="h-[12px] object-contain"
          />
          <span>
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </span>
        </div>
      </footer>
    </div>
  );
};