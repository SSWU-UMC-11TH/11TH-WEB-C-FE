import { useEffect, useState } from "react";
import MovieGrid from "../components/movies/movie-grid";
import Pagination from "../components/movies/pagination";
import { movies } from "../data/movies";
import { readBookmarkIds, saveBookMarkIds } from "../utils/bookmark-storage";

export function MovieListPage() {

    const [bookmarkIds, setBookmarkIds] = useState<number[]>(readBookmarkIds);

    useEffect(() => {
        saveBookMarkIds(bookmarkIds);
    }, [bookmarkIds]);
    
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
                <MovieGrid
                    movies={movies}
                />
                <Pagination />
            </main>
    );
}