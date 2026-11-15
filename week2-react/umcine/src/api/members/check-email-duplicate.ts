import { apiClient } from "../api-client";

interface EmailCheckResponse {
  available: boolean;
}

export async function checkEmailDuplicate(email: string) {
  return apiClient
    .get(`members/email/${encodeURIComponent(email)}`)
    .json<EmailCheckResponse>();
}