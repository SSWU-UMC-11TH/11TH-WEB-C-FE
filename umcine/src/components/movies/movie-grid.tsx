import MovieCard from "./movie-card";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
    movies: Movie[];
    onBookmark: (movieId: number) => void;
}

export default function MovieGrid({
    movies,
    onBookmark,
}: MovieGridProps) {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
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