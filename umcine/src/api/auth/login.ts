import { apiClient } from "../api-client";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    nickname: string;
    accessToken: string;
}

export interface LoginApiResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: LoginResponse;
}

export function login(data: LoginRequest) {
    return apiClient
        .post("auth/login", {
            json: data,
        })
        .json<LoginApiResponse>();
}