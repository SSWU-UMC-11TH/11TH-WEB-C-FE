// const courseName = "Script";
// console.log("이번 주 학습 주제: " + courseName);

// const currentLevel: number = 1;
// console.log("현재 레벨: " + currentLevel);

// const memberNames = ["광수"];
// console.log(memberNames[5].toUpperCase());

// function introduceStudent(studentName: string, currentLevel: number) {
//     return studentName + " 님은 현재 " + currentLevel + "레벨입니다.";
// }

// introduceStudent("광수",1);

// let studentName = "광수";
// let currentLevel = 1;
// let isCompleted = false;

// console.log(studentName, currentLevel, isCompleted);


// const firstMember = { name: "광수"};
// const secondMember = { name: "광수"};
// const sameMember = firstMember;

// console.log(firstMember === secondMember);
// console.log(firstMember === sameMember);


// const studyMember = { name: "광수"};
// studyMember.name = "지수";

// console.log(studyMember.name);
// //studyMember = { name: "현우"};

// let assignmentScore: number;
// assignmentScore = 90;

// const studentNames: string[] = ["광수","지수","현우"];
// const weeklyScores: number[] = [80,90,100];

// studentNames.push("수빈");
// studentNames.push(123);

// let Name = "클루";
// let currentWeek = 1;
// let completed = false;

// const skills = ["javascript","spring","react"];
// //skills.push(111);

// const firstFood = { name: "떡볶이"};
// const secondFood = { name: "소고기"};
// const sameFood = firstFood;

// console.log(firstFood === sameFood);

// type MemberProfile = {
//     name: string;
// }

// type GithubProfile = {
//     githubId: string;
// }

// type MemberWithGithub = MemberProfile & GithubProfile;

// const gwangsooProfile: MemberWithGithub = {
//     name: "광수",
//     githubId: "gwangsoo"
// }

// console.log(gwangsooProfile.name, gwangsooProfile.githubId);

// type studentName = string;

// interface studyMember {
//     name: studentName;
// }

// interface studyMember {
//     level: number;
// }

// const member: studyMember = {
//     name: "광수",
//     level: 1
// }

// type StudyMember = {
//     name: string;
//     level: number;
//     isLeader: boolean;
// }

// const member: StudyMember = {
//     name: "광수",
//     level: 1,
//     isLeader : true
// }

// function createMemberCard(studyMember: StudyMember) {
//     return studyMember.name + " 님, " + studyMember.level + "레벨";
// }

// console.log(createMemberCard(member));


// const student1: {
//     name: string;
//     level: number;
//     isCompleted: boolean;
// } = {
//     name: "광",
//     level: 1,
//     isCompleted: false,
// };

// type Student = {
//     name: string;
//     level: number;
//     isCompleted: boolean;
//     githubId?: string;
// };

// const gwangsoo: Student = {
//     name: "광수",
//     level: 1,
//     isCompleted: false,
// };

// function createGreeting(studentName: string) {
//     return "안녕, " + studentName + " 님!";
// }

// const greetingMessage = createGreeting("광수");


// function printGreeting(studentName: string) {
//     console.log("반가워요, " + studentName + " 님!");
// }

// const calculateTotalScore = (
//     assignmentScore: number,
//     attendanceScore: number
// ) => {
//     return assignmentScore + attendanceScore;
// };

// 

// type StudentName = string;

// interface StudyMember {
//     name: StudentName;
// }

// interface StudyMember {
//     level: number;
// }

// const member: StudyMember = {
//     name: "광수",
//     level: 1,
// };

// type StudyMember = {
//     name: string;
//     level: number;
//     isLeader: boolean;
// };

// const member: StudyMember = {
//     name: "광수",
//     level: 1,
//     isLeader: true
// };

// function createMemberCard(studyMember: StudyMember) {
//     return studyMember.name + " 님, " + studyMember.level + "레벨";
// }

// console.log(createMemberCard(member));


// function printMemberId(memberId: string | number) {
//     console.log(memberId);
// }

// printMemberId("member-01");
// printMemberId(1);


