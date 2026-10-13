import { useState } from "react";
import Header from "./components/header";
import MovieGird from "./components/movie-grid";
import Pagination from "./components/pagination";
import { movies } from "./data/movies";

export default function App() {
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
        <>
          <Header />

          <main>
            <h1>영화 목록</h1>
            <MovieGird
                movies={movieList}
                onBookmark={handleBookmark}
            />
              <Pagination />
          </main>
        </>
    );
}