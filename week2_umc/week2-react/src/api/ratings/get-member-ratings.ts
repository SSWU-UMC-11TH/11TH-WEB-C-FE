import { apiClient } from "../api-client";
import type { RatingItem } from "./types";

export async function getMemberRatings(memberId: number): Promise<RatingItem[]> {
  return apiClient.get(`members/${memberId}/ratings`).json<RatingItem[]>();
}