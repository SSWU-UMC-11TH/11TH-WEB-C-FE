import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFavoriteStatus } from "../api/favorites/get-favorite-status";
import { addFavorite } from "../api/favorites/add-favorite";
import { removeFavorite } from "../api/favorites/remove-favorite";
import { useAuthStore } from "../stores/auth-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  variant?: "card" | "detail";
}

export function BookmarkButton({
  movieId,
  variant = "card",
}: BookmarkButtonProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = Boolean(accessToken);

  // 1. 해당 영화의 즐겨찾기 여부 조회 (GET /favorites/{movieId})
  const favoriteStatusQuery = useQuery({
    queryKey: ["favorites", "status", movieId],
    queryFn: () => getFavoriteStatus(movieId),
    enabled: isLoggedIn && movieId > 0,
  });

  const isBookmarked = favoriteStatusQuery.data?.isFavorite ?? false;

  // 2. 즐겨찾기 등록 / 해제 뮤테이션 (POST /favorites, DELETE /favorites/{movieId})
  const toggleMutation = useMutation({
    mutationFn: async () => {
      if (isBookmarked) {
        await removeFavorite(movieId);
      } else {
        await addFavorite(movieId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", "status", movieId],
      });
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
    onError: () => {
      alert("즐겨찾기 처리에 실패했습니다. 다시 시도해 주세요.");
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      if (confirm("로그인이 필요한 기능입니다. 로그인 페이지로 이동할까요?")) {
        navigate({ to: "/login" });
      }
      return;
    }

    if (toggleMutation.isPending) return;
    toggleMutation.mutate();
  };

  // 상세 페이지용 버튼
  if (variant === "detail") {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={toggleMutation.isPending}
        className={cn(
          "inline-flex items-center gap-[8px] px-[18px] py-[10px] rounded-[10px] text-[13px] font-[600] cursor-pointer transition-all duration-200 ease-in-out shadow-sm active:scale-95 border disabled:opacity-60",
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
      onClick={handleClick}
      disabled={toggleMutation.isPending}
      className={cn(
        "absolute top-[8px] right-[8px] w-[28px] h-[28px] rounded-[6px] flex items-center justify-center p-0 cursor-pointer transition-all duration-200 ease-in-out border disabled:opacity-60",
        isBookmarked
          ? "bg-[#2563eb] border-[#1d4ed8]"
          : "bg-black/80 border-white/20"
      )}
    >
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