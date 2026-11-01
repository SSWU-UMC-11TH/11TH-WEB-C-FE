import { useEffect, useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { MovieGrid } from "../../components/movies/movie-grid";
import { Pagination } from "../../components/movies/pagination";
import { useBookmarkStore } from "../../stores/useBookmarkStore";

export const MovieListPage = () => {
  const { toggleBookmark, isBookmarked } = useBookmarkStore();
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function loadMovies() {
      console.log("loadMovies 실행됨!"); // <- 이 로그가 찍히는지 확인
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getMovies({ page: 1 });
        console.log("받아온 응답:", response); // <- 데이터가 오는지 확인
        if (!ignore) setMovies(response.results);
      } catch (err) {
        console.error("에러 발생:", err); // <- 에러가 나면 찍힘
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

  // 1. 로딩 상태
  if (isLoading) return <p className="text-center py-20 text-gray-500">영화 목록을 불러오는 중이에요...</p>;
  // 2. 오류 상태
  if (errorMessage) return <p className="text-center py-20 text-red-500">{errorMessage}</p>;
  // 3. 빈 결과 상태
  if (movies.length === 0) return <p className="text-center py-20 text-gray-500">조건에 맞는 영화가 없어요.</p>;

  const movieList = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    releaseDate: movie.release_date,
    posterPath: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "",
    backdropPath: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : "",
    genres: [],
    runtime: "",
    tagline: "",
    overview: movie.overview,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    genreIds: movie.genre_ids,
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