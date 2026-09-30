export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  releaseDate: string;
  posterPath: string;
  backdropPath: string;
  genres: string[];
  runtime: number;
  tagline: string;
  overview: string;
  isBookmarked: boolean;
}