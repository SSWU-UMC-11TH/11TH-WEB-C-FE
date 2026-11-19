import ky from "ky";

interface MemberInfo {
    email: string;
    nickname: string;
    createdAt: string;
}

interface UpdateMyInfoResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: MemberInfo;
}

export async function UpdateMyInfo(nickname: string): Promise<MemberInfo> {
    const accessToken = sessionStorage.getItem("accessToken");

    if(!accessToken) {
        throw new Error("로그인이 필요합니다.");
    }

    const response = await ky.patch(
        "http://localhost:8080/members/me",
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            json: {
                nickname,
            },
        }
    ).json<UpdateMyInfoResponse>();
    return response.result;
}

