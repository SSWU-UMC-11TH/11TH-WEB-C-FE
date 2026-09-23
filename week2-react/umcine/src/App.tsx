import { useState } from "react";
import { movies as initialMovies } from "./data/movies";
import type { Movie } from "./types/movie";
import { Header } from "./components/header";
import { MovieGrid } from "./components/movie-grid";
import { Pagination } from "./components/pagination";
import "./App.css";

export const App = () => {
  const [movieList, setMovieList] = useState<Movie[]>(initialMovies);

  const handleToggleBookmark = (id: number) => {
    setMovieList((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, isBookmarked: !movie.isBookmarked } : movie
      )
    );
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <section className="movie-section">
          <h1 className="section-title">영화 목록</h1>
          <MovieGrid
            movies={movieList}
            onToggleBookmark={handleToggleBookmark}
          />
          <Pagination currentPage={1} totalPages={5} />
        </section>
      </main>
    </div>
  );
};

export default App;