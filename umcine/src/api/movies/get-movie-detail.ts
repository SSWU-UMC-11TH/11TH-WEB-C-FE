import { tmdbClient } from "../tmdb-client";
import type { TmdbMovieDetail } from "./models";

type GetMoviesDetailResponse = TmdbMovieDetail;

function getMovieDetail(movieId: number) {
    return tmdbClient
        .get(`movie/${movieId}`, {
            searchParams: { language: "ko-KR"},
        })
        .json<GetMoviesDetailResponse>();
}

export { getMovieDetail, type GetMoviesDetailResponse};