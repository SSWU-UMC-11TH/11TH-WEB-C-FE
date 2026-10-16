import { Header} from "./components/layout/header";
import { MovieListPage } from "./pages/movie-list-page";
import { useEffect, useState } from "react";
import { readBookmarkIds, saveBookMarkIds } from "./utils/bookmark-storage";

export default function App() {
  const [bookmarkIds, setBookmarkIds] =
    useState<number[]>(readBookmarkIds);

  useEffect(() => {
    saveBookMarkIds(bookmarkIds);
  }, [bookmarkIds]);

  const handleBookmark = (movieId: number) => {
    setBookmarkIds((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
          : [...prev, movieId]
);
  };

    return (
        <>
          <Header />
          <MovieListPage
            bookmarkIds={bookmarkIds}
            onBookmark={handleBookmark} />
        </>
    );
}