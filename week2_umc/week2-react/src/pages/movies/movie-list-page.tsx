import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { useEffect, useState } from "react";
import { getMovies } from "../../api/movies/get-movies";

export const MovieListPage = () => {
const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);
const [errorMessage, setErrorMessage] = useState<string | null>(null);

useEffect(() => {
  let ignore = false;
  async function loadMovies() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await getMovies({ page: 1 });
      if (!ignore) setMovies(response.results);
    } catch {
      if (!ignore) setErrorMessage("영화 목록을 불러오지 못했어요.");
    } finally {
      if (!ignore) setIsLoading(false);
    }
  }

  loadMovies();

  return () => {
    ignore = true;
  };
}, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f4f5f7] font-sans text-[#111]">
      <main className="w-full max-w-[1080px] mx-auto px-[20px] py-[16px] box-border flex-1">
        <h1 className="text-[22px] font-[800] text-left mt-[12px] mb-[16px] text-[#111]">
          영화 목록
        </h1>

        {/* 로딩, 에러, 성공 상태별 화면 처리 */}
        {isLoading && (
          <div className="py-[40px] text-center text-[#6b7280]">
            영화를 불러오는 중입니다...
          </div>
        )}

        {errorMessage && (
          <div className="py-[40px] text-center text-[#ef4444]">
            {errorMessage}
          </div>
        )}

        {!isLoading && !errorMessage && <MovieGrid movies={movies} />}

        <Pagination />
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