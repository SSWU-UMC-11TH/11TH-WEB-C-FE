import type { Movie } from "../types/movie";
import "./movie-card.css";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
}

export const MovieCard = ({ movie, onToggleBookmark }: MovieCardProps) => {
  return (
    <article className="movie-card">
      <div className="poster-wrapper">
        <img
          src={movie.posterPath}
          alt={movie.title}
          className="poster-image"
          loading="lazy"
        />

        {/* 북마크 토글 버튼 */}
        <button
          type="button"
          className={`bookmark-button ${movie.isBookmarked ? "bookmarked" : ""}`}
          onClick={(e) => {
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
            className="bookmark-icon"
            onError={(e) => {
              // 아이콘 로드 실패 시 대체 텍스트/심볼 표시
              const target = e.currentTarget;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent && !parent.querySelector(".fallback-text")) {
                const span = document.createElement("span");
                span.className = "fallback-text";
                span.innerText = movie.isBookmarked ? "★" : "☆";
                parent.appendChild(span);
              }
            }}
          />
        </button>
      </div>

      <div className="movie-info">
        <h3 className="movie-title" title={movie.title}>{movie.title}</h3>
        <p className="movie-release-date">{movie.releaseDate}</p>
      </div>
    </article>
  );
};