import { Link } from "@tanstack/react-router";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { BookmarkButton } from "../bookmark-button";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

interface MovieCardProps {
  movie: TmdbMovieListItem;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="relative w-full aspect-[1/1.05] rounded-[12px] overflow-hidden bg-[#e5e7eb]">
        {/* 포스터 클릭 시 상세 이동 */}
        <Link
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
          className="block w-full h-full"
        >
          {getTmdbPosterUrl(movie.poster_path) ? (
          <img
            src={getTmdbPosterUrl(movie.poster_path)!}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
) : (
  <div className="w-full h-full bg-[#e5e7eb] flex items-center justify-center text-[11px] text-[#9ca3af]">
    이미지 없음
  </div>
)}
        </Link>

      <BookmarkButton movieId={movie.id} />
      </div>

      <div className="mt-[6px] text-left w-full">
        <h3 className="text-[12px] font-bold text-[#1f2937] m-0 whitespace-nowrap overflow-hidden text-ellipsis">
          <Link
            to="/movies/$movieId"
            params={{ movieId: String(movie.id) }}
            className="text-inherit no-underline"
          >
            {movie.title}
          </Link>
        </h3>
        <p className="text-[11px] font-normal text-[#9ca3af] mt-[2px] mb-0">
          {movie.release_date}
        </p>
      </div>
    </div>
  );
}