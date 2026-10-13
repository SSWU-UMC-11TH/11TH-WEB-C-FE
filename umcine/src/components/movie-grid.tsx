import MovieCard from "./movie-card";
import type { Movie } from "../types/movie";

interface MovieGridProps {
    movies: Movie[];
    onBookmark: (movieId: number) => void;
}

export default function MovieGrid({
    movies,
    onBookmark,
}: MovieGridProps) {
    return (
        <div className="movie-grid">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    isBookmarked={movie.isBookmarked}
                    onBookmark={onBookmark}
                />
            ))}
        </div>
    );
}