import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (id: number) => void;
}

export function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <div className="movie-card">
      <div className="poster-container">
        {/* public 폴더 경로의 이미지를 불러옵니다 */}
        <img src={movie.posterPath} alt={movie.title} className="poster-img" />
        <button 
          className={`bookmark-btn ${movie.isBookmarked ? "bookmarked" : ""}`}
          onClick={() => onToggleBookmark(movie.id)}
          type="button"
        >
          <img 
            src={movie.isBookmarked ? "/icons/bookmark (1).svg" : "/icons/bookmark-outline (1).svg"} 
            alt={movie.isBookmarked ? "북마크 취소" : "북마크 하기"}
          />
        </button>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-date">{movie.releaseDate}</p>
      </div>
    </div>
  );
}