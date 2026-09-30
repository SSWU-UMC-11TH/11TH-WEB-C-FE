import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

export const Header = () => {
  const location = useLocation();
  const isSearchActive = location.pathname.startsWith("/search");

  return (
    <header className="sticky top-0 z-[100] flex h-[72px] w-full items-center border-b border-[#e5e8ec] bg-white">
      <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-8">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2.5 text-xl font-extrabold text-[#111111] cursor-pointer no-underline">
            <span className="flex items-center">
              <img src="/icons/logo-icon.svg" alt="" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
            </span>
            <span><span className="text-[#2f65f8]">UMC</span>ine</span>
          </Link>
          <nav className="flex gap-6">
            <Link 
              to="/" 
              className={cn(
                "bg-none border-none text-[#666666] text-[15px] font-medium cursor-pointer py-1 transition-colors hover:text-[#111111] hover:font-bold no-underline",
                location.pathname === "/" && "text-[#111111] font-bold"
              )}
            >
              영화
            </Link>
            <Link 
              to="/search" 
              className={cn(
                "bg-none border-none text-[#666666] text-[15px] font-medium cursor-pointer py-1 transition-colors hover:text-[#111111] hover:font-bold no-underline",
                isSearchActive && "text-[#111111] font-bold"
              )}
            >
              검색
            </Link>
            <button type="button" className="bg-none border-none text-[#666666] text-[15px] font-medium cursor-pointer py-1 transition-colors hover:text-[#111111]">
              내 정보
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            to="/search" 
            className="bg-none border border-[#e5e8ec] rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer text-[#333333] transition-colors hover:bg-[#f7f9fa]"
            aria-label="검색"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </Link>
          <button type="button" className="bg-[#2f65f8] text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer transition-colors hover:bg-[#1e50e6]">
            로그인
          </button>
        </div>
      </div>
    </header>
  );
};