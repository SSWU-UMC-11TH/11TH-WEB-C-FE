import ky from "ky";
import { useAuthStore } from "../../stores/auth-store";

export interface FavoriteStatusResponse {
    isFavorite: boolean;
}

interface FavoriteStatusApiResponse {
    message: string;
    result: FavoriteStatusResponse;
}

export async function getFavoriteStatus(movieId: number): Promise<FavoriteStatusResponse> {
    const accessToken = useAuthStore.getState().accessToken;

    if(!accessToken) {
        throw new Error("로그인이 필요합니다.");
    }

    const response = await ky.get(`http://localhost:8080/favorites/${movieId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    ).json<FavoriteStatusApiResponse>();

    return response.result;
}