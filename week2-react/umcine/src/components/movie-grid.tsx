import type { Movie } from "../types/movie";
import { MovieCard } from "./movie-card";
import "./movie-grid.css";

interface MovieGridProps {
  movies: Movie[];
  onToggleBookmark: (id: number) => void;
}

export const MovieGrid = ({ movies, onToggleBookmark }: MovieGridProps) => {
  return (
    <section className="movie-grid-section">
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleBookmark={onToggleBookmark}
          />
        ))}
      </div>
    </section>
  );
};