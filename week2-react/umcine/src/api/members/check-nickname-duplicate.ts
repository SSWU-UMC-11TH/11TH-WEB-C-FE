import { apiClient } from "../api-client";

interface NicknameCheckResponse {
  available: boolean;
}

export async function checkNicknameDuplicate(nickname: string) {
  return apiClient
    .get(`members/nickname/${encodeURIComponent(nickname)}`)
    .json<NicknameCheckResponse>();
}