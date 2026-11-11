
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { signup } from "../../api/members/signup";

type CheckStatus = "idle" | "checking" | "available" | "duplicate" | "error";

export function SignupPage() {
  const navigate = useNavigate();

  // 입력값
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 중복 확인 상태
  const [emailStatus, setEmailStatus] = useState<CheckStatus>("idle");
  const [nicknameStatus, setNicknameStatus] = useState<CheckStatus>("idle");

  // 입력 시작 여부
  const [emailTouched, setEmailTouched] = useState(false);
  const [nicknameTouched, setNicknameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordConfirmTouched, setPasswordConfirmTouched] = useState(false);

  // 회원가입 상태
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // 정규식 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  const isEmailValid = emailRegex.test(email);
  const isNicknameValid =
    nickname.trim().length >= 2 && nickname.trim().length <= 12;
  const isPasswordValid = passwordRegex.test(password);
  const isPasswordConfirmValid =
    passwordConfirm.length > 0 && password === passwordConfirm;

  // 모든 검증 통과 여부
  const canSubmit =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid &&
    emailStatus === "available" &&
    nicknameStatus === "available" &&
    !isSubmitting;

  // 이메일 중복 확인
  const handleEmailCheck = async () => {
    if (!isEmailValid) return;

    setEmailStatus("checking");

    try {
      const response = await checkEmailDuplicate(email);

      setEmailStatus(response.available ? "available" : "duplicate");
    } catch (error) {
      console.error("이메일 중복 확인 실패:", error);
      setEmailStatus("error");
    }
  };

  // 닉네임 중복 확인
  const handleNicknameCheck = async () => {
    if (!isNicknameValid) return;

    setNicknameStatus("checking");

    try {
      const response = await checkNicknameDuplicate(nickname.trim());

      setNicknameStatus(response.available ? "available" : "duplicate");
    } catch (error) {
      console.error("닉네임 중복 확인 실패:", error);
      setNicknameStatus("error");
    }
  };

  // 회원가입
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await signup({
        email,
        nickname: nickname.trim(),
        password,
      });

      if (!response.isSuccess) {
        setSubmitError(response.message || "회원가입에 실패했습니다.");
        return;
      }

      alert(response.message || "회원가입이 완료되었습니다.");

      await navigate({ to: "/login" });
    } catch (error) {
      console.error("회원가입 실패:", error);

      setSubmitError(
        "회원가입에 실패했습니다. 입력 정보를 확인하고 다시 시도해 주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-[#f5f6f8] px-5 py-10">
      <div className="w-full max-w-[430px]">
        <h1 className="mb-4 text-[32px] font-extrabold text-[#191b20]">
          회원가입
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* 이메일 */}
          <div>
            <label className="mb-2 block text-[13px] font-bold">
              이메일
            </label>

            <input
              type="email"
              value={email}
              disabled={emailStatus === "checking"}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailStatus("idle");
                setEmailTouched(true);
                setSubmitError("");
              }}
              onBlur={() => {
                if (email && isEmailValid && emailStatus === "idle") {
                  handleEmailCheck();
                }
              }}
              placeholder="name@example.com"
              className="h-12 w-full rounded-lg border border-[#dfe3e9] bg-white px-4 text-sm outline-none focus:border-[#2f65f8] disabled:bg-gray-100"
            />

            {emailTouched && email.length > 0 && !isEmailValid && (
              <p className="mt-1 text-[11px] text-red-500">
                올바른 이메일 형식을 입력해 주세요.
              </p>
            )}

            {emailStatus === "checking" && (
              <p className="mt-1 text-[11px] text-gray-500">
                이메일 중복 확인 중...
              </p>
            )}

            {emailStatus === "available" && (
              <p className="mt-1 text-[11px] text-green-600">
                사용 가능한 이메일입니다.
              </p>
            )}

            {emailStatus === "duplicate" && (
              <p className="mt-1 text-[11px] text-red-500">
                이미 사용 중인 이메일입니다.
              </p>
            )}

            {emailStatus === "error" && (
              <p className="mt-1 text-[11px] text-red-500">
                이메일 중복 확인에 실패했습니다. 다시 입력하거나 확인해 주세요.
              </p>
            )}
          </div>

          {/* 닉네임 */}
          <div>
            <label className="mb-2 block text-[13px] font-bold">
              닉네임
            </label>

            <input
              type="text"
              value={nickname}
              disabled={nicknameStatus === "checking"}
              onChange={(e) => {
                setNickname(e.target.value);
                setNicknameStatus("idle");
                setNicknameTouched(true);
                setSubmitError("");
              }}
              onBlur={() => {
                if (
                  nickname.trim() &&
                  isNicknameValid &&
                  nicknameStatus === "idle"
                ) {
                  handleNicknameCheck();
                }
              }}
              placeholder="2~12자"
              maxLength={12}
              className="h-12 w-full rounded-lg border border-[#dfe3e9] bg-white px-4 text-sm outline-none focus:border-[#2f65f8] disabled:bg-gray-100"
            />

            {nicknameTouched &&
              nickname.length > 0 &&
              !isNicknameValid && (
                <p className="mt-1 text-[11px] text-red-500">
                  닉네임은 2~12자로 입력해 주세요.
                </p>
              )}

            {nicknameStatus === "checking" && (
              <p className="mt-1 text-[11px] text-gray-500">
                닉네임 중복 확인 중...
              </p>
            )}

            {nicknameStatus === "available" && (
              <p className="mt-1 text-[11px] text-green-600">
                사용 가능한 닉네임입니다.
              </p>
            )}

            {nicknameStatus === "duplicate" && (
              <p className="mt-1 text-[11px] text-red-500">
                이미 사용 중인 닉네임입니다.
              </p>
            )}

            {nicknameStatus === "error" && (
              <p className="mt-1 text-[11px] text-red-500">
                닉네임 중복 확인에 실패했습니다. 다시 확인해 주세요.
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="mb-2 block text-[13px] font-bold">
              비밀번호
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordTouched(true);
                setSubmitError("");
              }}
              placeholder="8자 이상"
              className="h-12 w-full rounded-lg border border-[#dfe3e9] bg-white px-4 text-sm outline-none focus:border-[#2f65f8]"
            />

            <p className="mt-1 text-[11px] text-[#98a2b3]">
              영문 대소문자, 숫자, 특수문자(!@#$%^&*)를 포함해 8자 이상 입력해 주세요.
            </p>

            {passwordTouched && password.length > 0 && !isPasswordValid && (
              <p className="mt-1 text-[11px] text-red-500">
                비밀번호 형식이 올바르지 않습니다.
              </p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="mb-2 block text-[13px] font-bold">
              비밀번호 확인
            </label>

            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                setPasswordConfirmTouched(true);
                setSubmitError("");
              }}
              placeholder="다시 입력"
              className="h-12 w-full rounded-lg border border-[#dfe3e9] bg-white px-4 text-sm outline-none focus:border-[#2f65f8]"
            />

            {passwordConfirmTouched &&
              passwordConfirm.length > 0 &&
              !isPasswordConfirmValid && (
                <p className="mt-1 text-[11px] text-red-500">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
          </div>

          {/* 회원가입 오류 */}
          {submitError && (
            <p className="text-[12px] text-red-500">{submitError}</p>
          )}

          {/* 가입 버튼 */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="h-12 w-full rounded-lg bg-[#2f65f8] text-sm font-bold text-white transition-colors hover:bg-[#1e50e6] disabled:cursor-not-allowed disabled:bg-[#aab8d8]"
          >
            {isSubmitting ? "가입 중..." : "가입하기"}
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
