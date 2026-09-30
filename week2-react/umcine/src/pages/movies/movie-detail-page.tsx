import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold text-[#111111]">영화를 찾을 수 없어요.</h2>
        <Link to="/" className="rounded-xl bg-[#2f65f8] px-6 py-3 font-semibold text-white no-underline">
          영화 목록으로 돌아가기
        </Link>
      </main>
    );
  }

  return (
    <main className="relative min-h-[calc(100vh-72px)] w-full bg-[#111111] text-white">
      {/* 배경 장식 이미지 및 오버레이 */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40" 
        style={{ backgroundImage: `url(${movie.backdropPath})` }} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-transparent" />

      {/* 상세 콘텐츠 영역 */}
      <div className="relative mx-auto flex max-w-[1280px] flex-col gap-8 px-8 py-16 md:flex-row md:items-center">
        <div className="flex flex-col gap-4">
          <Link 
            to="/" 
            className="w-fit rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md transition-colors hover:bg-white/20 no-underline text-white"
          >
            영화 목록
          </Link>
          <img 
            src={movie.posterPath} 
            alt={`${movie.title} 포스터`} 
            className="aspect-[2/3] w-72 rounded-2xl object-cover shadow-2xl mx-auto md:mx-0" 
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight">{movie.title}</h1>
          <p className="text-lg italic text-gray-300">{movie.originalTitle}</p>
          <div className="flex gap-4 text-sm text-gray-400">
            <span>개봉일: {movie.releaseDate}</span>
            <span>상영시간: {movie.runtime}</span>
          </div>
          <p className="text-sm font-semibold text-[#2f65f8]">{movie.genres.join(" · ")}</p>
          <h2 className="text-md font-medium text-gray-200">{movie.tagline}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-gray-300">{movie.overview}</p>
        </div>
      </div>
    </main>
  );
}