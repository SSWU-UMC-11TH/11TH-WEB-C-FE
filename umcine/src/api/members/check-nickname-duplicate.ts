import { apiClient } from "../api-client";

export interface CheckNicknameDuplicateResponse {
    available: boolean;
}

export function CheckNicknameDuplicateResponse(nickname: string) {
    return apiClient
        .get(`members/nickname/${encodeURIComponent(nickname)}`)
        .json<CheckNicknameDuplicateResponse>();
}