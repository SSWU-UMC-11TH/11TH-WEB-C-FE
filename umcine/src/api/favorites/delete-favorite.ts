import ky from "ky";
import { useAuthStore } from "../../stores/auth-store";

export async function deleteFavorite(movieId: number): Promise<void> {
    const accessToken = useAuthStore.getState().accessToken;

    if(!accessToken) {
        throw new Error("로그인이 필요합니다.");
    }

    await ky.delete(`http://localhost:8080/favorites/${movieId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
}