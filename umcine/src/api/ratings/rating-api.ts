import ky from "ky";
import { useAuthStore } from "../../stores/auth-store";

const BASE_URL = "http://localhost:8080";

interface ApiResponse<T> {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}

export interface RatingResponse {
    ratingId: number;
    movieId: number;
    score: number;
    comment: string | null;
    createdAt: string;
    updatedAt: string;
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

function getAuthHeaders() {
    const accessToken = useAuthStore.getState().accessToken;

    if(!accessToken) {
        throw new Error("로그인이 필요합니다.");
    }

    return {
        Authorization: `Bearer ${accessToken}`,
    };
}

// 1. 회원 평점 조회
export async function getMemberRatings(memberId: number) : Promise<RatingResponse[]> {
    return ky.get(`${BASE_URL}/members/${memberId}/ratings`,
        {
            headers: getAuthHeaders(),
        }
    ).json<RatingResponse[]>();
}

// 2. 평점 등록 
export async function createRating(request: CreateRatingRequest) : Promise<RatingResponse> {
    const response = await ky.post(`${BASE_URL}/ratings`, {
        headers: getAuthHeaders(),
        json: request,
    }).json<ApiResponse<RatingResponse>>();
    return response.result;
}