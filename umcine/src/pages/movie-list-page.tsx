import { useEffect, useState } from "react";
import MovieGrid from "../components/movies/movie-grid";
import Pagination from "../components/movies/pagination";
//import { movies } from "../data/movies";
import { readBookmarkIds, saveBookMarkIds } from "../utils/bookmark-storage";
import type {TmdbMovieListItem} from "../api/movies/models";
import { getMovies } from "../api/movies/get-movies";

export function MovieListPage() {

    const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        async function loadMovies() {
            setIsLoading(true);
            setErrorMessage(null);

            try {
                const response = await getMovies({ page:1 });

                if(!ignore) {
                    setMovies(response.results);
                }
            } catch {
                if(!ignore) {
                    setErrorMessage("영화 목록을 불러오지 못했어요.");
                }
            } finally {
                if(!ignore) {
                    setIsLoading(false);
                }
            }
        }

        loadMovies();

        return () => {
            ignore = true;
        };
    }, []);
        
    
    return (
        <main>
            <h1>영화 목록</h1>
            
            {isLoading ? (
                <p>영화 목록을 불러오는 중...</p>   
            ) : errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
            ) : (
                <MovieGrid movies={movies} />
            )}
            <Pagination />
            </main>
    );
}