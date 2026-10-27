import { useState } from "react";
import { movies as initialMovies } from "../../data/movies";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";

export const MovieListPage = () => {
  const [movies, setMovies] = useState(initialMovies);

  // 북마크 토글 함수
  const handleToggleBookmark = (id: number) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie
      )
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f4f5f7] font-sans text-[#111]">
      <main className="w-full max-w-[1080px] mx-auto px-[20px] py-[16px] box-border flex-1">
        <h1 className="text-[22px] font-[800] text-left mt-[12px] mb-[16px] text-[#111]">
          영화 목록
        </h1>
        <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
        <Pagination />
      </main>

      <footer className="w-full border-t border-[#e5e7eb] bg-white py-[16px] mt-[40px]">
        <div className="max-w-[1080px] mx-auto px-[20px] flex items-center justify-end gap-[8px] text-[11px] text-[#6b7280]">
          <img src="/icons/tmdb-logo.svg" alt="TMDB Logo" className="h-[12px] object-contain" />
          <span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
        </div>
      </footer>
    </div>
  );
};