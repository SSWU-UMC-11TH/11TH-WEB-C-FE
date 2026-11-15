import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api/movies/get-movies";
import { getMovieDetail } from "../api/movies/get-movie-detail";
import { searchMovies } from "../api/movies/search-movies";

export const movieKeys = {
  all: ["movies"] as const,
  list: (page: number) => [...movieKeys.all, "list", { page }] as const,
  search: (query: string) => [...movieKeys.all, "search", { query }] as const,
  detail: (movieId: number) => [...movieKeys.all, "detail", movieId] as const,
};

export function useMovieListQuery(page: number) {
  return useQuery({
    queryKey: movieKeys.list(page),
    queryFn: () => getMovies({ page }),
  });
}

export function useSearchMoviesQuery(query: string) {
  return useQuery({
    queryKey: movieKeys.search(query),
    queryFn: () => searchMovies({ query }),
    enabled: query.length > 0, // 검색어 없으면 요청 안 함
  });
}

export function useMovieDetailQuery(movieId: number) {
  return useQuery({
    queryKey: movieKeys.detail(movieId),
    queryFn: () => getMovieDetail(movieId),
    enabled: Number.isFinite(movieId),
  });
}