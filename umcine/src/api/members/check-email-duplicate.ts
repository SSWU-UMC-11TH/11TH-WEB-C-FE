import { apiClient } from "../api-client";

export interface CheckEmailDuplicateResponse {
    available: boolean;
}

export function CheckEmailDuplicateResponse(email: string) {
    return apiClient
        .get(`members/email/${encodeURIComponent(email)}`)
        .json<CheckEmailDuplicateResponse>();
}