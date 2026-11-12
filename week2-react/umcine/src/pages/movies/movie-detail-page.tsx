import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });

  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadMovieDetail() {
      setIsLoading(true);
      setErrorMessage(null);
      setMovie(null);

      try {
        const response = await getMovieDetail(Number(movieId));

        if (!ignore) {
          setMovie(response);
        }
      } catch (error) {
        console.error("영화 상세 정보 조회 실패:", error);

        if (!ignore) {
          setErrorMessage("영화 정보를 불러오지 못했어요.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadMovieDetail();

    return () => {
      ignore = true;
    };
  }, [movieId]);

  if (isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500">영화 정보를 불러오는 중이에요...</p>
      </main>
    );
  }

  if (errorMessage || !movie) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-5">
        <h2 className="text-2xl font-bold text-[#111111]">
          {errorMessage ?? "영화를 찾을 수 없어요."}
        </h2>

        <Link
          to="/"
          className="rounded-xl bg-[#2f65f8] px-6 py-3 font-semibold text-white no-underline"
        >
          영화 목록으로 돌아가기
        </Link>
      </main>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : "";

  return (
    <main className="min-h-[calc(100vh-72px)] w-full bg-[#f5f6f8]">

      {/* 영화 배경 영역 */}
      <section
        className="relative flex min-h-[360px] items-end bg-[#111111] bg-cover bg-center text-white"
        style={
          backdropUrl
            ? { backgroundImage: `url(${backdropUrl})` }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

        <div className="relative mx-auto w-full max-w-[1280px] px-8 pb-7 pt-8">

          <Link
            to="/"
            className="mb-20 inline-block text-sm font-semibold text-white no-underline hover:underline"
          >
            ← 영화 목록
          </Link>

          <h1 className="text-3xl font-extrabold md:text-4xl">
            {movie.title}
          </h1>

          <p className="mt-2 text-sm text-gray-200">
            {movie.original_title}
          </p>

          <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-200">
            <span>{movie.release_date || "개봉일 미정"}</span>

            {movie.genres.length > 0 && (
              <span>
                {movie.genres.map((genre) => genre.name).join(" · ")}
              </span>
            )}

            <span>
              {movie.runtime
                ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`
                : "상영시간 정보 없음"}
            </span>
          </div>
        </div>
      </section>

      {/* 영화 상세 정보 */}
      <section className="mx-auto flex max-w-[1280px] flex-col gap-8 px-8 py-8 md:flex-row">

        {/* 포스터 */}
        <div className="w-full shrink-0 md:w-[200px]">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} 포스터`}
              className="mx-auto w-full max-w-[200px] rounded-xl shadow-xl"
            />
          ) : (
            <div className="flex aspect-[2/3] items-center justify-center rounded-xl bg-gray-200 text-gray-500">
              포스터 없음
            </div>
          )}
        </div>

        {/* 줄거리 및 정보 */}
        <div className="flex-1 pt-1">
          <h2 className="text-xl font-bold text-[#111111]">
            {movie.tagline || movie.title}
          </h2>

          <h3 className="mb-3 mt-6 text-base font-bold text-[#222222]">
            줄거리
          </h3>

          <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
            {movie.overview || "등록된 줄거리가 없습니다."}
          </p>

          <div className="mt-6 flex gap-2 text-sm text-gray-600">
            <span>평점</span>
            <span className="font-bold text-[#2f65f8]">
              ★ {movie.vote_average?.toFixed(1) ?? "정보 없음"}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}