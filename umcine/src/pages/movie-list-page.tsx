import { useEffect, useState } from "react";
import MovieGrid from "../components/movies/movie-grid";
import Pagination from "../components/movies/pagination";
//import { movies } from "../data/movies";
import { readBookmarkIds, saveBookMarkIds } from "../utils/bookmark-storage";
import type {TmdbMovieListItem} from "../api/movies/models";
import { getMovies } from "../api/movies/get-movies";

export function MovieListPage() {

    const [movies, setMovies ] = useState<TmdbMovieListItem[]>([]);
    const [bookmarkIds, setBookmarkIds] = useState<number[]>(readBookmarkIds);

    useEffect(() => {
        saveBookMarkIds(bookmarkIds);
    }, [bookmarkIds]);

    useEffect(() => {
        getMovies()
           .then((response) => {
                setMovies(response.results);
           })
           .catch((error) => {
              console.error("영화 목록 불러오기 실패:" ,error);
           });
    }, []);
    
        const handleBookmark = (movieId: number) => {
            setBookmarkIds((prev) =>
              prev.includes(movieId) 
                    ? prev.filter((id) => id !== movieId)
                    : [...prev, movieId]
            );
        };
        
    
    return (
        <main>
            <h1>영화 목록</h1>
                <MovieGrid movies={movies}/>
                <Pagination />
            </main>
    );
}