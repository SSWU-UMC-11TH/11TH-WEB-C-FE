import { authApi } from "../auth-api";
import type { RatingItem, UpdateRatingRequest } from "./types";

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export async function updateRating(
  ratingId: number,
  body: UpdateRatingRequest
): Promise<RatingItem> {
  const res = await authApi
    .patch(`ratings/${ratingId}`, { json: body })
    .json<ApiResponse<RatingItem>>();
  return res.result;
}