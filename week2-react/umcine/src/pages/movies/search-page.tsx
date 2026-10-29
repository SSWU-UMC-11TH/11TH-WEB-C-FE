import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useBookmarkStore } from "../../stores/useBookmarkStore";
import { movies } from "../../data/movies";
import { MovieCard } from "../../components/movies/movie-card"

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  const { toggleBookmark, isBookmarked } = useBookmarkStore();

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  //검색된 영화들에 현재 zustand 북마크 상태 매핑
  const moviesWithBookmark = searchResults.map((movie) => ({
    ...movie,
    isBookmarked: isBookmarked(movie.id),
  }))

  return (
    <main className="mx-auto max-w-[1280px] px-8 py-10 pb-20 w-full">
      <h1 className="text-2xl font-extrabold text-[#111111] mb-7 tracking-[-0.5px]">영화 검색</h1>
      
      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <input
          aria-label="검색어"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="검색할 영화 제목을 입력하세요..."
          className="flex-1 rounded-xl border border-[#e5e8ec] px-4 py-3 text-[15px] outline-none focus:border-[#2f65f8]"
        />
        <button 
          type="submit" 
          className="rounded-xl bg-[#2f65f8] px-6 py-3 font-semibold text-white cursor-pointer hover:bg-[#1e50e6] transition-colors"
        >
          검색
        </button>
      </form>

      {!normalizedQuery ? (
        <p className="text-center py-20 text-gray-500">검색어를 입력해 주세요.</p>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-[#111111]">&lsquo;{query}&rsquo; 검색 결과</h2>
            <p className="text-sm text-gray-500">영화 {searchResults.length}편</p>
          </div>

          {searchResults.length === 0 ? (
            <p className="text-center py-20 text-gray-500">검색 결과가 없어요.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-8">
              {moviesWithBookmark.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onToggleBookmark={toggleBookmark}
                />
          ))}
        </div>
        )}
      </div>
      )}
    </main>
  );
}