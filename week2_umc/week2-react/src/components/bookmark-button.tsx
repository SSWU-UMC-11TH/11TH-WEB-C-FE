import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  variant?: "card" | "detail"; // 카드/상세 페이지 디자인 구분
}

export function BookmarkButton({
  movieId,
  variant = "card",
}: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId)
  );

  const toggleBookmark = useBookmarkStore(
    (state) => state.toggleBookmark
  );

  // 상세 페이지용 버튼
  if (variant === "detail") {
    return (
      <button
        type="button"
        onClick={() => toggleBookmark(movieId)}
        className={cn(
          "inline-flex items-center gap-[8px] px-[18px] py-[10px] rounded-[10px] text-[13px] font-[600] cursor-pointer transition-all duration-200 ease-in-out shadow-sm active:scale-95 border",
          isBookmarked
            ? "bg-[#2563eb] hover:bg-[#1d4ed8] text-white border-[#1d4ed8]"
            : "bg-white hover:bg-[#f9fafb] text-[#374151] border-[#e5e7eb]"
        )}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={isBookmarked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>

        <span>{isBookmarked ? "즐겨찾기 완료" : "즐겨찾기"}</span>
      </button>
    );
  }

  // 카드용 버튼
  return (
    <button
      type="button"
      onClick={() => toggleBookmark(movieId)}
      className={cn(
        "absolute top-[8px] right-[8px] w-[28px] h-[28px] rounded-[6px] flex items-center justify-center p-0 cursor-pointer transition-all duration-200 ease-in-out border",
        isBookmarked
          ? "bg-[#2563eb] border-[#1d4ed8]"
          : "bg-black/80 border-white/20"
      )}
    >
      {/* Zustand 상태에 따라 아이콘 변경 */}
      <img
        src={
          isBookmarked
            ? "/icons/bookmark.svg"
            : "/icons/bookmark-outline.svg"
        }
        alt={isBookmarked ? "북마크 취소" : "북마크 하기"}
        className="w-[16px] h-[16px] brightness-0 invert"
      />
    </button>
  );
}