export interface RatingItem {
  ratingId: number;
  movieId: number;
  score: number;     
  comment: string;    
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRatingRequest {
  movieId: number;
  score: number;
  comment: string;
}

export interface UpdateRatingRequest {
  score: number;
  comment: string;
}