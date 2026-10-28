import type { TmdbMovieListItem } from "../../api/movies/models";import { Link } from "@tanstack/react-router";
//import { cn } from "../../utils/cn";
import { BookmarkButton } from "../bookmark-button";
type MovieCardProps = {
    movie: TmdbMovieListItem;
}

const MovieCard = ({movie}: MovieCardProps) => {
    const posterUrl = movie.poster_path
        ?  `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "";
    
    return (
        <article className="w-full min-w-0 overflow-hidden rounded-xl bg-gray-900">
           <div className="relative">
            <Link
              to="/movies/$movieId"
              params={{ movieId: String(movie.id) }}
            >
            {posterUrl ? (
                 <img
                            className="block aspect-[2/3] w-full object-cover"
                            src={posterUrl}
                            alt={movie.title}
                        />
                    ) : (
                        <div className="flex aspect-[2/3] items-center justify-center bg-gray-700 text-sm text-white">
                            포스터 없음
                        </div>
                    )}
                </Link>
                <BookmarkButton movieId={movie.id} />
            </div>
            <div className="p-3">
            <h2 className="truncate text-base font-semibold text-white">{movie.title}</h2>
            <p className="truncate text-sm text-gray-400">{movie.original_title}</p>
            <p className="mt-1 text-sm text-gray-400">{movie.release_date}</p>
            </div>
        </article>
    );
};

export default MovieCard;