import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { BookmarkButton } from "../bookmark-button";

interface MovieCardProps {
  movie: Movie;
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
          <img
            src={movie.posterPath}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
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
          {movie.releaseDate}
        </p>
      </div>
    </div>
  );
}