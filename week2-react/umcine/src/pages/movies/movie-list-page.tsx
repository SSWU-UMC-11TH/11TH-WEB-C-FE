import { useState } from "react";
import { movies as initialMovies } from "../../data/movies";
import type { Movie } from "../../types/movie";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";

export const MovieListPage = () => {
  const [movieList, setMovieList] = useState<Movie[]>(initialMovies);

  const handleToggleBookmark = (id: number) => {
    setMovieList((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, isBookmarked: !movie.isBookmarked } : movie
      )
    );
  };

  return (
    <main className="max-w-[1280px] mx-auto px-[32px] pt-[40px] pb-[80px] w-full">
      <section className="w-full">
        <h1 className="text-[24px] font-extrabold text-[#111111] mb-[28px] tracking-[-0.5px]">
          영화 목록
        </h1>
        <MovieGrid
          movies={movieList}
          onToggleBookmark={handleToggleBookmark}
        />
        <Pagination currentPage={1} totalPages={5} />
      </section>
    </main>
  );
};