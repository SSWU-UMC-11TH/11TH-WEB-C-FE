import { useState } from "react";
import { movies as initialMovies } from "./data/movie";
import { Header } from "./components/header";
import { MovieGrid } from "./components/movie-grid";
import { Pagination } from "./components/pagination";
import "./App.css";

export default function App() {
  const [movies, setMovies] = useState(initialMovies);
   // 북마크 토글 함수 (선택한 영화의 isBookmarked 반전)
  const handleToggleBookmark = (id: number) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie
      )
    );
  };

  return (
   <div className="page-wrapper">
      <Header />

      <main className="main-content">
        <h1 className="page-title">영화 목록</h1>
        <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
        <Pagination />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <img src="/icons/tmdb-logo.svg" alt="TMDB Logo" className="tmdb-logo" />
          <span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
        </div>
      </footer>
    </div>
  ); 
}