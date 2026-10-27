import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
}

export function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
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

        {/* 북마크 버튼 */}
        <button
          className={cn(
            "absolute top-[8px] right-[8px] w-[28px] h-[28px] rounded-[6px] flex items-center justify-center p-0 cursor-pointer transition-all duration-200 ease-in-out border",
            movie.isBookmarked
              ? "bg-[#2563eb] border-[#1d4ed8]"
              : "bg-black/80 border-white/20"
          )}
          onClick={() => onToggleBookmark(movie.id)}
          type="button"
        >
          <img
            src={
              movie.isBookmarked
                ? "/icons/bookmark.svg"
                : "/icons/bookmark-outline.svg"
            }
            alt={movie.isBookmarked ? "북마크 취소" : "북마크 하기"}
            className="w-[16px] h-[16px] brightness-0 invert"
          />
        </button>
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