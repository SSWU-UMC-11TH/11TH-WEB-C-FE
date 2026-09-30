import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="w-full bg-white border-b border-[#e5e7eb] py-[12px] box-border">
      <div className="max-w-[1080px] mx-auto px-[20px] flex justify-between items-center">
        {/* 왼쪽: 로고 및 내비게이션 메뉴 */}
        <div className="flex items-center gap-[32px]">
          <div className="text-[18px] font-[900] text-[#111111] tracking-[-0.5px]">
            UMCine
          </div>
          <nav className="flex gap-[20px]">
            <Link
              to="/"
              className="no-underline text-[13px] font-[600] text-[#111111] transition-colors"
            >
              영화
            </Link>
            <Link
              to="/search"
              className="no-underline text-[13px] font-[600] text-[#6b7280] hover:text-[#111111] transition-colors"
            >
              검색
            </Link>
            <Link
              to="/"
              className="no-underline text-[13px] font-[600] text-[#6b7280] hover:text-[#111111] transition-colors"
            >
              내 정보
            </Link>
          </nav>
        </div>

        {/* 오른쪽: 돋보기 아이콘 버튼 및 파란색 로그인 버튼 */}
        <div className="flex items-center gap-[12px]">
          <Link
            to="/search"
            className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[8px] w-[34px] h-[34px] flex items-center justify-center text-[#6b7280] cursor-pointer no-underline"
            aria-label="검색"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </Link>
          <button
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white border-none rounded-[8px] px-[16px] py-[8px] text-[13px] font-[600] cursor-pointer transition-colors"
            type="button"
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}