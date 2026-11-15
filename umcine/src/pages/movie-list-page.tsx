import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MovieGrid from "../components/movies/movie-grid";
import Pagination from "../components/movies/pagination";
//import { movies } from "../data/movies";
//import { readBookmarkIds, saveBookMarkIds } from "../utils/bookmark-storage";
import type {TmdbMovieListItem} from "../api/movies/models";
import { getMovies } from "../api/movies/get-movies";
import Footer from "../components/layout/footer";

export function MovieListPage() {
    const [page, setPage] = useState(1);

    const moviesQuery = useQuery({
        queryKey: ["movies", "list", { page }],
        queryFn: () => getMovies({ page }),
    });

    const movies = moviesQuery.data?.results ?? [];
    const totalPages = moviesQuery.data?.total_pages ?? 0;

    const handlePageChange = (nextPage: number) => {
        setPage(nextPage);
    };

    return (
        <main>
            <h1>영화 목록</h1>

        {moviesQuery.isPending ? (
            <p>영화를 불러오는 중이에요.</p>
        ) : moviesQuery.isError ? (
            <p>{moviesQuery.error.message}</p>
        ) : movies.length === 0 ? (
            <p>표시할 영화가 없어요.</p>
        ) : (
            <MovieGrid movies={movies} /> 
        )}

        {!moviesQuery.isPending && !moviesQuery.isError && movies.length > 0 && (
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        )}
        <Footer />
        </main>
    )
}