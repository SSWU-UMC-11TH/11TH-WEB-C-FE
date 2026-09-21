**week1-1 미션 코드**



타입 정의: StudyMember 인터페이스 설계, role 유니온 타입("팀장" | "팀원"), githubId 선택적 프로퍼티(?) 적용



데이터 구성: 타입 규격에 맞춘 회원 객체 배열(members) 생성, 필수 및 선택 항목 구성



회원 조회 (searchMemberById): find 메서드 활용, 널 병합 연산자(??)를 통한 githubId 예외 처리



타입 가드 (formatMemberId): unknown 입력값에 대한 typeof 타입 좁히기(Type Narrowing) 분기 처리



핵심 포인트: 옵셔널 프로퍼티, 널 병합 연산자, 타입 가드를 통한 TypeScript 타입 안전성 확보

