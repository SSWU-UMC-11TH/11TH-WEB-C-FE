import type { Movie } from "../../types/movie";
import { Link } from "@tanstack/react-router";
import { cn } from "../../utils/cn";
import { BookmarkButton } from "../bookmark-button";
type MovieCardProps = {
    movie: Movie;

}

const MovieCard = ({movie}: MovieCardProps) => {
    return (
        <article className="w-full min-w-0 overflow-hidden rounded-xl bg-gray-900">
           <div className="relative">
            <Link
              to="/movies/$movieId"
              params={{ movieId: String(movie.id) }}
            >
            <img
                className="block aspect-[2/3] w-full object-cover"
                src={movie.posterPath}
                alt={movie.title}
            />
            </Link>
            <BookmarkButton movieId={movie.id} />
            {/* <button
                type="button"
                onClick={() => onBookmark(movie.id)}
                className={cn(
                    "absolute right-2 top-2 rounded-full p-2 text-white",
                    isBookmarked ? "bg-blue-600" : "bg-black/60",
                )}
                >
                    북마크
            <img
               src={isBookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"}
               alt="" />
                </button> */}
            </div>
            <div className="p-3">
            <h2 className="truncate text-base font-semibold text-white">{movie.title}</h2>
            <p className="truncate text-sm text-gray-400">{movie.originalTitle}</p>
            <p className="mt-1 text-sm text-gray-400">{movie.releaseDate}</p>
            </div>
        </article>
    );
};

export default MovieCard;