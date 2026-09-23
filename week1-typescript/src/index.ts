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

// 회원 ID로 정보를 찾아 안내 문구를 만드는 함수
function getMemberInfo(id: number): string {
  const foundMember = members.find((member) => member.id === id);

  // 1. 존재하지 않는 회원 처리 (찾지 못했다면 undefined)
  if (!foundMember) {
    return `[오류] ID가 ${id}인 회원을 찾을 수 없습니다.`;
  }

  // 2. GitHub 아이디가 없는 회원 처리
  const githubInfo = foundMember.githubId ?? "등록된 GitHub 없음";

  return `회원 이름: ${foundMember.name} | 역할: ${foundMember.role} | GitHub: ${githubInfo}`;
}

// 3. 테스트 실행
console.log(getMemberInfo(1));   // ID 1: 광수 (GitHub 있음)
console.log(getMemberInfo(2));   // ID 2: 지수 (GitHub 없음)
console.log(getMemberInfo(999)); // ID 999: 존재하지 않는 회원