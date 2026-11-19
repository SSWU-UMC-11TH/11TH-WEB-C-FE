import { useState} from "react";
import "./login-page.css";
import { useLoginMutation } from "../../hooks/use-login-mutation";

export function LoginPage() {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [form, setForm] = useState({ email: "", password: "",});
    const loginMutation = useLoginMutation();
    const canSubmit = EMAIL_REGEX.test(form.email.trim()) && form.password.length > 0;

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!canSubmit || loginMutation.isPending) return;

        loginMutation.mutate({
            email: form.email.trim(),
            password: form.password,
        });
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1 className="login-title">로그인</h1>
                <div className="login-form-group">
                    <label htmlFor="email" className="login-label">
                        이메일
                    </label>

                    <div className="login-input-wrapper">
                        <svg className="login-input-icon"
                             viewBox="0 0 24 24"
                             fill="none"
                             stroke="currentColor"
                             strokeWidth="1.8"
                             aria-hidden="true"
                        >
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="m3 7 9 6 9-6"/>
                        </svg>

                        <input id="email" type="email" className="login-input" placeholder="name@example.com" autoComplete="email" value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}></input>
                    </div>
                </div>

                <div className="login-form-group">
                    <label htmlFor="password" className="login-label">
                        비밀번호
                    </label>

                    <div className="login-input-wrapper">
                        <svg
                            className="login-input-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            aria-hidden="true"
                        >
                            <rect x="5" y="10" width="14" height="11" rx="2" />
                            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                        </svg>

                        <input id="password" type="password" className="login-input" placeholder="비밀번호" autoComplete="current-password" value={form.password}
                        onChange={(e) => setForm({...form, password: e.target.value})}/>
                    </div>
                </div>

                <button type="submit" className="login-submit-button" disabled={!canSubmit || loginMutation.isPending}>{loginMutation.isPending ? "로그인 중..." : "로그인"}</button>
                {loginMutation.isError && (
                    <p className="login-error-text" role="alert">로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.</p>
                )}
                <p className="login-signup-text">처음이신가요?{" "}<a href="/signup">회원가입</a>
                </p>
            </form>
        </div>
    );
}