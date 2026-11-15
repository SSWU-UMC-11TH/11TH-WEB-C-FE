import ky from "ky";

export interface MemberInfo {
    email: string;
    nickname: string;
    createdAt: string;
}

interface MemberInfoApiResponse {
    message: string;
    result: MemberInfo;
}

export async function getMyInfo(): Promise<MemberInfo> {
    const accessToken = sessionStorage.getItem("accessToken");

    if(!accessToken) {
        throw new Error("로그인이 필요합니다.");
    }

    const response = await ky.get("http://localhost:8080/members/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    .json<MemberInfoApiResponse>();
    
    return response.result;
}