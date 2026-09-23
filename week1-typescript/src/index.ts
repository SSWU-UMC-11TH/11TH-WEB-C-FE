// 회원 역할 타입 (리더 또는 일반 멤버)
type MemberRole = "leader" | "member";

// 스터디 회원 타입 정의
type StudyMember = {
  id: number;
  name: string;
  role: MemberRole;
  githubId?: string; // 없어도 되는 선택적 속성
};

// 회원 데이터 (최소 2명 이상)
const members: StudyMember[] = [
  { id: 1, name: "광수", role: "leader", githubId: "gwangsoo" }, // GitHub 있음
  { id: 2, name: "지수", role: "member" },                      // GitHub 없음 (선택적 속성이므로 생략 가능)
];