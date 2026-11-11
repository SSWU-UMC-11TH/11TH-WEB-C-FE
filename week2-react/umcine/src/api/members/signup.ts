import { apiClient } from "../api-client";

interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

interface MemberResponse {
  memberId: number;
  email: string;
  nickname: string;
}

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export async function signup(data: SignupRequest) {
  return apiClient
    .post("members", {
      json: data,
    })
    .json<ApiResponse<MemberResponse>>();
}