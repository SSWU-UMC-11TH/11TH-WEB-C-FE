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

type StudyMember = {
    name: string;
    level: number;
    isLeader: boolean;
};

const member: StudyMember = {
    name: "광수",
    level: 1,
    isLeader: true
};

function createMemberCard(studyMember: StudyMember) {
    return studyMember.name + " 님, " + studyMember.level + "레벨";
}

console.log(createMemberCard(member));


