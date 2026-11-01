import type { Movie } from "../../types/movie";
import { Link } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
}

export const MovieCard = ({ movie, onToggleBookmark }: MovieCardProps) => {
  return (
    <Link
      to="/movies/$movieId"
      params={{ movieId: String(movie.id) }}
      className="flex flex-col w-full cursor-pointer group no-underline"
    >
      <article className="flex w-full flex-col">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[12px] bg-[#f0f2f5] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-transform duration-200 group-hover:-translate-y-1">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt={movie.title}
            className="block h-full w-full object-cover"
            loading="lazy"
          />

          {/* 북마크 버튼 (클릭 시 상세 이동 방지) */}
          <button
            type="button"
            className={cn(
              "absolute right-[12px] top-[12px] flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full border-none bg-black/40 p-0 backdrop-blur-[4px] transition-all duration-200 hover:scale-110 hover:bg-black/60",
              movie.isBookmarked && "bookmarked"
            )}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleBookmark(movie.id);
            }}
            aria-label={movie.isBookmarked ? "북마크 해제" : "북마크 추가"}
          >
            <img
              src={
                movie.isBookmarked
                  ? "/icons/bookmark.svg"
                  : "/icons/bookmark-outline.svg"
              }
              alt=""
              className="h-[18px] w-[18px] object-contain brightness-0 invert"
            />
          </button>
        </div>

        <div className="mt-[12px] flex flex-col gap-[4px]">
          <h3 className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-bold text-[#111111]" title={movie.title}>
            {movie.title}
          </h3>
          <p className="m-0 text-[13px] text-[#888888]">{movie.releaseDate}</p>
        </div>
      </article>
    </Link>
  );
};