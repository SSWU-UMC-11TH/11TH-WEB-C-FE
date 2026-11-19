import ky from "ky";
import { useAuthStore } from "../../stores/auth-store";

export interface FavoriteResponse {
    favoriteId: number;
    movieId: number;
    createdAt: string;
}
interface GetFavoritesApiResponse {
    message: string;
    result: FavoriteResponse[];
}

export async function getFavorites(): Promise<FavoriteResponse[]> {
    const accessToken = useAuthStore.getState().accessToken;
    
    if(!accessToken) {
        throw new Error("로그인이 필요합니다.");
    }

    const response = await ky.get("http://localhost:8080/favorites", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }).json<GetFavoritesApiResponse>();

    return response.result;
}