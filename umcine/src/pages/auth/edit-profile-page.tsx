import { useEffect, useRef, useState} from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../../api/members/get-my-info";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";

export function EditProfilePage() {
    const memberQuery = useQuery({
        queryKey: ["members", "me"],
        queryFn: getMyInfo,
        retry: false,
    });

    const [form, setForm] = useState({ nickname: "",});
    const[profilePreview, setProfilePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const updateMeMutation = useUpdateMeMutation();
    const nickname = form.nickname.trim();
    const canSubmit = nickname.length >= 2 && nickname.length <= 12;

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!canSubmit || updateMeMutation.isPending) return;

        updateMeMutation.mutate({ nickname });
    };

    // 서버에서 가져온 현재 닉네임 표시
    useEffect(() => {
        if(memberQuery.data) {
            setForm({ nickname: memberQuery.data.nickname});
        }
    }, [memberQuery.data]);

    // 프로필 이미지 미리보기
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if(!file) return;
        if(!file.type.startsWith("image/")) {
            alert("이미지 파일만 선택할 수 있어요.");
            e.target.value ="";
            return;
        }

        if(file.size > 5 * 1024 * 1024) {
            alert("5MB 이하의 이미지만 선택할 수 있어요.");
            e.target.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setProfilePreview(reader.result as string);
        };

        reader.readAsDataURL(file);
    };

    if(memberQuery.isPending) {
        return (
            <main className="p-10 text-center">
                회원 정보를 불러오는 중...
            </main>
        );
    }

    if(memberQuery.isError) {
        return (
            <main className="p-10 text-center">
                <p>회원 정보를 불러오지 못했어요.</p>
                <Link to="/login" className="text-blue-600">
                    로그인 페이지로 이동
                </Link>
            </main>
        );
    }

    const member = memberQuery.data;

    return (
        <main className="min-h-screen bg-[#F7F8FA] text-gray-900">
            <form onSubmit={handleSubmit} className="mx-auto max-w-[1200px] px-6 py-8">

                {/* 페이지 제목 */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            내 정보 수정
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            닉네임과 프로필 이미지만 변경할 수 있어요.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={!canSubmit || updateMeMutation.isPending}
                        className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {updateMeMutation.isPending ? "저장 중" : "저장"}
                    </button>
                </div>

                {/* 프로필 수정 영역 */}
                <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.5fr]">

                    {/* 왼쪽: 프로필 이미지 */}
                    <div className="flex flex-col items-center pt-4">
                        <div className="relative">
                            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                                {profilePreview ? (
                                    <img
                                        src={profilePreview}
                                        alt="프로필 미리보기"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <svg
                                        width="48"
                                        height="48"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M4 21v-2a8 8 0 0 1 16 0v2H4Z" />
                                    </svg>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 rounded-full border border-gray-300 bg-white p-2 shadow-sm"
                                aria-label="프로필 이미지 선택"
                            >
                                ✎
                            </button>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />

                        <p className="mt-3 text-sm font-semibold">
                            프로필 이미지
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                            이미지 미리보기 · 최대 5MB
                        </p>

                        <p className="mt-2 text-xs text-gray-400">
                            서버 저장 기능은 추후 연결
                        </p>
                    </div>

                    {/* 오른쪽: 회원 정보 */}
                    <div className="space-y-6">

                        {/* 닉네임 */}
                        <div>
                            <label
                                htmlFor="nickname"
                                className="mb-2 block text-sm font-semibold"
                            >
                                닉네임
                            </label>

                            <div className="relative">
                                <input
                                    id="nickname"
                                    type="text"
                                    value={form.nickname}
                                    onChange={(e) =>
                                        setForm({ ...form, nickname: e.target.value})
                                    }
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pr-24 text-sm outline-none focus:border-blue-500"
                                />

                                <button
                                    type="button"
                                    disabled
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-blue-600 disabled:opacity-50"
                                >
                                    중복 확인
                                </button>
                            </div>
                        </div>

                        {/* 이메일 */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold"
                            >
                                이메일
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={member.email}
                                readOnly
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* 회원 탈퇴 */}
                <section className="mt-32 rounded-lg border border-red-300 bg-red-50 p-5">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-sm font-bold text-red-600">
                                회원 탈퇴
                            </h2>

                            <p className="mt-2 text-xs text-red-500">
                                탈퇴하면 작성한 평점, 후기와 즐겨찾기 등
                                관련 정보가 삭제될 수 있습니다.
                            </p>
                        </div>

                        <button
                            type="button"
                            disabled
                            className="shrink-0 rounded-md border border-red-400 bg-white px-4 py-2 text-sm font-semibold text-red-600 disabled:opacity-50"
                        >
                            회원 탈퇴
                        </button>
                    </div>
                </section>
            </form>
        </main>
    );
}