import { cn } from "../../utils/cn";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
}

export const Pagination = ({ currentPage = 1, totalPages = 5 }: PaginationProps) => {
  return (
    <nav className="flex items-center justify-center gap-3 mt-[60px] pb-10" aria-label="페이지 내비게이션">
      <button 
        type="button" 
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e8ec] bg-transparent text-[14px] font-medium text-[#666666] opacity-30 cursor-not-allowed transition-all" 
        disabled 
        aria-label="이전 페이지"
      >
        &lt;
      </button>
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e8ec] bg-transparent text-[14px] font-medium text-[#666666] cursor-pointer transition-all hover:border-[#b0b8c1] hover:text-[#111111]",
                isActive && "bg-[#2f65f8] border-[#2f65f8] text-white font-bold"
              )}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button 
        type="button" 
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e8ec] bg-transparent text-[14px] font-medium text-[#666666] cursor-pointer transition-all hover:border-[#b0b8c1] hover:text-[#111111]" 
        aria-label="다음 페이지"
      >
        &gt;
      </button>
    </nav>
  );
};