import type { TmdbMovieListItem } from "../../api/movies/models.ts";
import { MovieCard } from "./movie-card";

interface MovieGridProps {
  movies: TmdbMovieListItem[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-5 gap-[14px] w-full">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  );
}