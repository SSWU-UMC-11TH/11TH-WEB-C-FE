type Role = "팀장" | "팀원";
interface StudyMember {
    id: number;
    name: string;
    role: Role;
    githubId?: string;
}

const members: StudyMember[] = [{
    id: 1,
    name: "피트",
    role: "팀장",
    githubId: "petejjang"
}, {
    id: 2,
    name: "유피",
    role: "팀원",
}];

function searchMemberById(id: number): string {
    const foundMember = members.find((member) => member.id === id);
    if (foundMember === undefined) {
        return "존재하지 않는 회원입니다.";
    }
    const githubText = foundMember.githubId ?? "GitHub 아이디가 존재하지 않습니다.";
    return `${foundMember.name} (${foundMember.role})님 /GitHub: ${githubText}`;
}

console.log(searchMemberById(1));
console.log(searchMemberById(2));
console.log(searchMemberById(999));

   function formatMemberId(input: unknown): string {
  if (typeof input === "number" && Number.isInteger(input) && input > 0) {
    return `회원 ID : ${input}`;
  }
  if (typeof input === "string" && input.trim()) {
    return `회원 ID : ${input}`;
  }
  return "유효하지 않은 회원 ID 형태입니다.";
}


console.log(formatMemberId(101));       // 숫자 처리
console.log(formatMemberId("user_01")); // 문자열 처리
console.log(formatMemberId(-1));       // 음수
console.log(formatMemberId(3.14));     // 소수
console.log(formatMemberId(NaN));      // NaN
console.log(formatMemberId(""));       // 빈 문자열
console.log(formatMemberId("   "));    // 공백 문자열
console.log(formatMemberId(true));     // 기타 타입