// function formatMemberId(memberId: string | number) {
//     if(typeof memberId === "string") {
//         return memberId.toUpperCase();
//     }

//     return "MEMBER-" + memberId;
// }

// type MemberRole = "leader" | "member";
// type AttendanceStatus = "present" | "late" | "absent";

// const gwangsooRole: MemberRole = "leader";
// const todayStatus: AttendanceStatus = "present";


// type StudyResult = | { status: "success"; completedCount: number }
// | { status: "error"; message: string};

// function printStudyResult(result: StudyResult) {
//     if (result.status === "success") {
//         console.log("완료한 과제: " + result.completedCount);
//         return;
//     }

//     console.log("오류: " + result.message);
// }


// type MemberRole = "leader" | "member"

// function printMemberRole(role: MemberRole) {
//     if(role === "leader") {
//         return "스터디를 이끌어요.";
//     }
//     else {
//         return "스터디에 참여해요.";
//     }
// }

// console.log(printMemberRole("leader"));
// console.log(printMemberRole("member"));

// type MemberRole = "leader" | "member"

// function printMemberRole(role: MemberRole) {
//     if(role === "leader") {
//         return "스터디를 이끌어요.";
//     }
//     else {
//         return "스터디에 참여해요.";
//     }
// }

// type StudyMember = {
//     name: string;
//     githubId?: string;
// };

// const members: StudyMember[] = [
//     { name: "광수", githubId: "gwangsoo"},
//     { name: "지수"},
// ];

// let selectedMember: StudyMember | null = null;
// const foundMember = members.find((member) => member.name === "현우");

// console.log(selectedMember);
// console.log(foundMember);

// function formatStudyWeek(value: unknown) {
//     if(typeof value === "number") {
//         return `현재 ${value}주차예요.`;
//     }
//     else if(typeof value === "string") {
//         return `입력한 주차: ${value}`;
//     }
//     else {
//         return "주차를 확인할 수 없어요."
//     }
// }

// console.log(formatStudyWeek(3));
// console.log(formatStudyWeek("1주차"));
// console.log(formatStudyWeek(false));

// type StudyMember = {
//     name: string;
//     githubId?: string;
// };

// const members: StudyMember[] = [
//     { name: "광수", githubId: "gwangsoo"},
//     { name: "지수"}
// ];

// const result = members.find(member => member.name === "지원");
// console.log(result);

// let selectedMember: StudyMember | null = null;
// console.log(selectedMember);

// if(foundMember) {
//     console.log(foundMember.name);
// }

// const StudyTime = 0;
// console.log(StudyTime || 0);
// console.log(StudyTime ?? 0);

// const member = members[1];
// console.log(member.github?.id ?? "등록되지 않음");

// type member = {
//     name: string,
//     age: number;
// };

// function createBox<T>(value: T) {
//     return { value} ;
// }

// const studentName = createBox<string>("abc");
// const studentNum = createBox<number>(1);
// const isWho = createBox<member>({ name : "가나다", age: 20});

// studentName.value
// studentNum.value
// isWho.value


// type WeeklyGoal = {
//   title: string;
//   targetCount: number;
// };

// const weeklyGoal: WeeklyGoal = {
//   title: "TypeScript 예제 연습",
//   targetCount: 3,
// };

// function printGoal(goal: WeeklyGoal): string {
//   console.log(goal.title);
//   return weeklyGoal.title;
// }

type Member = {
    Id: number,
    Name: string,
    Role: string,
    githubId?: string;
};

const jin: Member = {
    Id: 1,
    Name: "진",
    Role: "졸림",
    githubId: "jin123"
};

const v: Member = {
    Id: 2,
    Name: "v",
    Role: "배고픔"
};

const members: Member[] = [jin, v];

function findMember(Id: number) {
    const member = members.find(member => member.Id === Id);

    if(!member) {
        return "존재하지 않는 회원입니다.";
    }

    const github = member.githubId ?? "github 아이디 없음";

    return `${member.Name} / ${member.Role} / ${github}`;
}

console.log(findMember(1));
console.log(findMember(2));
console.log(findMember(999));














