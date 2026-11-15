import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import { useBookmarkStore } from "../../stores/useBookmarkStore";
import { useMovieListQuery } from "../../queries/movie-queries";

export const MovieListPage = () => {
  const { toggleBookmark, isBookmarked } = useBookmarkStore();
  const { data, isPending, isError } = useMovieListQuery(1);

  // 1. 로딩 상태
  if (isPending) return <p className="text-center py-20 text-gray-500">영화 목록을 불러오는 중이에요...</p>;
  // 2. 오류 상태
  if (isError) return <p className="text-center py-20 text-red-500">영화 목록을 불러오지 못했어요.</p>;

  const movies = data.results;
  // 3. 빈 결과 상태
  if (movies.length === 0) return <p className="text-center py-20 text-gray-500">조건에 맞는 영화가 없어요.</p>;

  const movieList = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    releaseDate: movie.release_date,
    posterPath: movie.poster_path ?? "",
    backdropPath: movie.backdrop_path ?? "",
    runtime: "",
    tagline: "",
    overview: movie.overview,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    genreIds: movie.genre_ids,
    genres: [], 
    isBookmarked: isBookmarked(movie.id),
  }));

  // 4. 성공 상태
  return (
    <main className="max-w-[1280px] mx-auto px-[32px] pt-[40px] pb-[80px] w-full">
      <section className="w-full">
        <h1 className="text-[24px] font-extrabold text-[#111111] mb-[28px] tracking-[-0.5px]">
          인기 영화 목록
        </h1>
        <MovieGrid movies={movieList} onToggleBookmark={toggleBookmark} />
        <Pagination currentPage={1} totalPages={5} />
      </section>
    </main>
  );
};