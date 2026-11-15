import { useState } from "react";

export default function ApiTest() {
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState("");

  const callApi = async (path: string) => {
    setResult(null);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8080${path}`
      );

      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      setResult(data);
    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Spring Boot API 테스트</h2>

      <h3>1. 닉네임 중복 확인</h3>
      <button onClick={() => callApi("/members/nickname/test")}>
        닉네임 확인
      </button>

      <h3>2. 이메일 중복 확인</h3>
      <button onClick={() => callApi("/members/email/test@example.com")}>
        이메일 확인
      </button>

      <h3>3. 회원별 평점 조회</h3>
      <button onClick={() => callApi("/members/1/ratings")}>
        평점 조회
      </button>

      <h3>API 응답 결과</h3>
      <pre>{JSON.stringify(result, null, 2)}</pre>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}