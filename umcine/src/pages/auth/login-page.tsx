import { useState, type FormEvent } from "react";
import "./login-page.css";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const canSubmit = email.trim().length > 0 && password.length > 0;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!canSubmit) return;

        // 로그인 API 연결

        console.log("로그인 요청", { email });
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

                        <input id="email" type="email" className="login-input" placeholder="name@example.com" autoComplete="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required></input>
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

                        <input id="password" type="password" className="login-input" placeholder="비밀번호" autoComplete="current-password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                </div>

                <button type="submit" className="login-submit-button" disabled={!canSubmit}>로그인</button>
                <p className="login-signup-text">처음이신가요?{" "}<a href="/signup">회원가입</a>
                </p>
            </form>
        </div>
    );
}