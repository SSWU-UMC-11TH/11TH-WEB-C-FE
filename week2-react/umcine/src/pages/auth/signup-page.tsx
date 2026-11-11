
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const isValid =
    email.includes("@") &&
    nickname.trim().length >= 2 &&
    nickname.trim().length <= 12 &&
    password.length >= 8 &&
    password === passwordConfirm;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return;

    alert("회원가입 입력이 완료되었습니다.");
  };

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-[#f5f6f8] px-5 py-10">
      <div className="w-full max-w-[430px]">
        <h1 className="mb-4 text-[32px] font-extrabold text-[#191b20]">
          회원가입
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div>
            <label className="mb-2 block text-[13px] font-bold">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="h-12 w-full rounded-lg border border-[#dfe3e9] bg-white px-4 text-sm outline-none focus:border-[#2f65f8]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-bold">
              닉네임
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="2~12자"
              maxLength={12}
              className="h-12 w-full rounded-lg border border-[#dfe3e9] bg-white px-4 text-sm outline-none focus:border-[#2f65f8]"
            />
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-bold">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자 이상"
              className="h-12 w-full rounded-lg border border-[#dfe3e9] bg-white px-4 text-sm outline-none focus:border-[#2f65f8]"
            />
            <p className="mt-1 text-[11px] text-[#98a2b3]">
              영문 대소문자, 숫자, 특수문자를 포함해 8자 이상 입력해 주세요.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-bold">
              비밀번호 확인
            </label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="다시 입력"
              className="h-12 w-full rounded-lg border border-[#dfe3e9] bg-white px-4 text-sm outline-none focus:border-[#2f65f8]"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="h-12 w-full rounded-lg bg-[#2f65f8] text-sm font-bold text-white transition-colors hover:bg-[#1e50e6] disabled:cursor-not-allowed disabled:bg-[#aab8d8]"
          >
            가입하기
          </button>
        </form>

        <p className="mt-5 text-center text-[13px] text-[#667085]">
          이미 계정이 있나요?{" "}
          <Link
            to="/login"
            className="font-bold text-[#2f65f8] no-underline"
          >
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}
