import { useState } from "react";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";

// 유효성 검사 정규식
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];

//중복 확인 기본 상태 정의
const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type DuplicateCheckKey = "email" | "nickname";

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);

  //중복 확인 상태 관리
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: DEFAULT_DUPLICATE_CHECK,
    nickname: DEFAULT_DUPLICATE_CHECK,
  });

  // 유효성 검사 결과
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());
  const isNicknameValid =
    form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;
  const isPasswordValid = PASSWORD_REGEX.test(form.password);
  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  // 오류 표시 여부
  const showEmailError = form.email.length > 0 && !isEmailValid;
  const showNicknameError = form.nickname.length > 0 && !isNicknameValid;
  const showPasswordError = form.password.length > 0 && !isPasswordValid;
  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 && !isPasswordConfirmValid;

  // 폼 전체 유효성
  const isFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;

  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

  const handleChangeField = (key: DefaultFormKey, value: DefaultFormValue) => {
      if (key === "email" || key === "nickname") {
        if (duplicateCheck[key].isChecking) return;
        setDuplicateCheck((prev) => ({ ...prev, [key]: DEFAULT_DUPLICATE_CHECK }));
      }
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
  const isValid = key === "email" ? isEmailValid : isNicknameValid;
  if (!isValid || duplicateCheck[key].isChecking) return;

  const label = key === "email" ? "이메일" : "닉네임";
  setDuplicateCheck((prev) => ({
    ...prev,
    [key]: { isChecking: true, isAvailable: false },
  }));

  try {
    const response =
      key === "email"
        ? await checkEmailDuplicate(form.email.trim())
        : await checkNicknameDuplicate(form.nickname.trim());
    const isAvailable = response.available;
    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: { ...prev[key], isAvailable },
    }));
    alert(
      isAvailable
        ? `사용할 수 있는 ${label}이에요.`
        : `이미 사용 중인 ${label}이에요.`,
    );
  } catch {
    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: { ...prev[key], isAvailable: false },
    }));
    alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
  } finally {
    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: { ...prev[key], isChecking: false },
    }));
  }
};

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log("제출 성공:", form);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          회원가입
        </h1>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
         {/* 이메일 */}
         <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-gray-700">
            이메일
          </label>
          <div className="relative flex items-center">
            <input
              type="email"
              placeholder="name@example.com"
              value={form.email}
              disabled={duplicateCheck.email.isChecking}
              onChange={(e) => handleChangeField("email", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg pr-24 outline-none transition-colors ${
                showEmailError
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
            />
            <button
              type="button"
              disabled={!isEmailValid || duplicateCheck.email.isChecking}
              onClick={() => handleCheckDuplicate("email")}
              className={`absolute right-3 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                isEmailValid && !duplicateCheck.email.isChecking
                  ? "text-blue-600 hover:bg-blue-50 cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
            </button>
          </div>
          {showEmailError && (
            <p className="text-xs text-red-500">이메일 형식을 확인해 주세요.</p>
          )}
         </div>

         {/* 닉네임 */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              닉네임
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="2~12자"
                value={form.nickname}
                disabled={duplicateCheck.nickname.isChecking}
                onChange={(e) => handleChangeField("nickname", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg pr-24 outline-none transition-colors ${
                  showNicknameError
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
              />
              <button
                type="button"
                disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
                onClick={() => handleCheckDuplicate("nickname")}
                className={`absolute right-3 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  isNicknameValid && !duplicateCheck.nickname.isChecking
                    ? "text-blue-600 hover:bg-blue-50 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
              </button>
            </div>
            {showNicknameError && (
              <p className="text-xs text-red-500">
                닉네임은 2자 이상 12자 이하로 입력해 주세요.
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="8자 이상"
              value={form.password}
              onChange={(e) => handleChangeField("password", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg outline-none transition-colors ${
                showPasswordError
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
            />
            <p
              className={`text-xs ${
                showPasswordError ? "text-red-500" : "text-gray-400"
              }`}
            >
              영문 대소문자, 숫자, 특수문자를 모두 포함해 8자 이상 입력해 주세요.
            </p>
          </div>

          {/* 비밀번호 확인 */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
              비밀번호 확인
            </label>
            <input
              type="password"
              placeholder="다시 입력"
              value={form.passwordConfirm}
              onChange={(e) =>
                handleChangeField("passwordConfirm", e.target.value)
              }
              className={`w-full px-4 py-3 border rounded-lg outline-none transition-colors ${
                showPasswordConfirmError
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
            />
            {showPasswordConfirmError && (
              <p className="text-xs text-red-500">비밀번호가 일치하지 않아요.</p>
            )}
          </div>

          {/* 가입하기 버튼 */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full py-3.5 text-white font-medium rounded-lg transition-colors mt-6 ${
              canSubmit
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            가입하기
          </button>
        </form>

        {/* 로그인 링크 */}
        <div className="text-center text-sm text-gray-500 pt-2">
          이미 계정이 있나요?{" "}
          <span className="text-blue-500 font-medium hover:underline">
            로그인
          </span>
        </div>
      </div>
    </div>
  );
}