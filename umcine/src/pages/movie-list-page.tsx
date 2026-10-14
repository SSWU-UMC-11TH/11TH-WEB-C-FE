import { useState } from "react";
import MovieGrid from "../components/movies/movie-grid";
import Pagination from "../components/movies/pagination";
import { movies } from "../data/movies";

export function MovieListPage() {
    const [movieList, setMovieList] = useState(movies);
    
        const handleBookmark = (movieId: number) => {
            setMovieList((prevMovies) =>
              prevMovies.map((movie) =>
                movie.id === movieId
                    ? {
                        ...movie,
                        isBookmarked: !movie.isBookmarked,
                    }
                    :movie
                )
            );
        };
    
    return (
        <main>
            <h1>영화 목록</h1>
                <MovieGrid
                    movies={movieList}
                     onBookmark={handleBookmark}
                />
                <Pagination />
            </main>
    );
}