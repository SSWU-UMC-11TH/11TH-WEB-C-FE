import { useBookmarkStore  } from "../stores/bookmark-store";

interface BookmarkButtonProps {
    movieId: number;
    variant?: "card" | "detail";
}

export function BookmarkButton({ movieId, variant="card"}: BookmarkButtonProps) {
    const isBookmarked = useBookmarkStore((state) =>
        state.bookmarkedMovieIds.includes(movieId),
    );
    const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

    return (
        <button type="button" onClick={() => toggleBookmark(movieId)} className={
                variant === "card"
                    ? "absolute right-2 top-2 z-10 flex items-center justify-center rounded-full bg-black/60 p-2 text-white"
                    : "mt-3 rounded-full bg-black/60 px-4 py-2 text-sm text-white"
            }>
            {isBookmarked ? "북마크 해제" : "북마크 추가"}
        </button>
    );
}