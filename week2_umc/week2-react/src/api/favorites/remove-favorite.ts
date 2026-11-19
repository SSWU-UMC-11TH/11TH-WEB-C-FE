import { authApi } from "../auth-api";

interface RemoveFavoriteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: null;
}

export async function removeFavorite(movieId: number): Promise<void> {
  await authApi
    .delete(`favorites/${movieId}`)
    .json<RemoveFavoriteResponse>();
}