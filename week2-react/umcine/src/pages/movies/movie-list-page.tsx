import { movies as initialMovies } from "../../data/movies";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import { useBookmarkStore } from "../../stores/useBookmarkStore";

export const MovieListPage = () => {
  const { toggleBookmark, isBookmarked} = useBookmarkStore();

  const movieList = initialMovies.map((movie) => ({
    ...movie,
    isBookmarked: isBookmarked(movie.id),
  }))

  return (
    <main className="max-w-[1280px] mx-auto px-[32px] pt-[40px] pb-[80px] w-full">
      <section className="w-full">
        <h1 className="text-[24px] font-extrabold text-[#111111] mb-[28px] tracking-[-0.5px]">
          영화 목록
        </h1>
        <MovieGrid
          movies={movieList}
          onToggleBookmark={toggleBookmark}
        />
        <Pagination currentPage={1} totalPages={5} />
      </section>
    </main>
  );
};