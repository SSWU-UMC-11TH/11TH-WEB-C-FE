
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

export const Header = () => {
  const location = useLocation();

  const isSearchActive = location.pathname.startsWith("/search");
  const isMyActive = location.pathname === "/my";

  return (
    <header className="sticky top-0 z-[100] flex h-[72px] w-full items-center border-b border-[#e5e8ec] bg-white">
      <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-8">

        {/* 로고 및 네비게이션 */}
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-xl font-extrabold text-[#111111] no-underline"
          >
            <span className="flex items-center">
              <img
                src="/icons/movie.svg"
                alt=""
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </span>
            <span>
              <span className="text-[#2f65f8]">UMC</span>ine
            </span>
          </Link>

          <nav className="flex gap-6">
            <Link
              to="/"
              className={cn(
                "py-1 text-[15px] font-medium text-[#666666] no-underline transition-colors hover:text-[#111111]",
                location.pathname === "/" && "font-bold text-[#111111]"
              )}
            >
              영화
            </Link>

            <Link
              to="/search"
              className={cn(
                "py-1 text-[15px] font-medium text-[#666666] no-underline transition-colors hover:text-[#111111]",
                isSearchActive && "font-bold text-[#111111]"
              )}
            >
              검색
            </Link>

            <Link
              to="/my"
              className={cn(
                "py-1 text-[15px] font-medium text-[#666666] no-underline transition-colors hover:text-[#111111]",
                isMyActive && "font-bold text-[#111111]"
              )}
            >
              내 정보
            </Link>
          </nav>
        </div>

        {/* 우측 버튼 */}
        <div className="flex items-center gap-3">
          <Link
            to="/search"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e5e8ec] text-[#333333] no-underline transition-colors hover:bg-[#f7f9fa]"
            aria-label="검색"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>

          <Link
            to="/login"
            className="rounded-lg bg-[#2f65f8] px-4 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#1e50e6]"
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
};
