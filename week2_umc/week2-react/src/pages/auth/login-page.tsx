import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
// import { useNavigate } from "@tanstack/react-router"; // TODO: 로그인 성공 후 이동 처리 시 주석 해제

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  password: "",
};

export function LoginPage() {
  // const navigate = useNavigate(); // TODO: 라우팅 이동용
  // TODO: 로그인 API 연결 시 중복 요청 방지 및 로딩용
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(DEFAULT_FORM);

  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isPasswordValid = PASSWORD_REGEX.test(form.password);

  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;

  const canSubmit = isEmailValid && isPasswordValid && !isSubmitting;

  const handleChangeField = (key: keyof typeof DEFAULT_FORM, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setIsSubmitting(true);
      // TODO: 로그인 API 연동 수행
      console.log("로그인 시도:", form);
    } catch {
      alert("로그인에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f4f5f7] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        {/* 로그인 타이틀 좌측 정렬 */}
        <h1 className="text-3xl font-bold text-left text-gray-900 mb-6">
          로그인
        </h1>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* 이메일 입력 영역 */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              이메일
            </label>
            <div className="relative flex items-center">
              {/* 메일 아이콘 */}
              <FiMail className="absolute left-3.5 text-gray-400 text-lg pointer-events-none" />
              <input
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => handleChangeField("email", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-white border rounded-lg outline-none transition-colors text-sm ${
                  showEmailError
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
              />
            </div>
            {showEmailError && (
              <p className="text-xs text-red-500">이메일 형식을 확인해 주세요.</p>
            )}
          </div>

          {/* 비밀번호 입력 영역 */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              비밀번호
            </label>
            <div className="relative flex items-center">
              {/* 자물쇠 아이콘 */}
              <FiLock className="absolute left-3.5 text-gray-400 text-lg pointer-events-none" />
              <input
                type="password"
                placeholder="비밀번호"
                value={form.password}
                onChange={(e) => handleChangeField("password", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-white border rounded-lg outline-none transition-colors text-sm ${
                  showPasswordError
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
              />
            </div>
            {showPasswordError && (
              <p className="text-xs text-red-500">
                8자 이상, 영문 대소문자/숫자/특수문자를 모두 포함해 주세요.
              </p>
            )}
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full py-3 text-white font-medium rounded-lg transition-colors mt-2 text-sm ${
              canSubmit
                ? "bg-[#2563eb] hover:bg-blue-700 cursor-pointer"
                : "bg-[#2563eb] cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>

        {/* 하단 회원가입 이동 링크 */}
        <div className="text-center text-xs text-gray-500 pt-1">
          처음이신가요?{" "}
          <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
}