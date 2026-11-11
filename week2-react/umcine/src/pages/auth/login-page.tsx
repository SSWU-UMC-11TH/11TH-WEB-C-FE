
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  if (!email.trim() || !password) {
    alert("이메일과 비밀번호를 입력해 주세요.");
    return;
  }

  // 로그인한 사용자 정보 저장
  const user = {
    email: email.trim(),
    nickname: email.trim().split("@")[0],
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("로그인되었습니다!");
  navigate({ to: "/" });
};

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-[#f5f6f8] px-5">
      <div className="w-full max-w-[430px]">

        <h1 className="mb-4 text-[32px] font-extrabold tracking-tight text-[#191b20]">
          로그인
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* 이메일 */}
          <div>
            <label className="mb-2 block text-[13px] font-bold text-[#191b20]">
              이메일
            </label>

            <div className="flex h-12 items-center gap-2 rounded-lg border border-[#dfe3e9] bg-white px-3.5 focus-within:border-[#2f65f8]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#667085"
                strokeWidth="1.8"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="h-full w-full border-none bg-transparent text-sm outline-none placeholder:text-[#98a2b3]"
              />
            </div>
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="mb-2 block text-[13px] font-bold text-[#191b20]">
              비밀번호
            </label>

            <div className="flex h-12 items-center gap-2 rounded-lg border border-[#dfe3e9] bg-white px-3.5 focus-within:border-[#2f65f8]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#667085"
                strokeWidth="1.8"
              >
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                className="h-full w-full border-none bg-transparent text-sm outline-none placeholder:text-[#98a2b3]"
              />
            </div>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="h-[46px] w-full rounded-lg bg-[#2f65f8] text-sm font-bold text-white transition-colors hover:bg-[#1e50e6]"
          >
            로그인
          </button>
        </form>

        {/* 회원가입 이동 */}
        <p className="mt-5 text-center text-[13px] text-[#667085]">
          처음이신가요?{" "}
          <Link
            to="/signup"
            className="font-bold text-[#2f65f8] no-underline hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </main>
  );
}
