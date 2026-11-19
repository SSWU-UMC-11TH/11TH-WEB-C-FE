import { useState, useEffect } from "react";
import { FiUser, FiEdit2 } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/members/me";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { useAuthStore } from "../../stores/auth-store";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";

export function MyEditPage() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    retry: false,
  });

  const [nickname, setNickname] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState("");

  const email = meQuery.data?.email ?? "";
  const originalNickname = meQuery.data?.nickname ?? "";
  const updateMeMutation = useUpdateMeMutation();

  // 내 정보 로드 시 닉네임 초기값 세팅
  useEffect(() => {
    if (meQuery.data?.nickname) {
      setNickname(meQuery.data.nickname);
    }
  }, [meQuery.data?.nickname]);

  const trimmedNickname = nickname.trim();
  const isNicknameValid =
    trimmedNickname.length >= 2 && trimmedNickname.length <= 12;
  const isNicknameChanged = trimmedNickname !== originalNickname;

  // 입력값 변경 시 중복 확인 상태 초기화
  const handleNicknameChange = (value: string) => {
    setNickname(value);
    setIsNicknameChecked(false);
    setNicknameMessage("");
  };

  // 실제 중복 확인 API 호출
  const handleCheckDuplicate = async () => {
    if (!isNicknameValid || isCheckingDuplicate) return;

    if (!isNicknameChanged) {
      setNicknameMessage("현재 사용 중인 본인의 닉네임입니다.");
      setIsNicknameChecked(false);
      return;
    }

    setIsCheckingDuplicate(true);
    try {
      const response = await checkNicknameDuplicate(trimmedNickname);
      if (response.available) {
        setIsNicknameChecked(true);
        setNicknameMessage("사용할 수 있는 닉네임입니다.");
      } else {
        setIsNicknameChecked(false);
        setNicknameMessage("이미 사용 중인 닉네임입니다.");
      }
    } catch {
      setIsNicknameChecked(false);
      setNicknameMessage("중복 확인에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsCheckingDuplicate(false);
    }
  };

  // 변경사항 저장 (유효성 통과 + 기존과 다른 닉네임 + 중복 확인 완료 시에만 가능)
  const canSave =
    isNicknameValid &&
    isNicknameChanged &&
    isNicknameChecked &&
    !updateMeMutation.isPending;

  const handleSave = () => {
    if (!canSave) return;

    updateMeMutation.mutate(
      { nickname: trimmedNickname },
      {
        onSuccess: () => {
          setIsNicknameChecked(false);
          setNicknameMessage("");
        },
      }
    );
  };

  const handleWithdraw = () => {
    if (confirm("정말로 탈퇴하시겠습니까?")) {
      alert("탈퇴 처리가 되었습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] flex flex-col justify-between">
      {/* 메인 콘텐츠 영역 */}
      <div className="max-w-[1080px] w-full mx-auto px-[20px] pt-10 pb-16 flex-1 flex flex-col justify-between">
        <div>
          {/* 상단 헤더 */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">내 정보 수정</h1>
              <p className="text-xs text-gray-400 mt-1">
                닉네임과 프로필 이미지만 변경할 수 있어요.
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={!canSave}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] disabled:bg-blue-300 disabled:cursor-not-allowed text-white border-none rounded-[8px] px-[16px] py-[8px] text-[13px] font-[600] cursor-pointer transition-colors"
              type="button"
            >
              {updateMeMutation.isPending ? "저장 중..." : "변경사항 저장"}
            </button>
          </div>

          {/* 수정 Form 레이아웃 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-4">
            {/* 프로필 이미지 */}
            <div className="md:col-span-5 flex flex-col items-center justify-center pt-6">
              <div className="relative w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <FiUser className="w-12 h-12 text-gray-500" />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 cursor-pointer"
                >
                  <FiEdit2 className="w-3.5 h-3.5 text-gray-700" />
                </button>
              </div>
              <span className="text-xs font-bold text-gray-800 mt-2">
                프로필 이미지
              </span>
              <span className="text-[11px] text-gray-400">
                선택 사항 · 최대 5MB
              </span>
            </div>

            {/* 닉네임 / 이메일 입력 */}
            <div className="md:col-span-7 space-y-5">
              {/* 닉네임 */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  닉네임
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => handleNicknameChange(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg pr-20 text-sm outline-none focus:border-[#2563eb]"
                  />
                  <button
                    type="button"
                    onClick={handleCheckDuplicate}
                    disabled={!isNicknameValid || isCheckingDuplicate}
                    className="absolute right-3 text-xs font-semibold text-[#2563eb] hover:underline disabled:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isCheckingDuplicate ? "확인 중..." : "중복 확인"}
                  </button>
                </div>
                {nicknameMessage && (
                  <p
                    className={`text-xs ${
                      isNicknameChecked ? "text-blue-600" : "text-red-500"
                    }`}
                  >
                    {nicknameMessage}
                  </p>
                )}
              </div>

              {/* 이메일 */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-700">
                  이메일
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 회원 탈퇴 경고 창 */}
        <div className="mt-32 p-4 border border-red-300 bg-red-100 rounded-lg flex justify-between items-center">
          <div>
            <h3 className="font-bold text-red-500 text-xs">회원 탈퇴</h3>
            <p className="text-[11px] text-red-400 mt-0.5">
              탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수
              없습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={handleWithdraw}
            className="px-3 py-1.5 border border-red-300 bg-white text-red-500 text-xs font-semibold rounded hover:bg-red-50 transition-colors cursor-pointer"
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}