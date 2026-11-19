import { useBookmarkStore  } from "../stores/bookmark-store";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../stores/auth-store";
import { getFavoriteStatus } from "../api/favorites/get-favorite-status";
import { createFavorite } from "../api/favorites/create-favorite";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface BookmarkButtonProps {
    movieId: number;
    variant?: "card" | "detail";
}

export function BookmarkButton({ movieId, variant="card"}: BookmarkButtonProps) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const accessToken = useAuthStore((state) => state.accessToken);

    // 서버에서 즐겨찾기 여부 조회
    const favoriteStatusQuery = useQuery({
        queryKey: ["favorites", "status", movieId],
        queryFn: () => getFavoriteStatus(movieId),
        enabled: 
            !!accessToken && Number.isSafeInteger(movieId) && movieId > 0,
    });

    const isBookmarked = favoriteStatusQuery.data?.isFavorite ?? false;

    // 즐겨찾기 추가
    const createMutation = useMutation({
        mutationFn: () => createFavorite(movieId),
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: ["favorites"],
            });
        },
        onError: () => { alert("북마크 추가에 실패했어요.");},
    });

    const isPending = createMutation.isPending;

    // 버튼 클릭
    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            event.stopPropagation();

            if(!accessToken) {
                navigate({ to: "/login"});
                return;
            }

            if(favoriteStatusQuery.isError) {
                void favoriteStatusQuery.refetch();
                return;
            }

            if(favoriteStatusQuery.isPending || isPending) {
                return;
            }

            if(isBookmarked) {
                
            } else {
                createMutation.mutate();
            }
        };

        const buttonText = !accessToken ? "로그인 후 북마크" : favoriteStatusQuery.isPending
                                        ? "확인 중..." : favoriteStatusQuery.isError
                                        ? "다시 조회" : isPending 
                                        ? "처리 중..." : isBookmarked
                                        ? "북마크 해제" : "북마크 추가";

    return (
        <button type="button" onClick={handleClick} disabled={isPending || (!!accessToken && favoriteStatusQuery.isPending)} className={
                variant === "card"
                    ? "absolute right-2 top-2 z-10 flex items-center justify-center rounded-full bg-black/60 p-2 text-white"
                    : "mt-3 rounded-full bg-black/60 px-4 py-2 text-sm text-white"
            }>
            {isBookmarked ? "북마크 해제" : "북마크 추가"}
        </button>
    );
}