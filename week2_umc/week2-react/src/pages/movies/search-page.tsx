import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { movies } from "../../data/movies";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

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

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <div className="w-full min-h-screen bg-[#f4f5f7] font-sans text-[#111] flex flex-col justify-between">
      <main className="w-full max-w-[1080px] mx-auto px-[20px] py-[16px] box-border flex-1">
        <h1 className="text-[22px] font-[800] text-left mt-[12px] mb-[16px] text-[#111]">
          영화 검색
        </h1>

        {/* 검색 폼 영역 (Figma 검색창 UI 스타일) */}
        <form onSubmit={handleSubmit} className="w-full relative mb-[24px]">
          <div className="flex items-center bg-white border border-[#e5e7eb] rounded-[8px] px-[16px] py-[10px] shadow-sm">
            <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-[12px] shrink-0"
            ><circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              aria-label="검색어"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="영화 제목을 입력하세요"
              className="w-full border-none outline-none text-[14px] text-[#111] placeholder-[#9ca3af] bg-transparent"
            />
            {searchText && (
              <button
                type="button"
                onClick={() => setSearchText("")}
                className="text-[#9ca3af] hover:text-[#111] border-none bg-transparent cursor-pointer mr-[12px] text-[16px]"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="bg-[#111111] hover:bg-[#333333] text-white text-[13px] font-[600] px-[16px] py-[8px] rounded-[6px] transition-colors whitespace-nowrap cursor-pointer"
            >
              다시 검색
            </button>
          </div>
        </form>

        {/* 검색 결과 및 안내 문구 영역 */}
        {!normalizedQuery ? (
          <div className="py-[60px] text-center text-[#6b7280] text-[15px]">
            검색어를 입력해 주세요.
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-[16px]">
              <h2 className="text-[16px] font-[700] text-[#111]">
                ‘{query}’ 검색 결과
              </h2>
              <p className="text-[12px] text-[#9ca3af]">
                영화 {searchResults.length}편
              </p>
            </div>

            {searchResults.length === 0 ? (
              <div className="py-[60px] text-center text-[#6b7280] text-[15px]">
                검색 결과가 없어요.
              </div>
            ) : (
              /* Figma 시안 2열 카드 그리드 레이아웃 */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex bg-white rounded-[12px] p-[16px] border border-[#e5e7eb] shadow-sm gap-[16px]"
                  >
                    {/* 포스터 이미지 (상세 페이지 링크) */}
                    <Link
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                      className="block shrink-0"
                    >
                      <img
                        src={movie.posterPath}
                        alt={`${movie.title} 포스터`}
                        className="w-[110px] h-[160px] object-cover rounded-[8px]"
                      />
                    </Link>

                    {/* 영화 상세 정보 */}
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <h3 className="text-[15px] font-[700] text-[#111] mb-[4px] truncate">
                          <Link
                            to="/movies/$movieId"
                            params={{ movieId: String(movie.id) }}
                            className="text-inherit no-underline hover:underline"
                          >
                            {movie.title}
                          </Link>
                        </h3>
                        <p className="text-[12px] text-[#9ca3af] mb-[8px]">
                          {movie.originalTitle} · {movie.releaseDate}
                        </p>
                        <p className="text-[12px] text-[#4b5563] line-clamp-3 leading-relaxed">
                          {movie.overview}
                        </p>
                      </div>

                      {/* 상세 보기 링크 */}
                      <Link
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                        className="text-[12px] font-[700] text-[#2563eb] hover:underline mt-[8px] inline-flex items-center gap-[4px]"
                      >
                        상세 보기 →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* 푸터 영역 */}
      <footer className="w-full border-t border-[#e5e7eb] bg-white py-[16px] mt-[40px]">
        <div className="max-w-[1080px] mx-auto px-[20px] flex items-center justify-end gap-[8px] text-[11px] text-[#6b7280]">
          <img src="/icons/tmdb-logo.svg" alt="TMDB Logo" className="h-[12px] object-contain" />
          <span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
        </div>
      </footer>
    </div>
  );
}