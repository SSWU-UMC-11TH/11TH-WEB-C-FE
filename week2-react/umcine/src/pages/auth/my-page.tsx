
import { useRef, useState } from "react";

interface User {
  email: string;
  nickname: string;
}

export function MyPage() {
  // localStorage에서 로그인 정보 가져오기
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) return null;

    try {
      return JSON.parse(savedUser) as User;
    } catch {
      return null;
    }
  });

  // 닉네임 수정용 상태
  const [nickname, setNickname] = useState(
    user?.nickname ?? ""
  );

  // 프로필 이미지 상태
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 프로필 이미지 변경
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 선택할 수 있어요.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("이미지는 5MB 이하만 업로드할 수 있어요.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  // 닉네임 저장
  const handleSave = () => {
    const trimmedNickname = nickname.trim();

    if (trimmedNickname.length < 2 || trimmedNickname.length > 12) {
      alert("닉네임은 2~12자로 입력해 주세요.");
      return;
    }

    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const updatedUser = {
      ...user,
      nickname: trimmedNickname,
    };

    // localStorage에 수정된 정보 저장
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // 화면에 수정된 정보 반영
    setUser(updatedUser);
    setNickname(trimmedNickname);

    alert("변경사항이 저장되었습니다!");
  };

  // 로그인하지 않은 경우
  if (!user) {
    return (
      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-[#f5f6f8]">
        <div className="text-center">
          <p className="mb-4 text-sm text-[#667085]">
            로그인 후 이용할 수 있어요.
          </p>
          <a
            href="/login"
            className="rounded-lg bg-[#2f65f8] px-5 py-3 text-sm font-bold text-white no-underline"
          >
            로그인하기
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#f5f6f8] px-5 py-6 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-120px)] w-full max-w-[1280px] flex-col">

        {/* 제목 및 저장 버튼 */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-extrabold text-[#191b20]">
              내 정보 수정
            </h1>

            <p className="mt-2 text-[13px] text-[#667085]">
              닉네임과 프로필 이미지만 변경할 수 있어요.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-[#2f65f8] px-4 py-3 text-[13px] font-bold text-white hover:bg-[#1e50e6]"
          >
            변경사항 저장
          </button>
        </div>

        {/* 프로필 및 회원 정보 */}
        <div className="mt-9 grid grid-cols-1 gap-10 md:grid-cols-2">

          {/* 프로필 이미지 */}
          <div className="flex flex-col items-center pt-6">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative flex h-[82px] w-[82px] items-center justify-center overflow-hidden rounded-full bg-[#e1e4e9]"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="프로필"
                  className="h-full w-full object-cover"
                />
              ) : (
                <svg
                  width="46"
                  height="46"
                  viewBox="0 0 24 24"
                  fill="#191b20"
                >
                  <circle cx="12" cy="8" r="4.2" />
                  <path d="M3.5 21c0-4.4 3.8-7.2 8.5-7.2s8.5 2.8 8.5 7.2H3.5Z" />
                </svg>
              )}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <p className="mt-2 text-[14px] font-bold text-[#191b20]">
              프로필 이미지
            </p>

            <p className="mt-1 text-[11px] text-[#98a2b3]">
              선택 사항 · 최대 5MB
            </p>
          </div>

          {/* 회원 정보 */}
          <div className="flex flex-col gap-4">

            {/* 닉네임 */}
            <div>
              <label className="mb-2 block text-[13px] font-bold text-[#191b20]">
                닉네임
              </label>

              <div className="flex h-12 items-center rounded-lg border border-[#dfe3e9] bg-white px-4 focus-within:border-[#2f65f8]">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  maxLength={12}
                  className="h-full w-full border-none bg-transparent text-sm outline-none"
                  placeholder="닉네임을 입력해 주세요."
                />

                <span className="whitespace-nowrap text-xs font-bold text-[#2f65f8]">
                  수정 가능
                </span>
              </div>
            </div>

            {/* 이메일 */}
            <div>
              <label className="mb-2 block text-[13px] font-bold text-[#191b20]">
                이메일
              </label>

              <div className="flex h-12 items-center rounded-lg border border-[#dfe3e9] bg-[#f0f1f3] px-4">
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="h-full w-full border-none bg-transparent text-sm text-[#667085] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 회원 탈퇴 */}
        <div className="mt-auto flex items-center justify-between gap-4 rounded-lg border border-[#ff3838] bg-[#f9e5e5] px-5 py-5">
          <div>
            <p className="text-[13px] font-bold text-[#e92727]">
              회원 탈퇴
            </p>

            <p className="mt-1 text-[11px] text-[#e92727]">
              탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const confirmed = window.confirm("정말 회원 탈퇴하시겠어요?");

              if (confirmed) {
                alert("실제 회원 탈퇴 기능은 아직 연결되지 않았습니다.");
              }
            }}
            className="shrink-0 rounded-lg border border-[#ff3838] bg-white px-4 py-3 text-[13px] font-bold text-[#e92727] hover:bg-[#fff1f1]"
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </main>
  );
}
