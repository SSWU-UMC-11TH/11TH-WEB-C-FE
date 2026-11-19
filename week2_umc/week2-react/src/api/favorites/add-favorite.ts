import { authApi } from "../auth-api";
import type { FavoriteItem } from "./get-favorites";

interface AddFavoriteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: FavoriteItem;
}

export async function addFavorite(movieId: number): Promise<FavoriteItem> {
  const response = await authApi
    .post("favorites", { json: { movieId } })
    .json<AddFavoriteResponse>();
  return response.result;
}