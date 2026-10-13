import type { Movie } from "../types/movie";

type MovieCardProps = {
    movie: Movie;
    isBookmarked: boolean;
    onBookmark: (movieId: number) => void;
}

const MovieCard = ({
    movie,
    isBookmarked,
    onBookmark,
}: MovieCardProps) => {
    return (
        <article className="movie-card">
           <div className="poster-wrapper">
            <img
                src={movie.posterPath}
                alt={movie.title}
            />

            <button
                type="button"
                onClick={() => onBookmark(movie.id)}
                aria-label="북마크">
            <img
               src={isBookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"}
               alt="" />
                </button>
            </div>
            <h2>{movie.title}</h2>
            <p>{movie.releaseDate}</p>
        </article>
    );
};

export default MovieCard;