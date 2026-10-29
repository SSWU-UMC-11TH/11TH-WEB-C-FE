import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookmarkState {
  bookmarkedIds: number[];
  toggleBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarkedIds: [],
      toggleBookmark: (id: number) => {
        const { bookmarkedIds } = get();
        const exists = bookmarkedIds.includes(id);
        set({
          bookmarkedIds: exists
            ? bookmarkedIds.filter((itemId) => itemId !== id)
            : [...bookmarkedIds, id],
        });
      },
      isBookmarked: (id: number) => {
        return get().bookmarkedIds.includes(id);
      },
    }),
    {
      name: "umcine-bookmark-store", // 미션에서 요구하는 Web Storage 키 이름
    }
  )
);