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
      className="flex w-full flex-col cursor-pointer group no-underline"
    >
      <article className="flex w-full flex-col">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[12px] bg-[#f0f2f5] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-transform duration-200 group-hover:-translate-y-1">
          <img
            src={movie.posterPath}
            alt={movie.title}
            className="block h-full w-full object-cover"
            loading="lazy"
          />

          {/* 북마크 토글 버튼 */}
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
                  ? "/icons/bookmark-filled.svg"
                  : "/icons/bookmark-empty.svg"
              }
              alt=""
              className="h-[18px] w-[18px] object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent && !parent.querySelector(".fallback-text")) {
                  const span = document.createElement("span");
                  span.className = "text-white text-[16px] leading-none fallback-text";
                  span.innerText = movie.isBookmarked ? "★" : "☆";
                  parent.appendChild(span);
                }
              }}
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