import { authApi } from "../auth-api";
import type { CreateRatingRequest, RatingItem } from "./types";

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export async function createRating(body: CreateRatingRequest): Promise<RatingItem> {
  const res = await authApi
    .post("ratings", { json: body })
    .json<ApiResponse<RatingItem>>();
  return res.result;
}