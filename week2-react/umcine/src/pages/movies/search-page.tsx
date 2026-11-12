import { useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useSearchMoviesQuery } from "../../queries/movie-queries";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });

  const normalizedQuery = query?.trim() ?? "";
  const [searchText, setSearchText] = useState(query ?? "");

  const { data, isPending, isError } = useSearchMoviesQuery(normalizedQuery);
  const movies = data?.results ?? [];

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({ search: nextQuery ? { query: nextQuery } : {} });
  }


  return (
    <main className="mx-auto min-h-[calc(100vh-72px)] w-full max-w-[1280px] px-8 py-10">

      {/* 페이지 제목 */}
      <h1 className="mb-6 text-[32px] font-extrabold tracking-tight text-[#111111]">
        영화 검색
      </h1>

      {/* 검색창 */}
      <form
        onSubmit={handleSubmit}
        className="mb-5 flex items-center gap-3 rounded-lg border border-[#e0e4e9] bg-white px-4 py-2"
      >
        <span className="text-xl text-gray-500">⌕</span>

        <input
          aria-label="검색어"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="검색할 영화 제목을 입력하세요..."
          className="min-w-0 flex-1 border-none bg-transparent py-2 text-sm outline-none"
        />

        {searchText && (
          <button
            type="button"
            onClick={() => setSearchText("")}
            className="cursor-pointer border-none bg-transparent text-xl text-gray-500"
            aria-label="검색어 지우기"
          >
            ×
          </button>
        )}

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-[#17191e] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#333333]"
        >
          다시 검색
        </button>
      </form>

      {!normalizedQuery ? (
        <p className="py-20 text-center text-gray-500">
          검색어를 입력해 주세요.
        </p>
      ) : (
        <>
          {/* 검색 결과 제목 */}
          <div className="mb-5 flex items-center justify-between border-b border-[#dfe3e8] pb-4">
            <h2 className="text-base font-bold text-[#111111]">
              &lsquo;{normalizedQuery}&rsquo; 검색 결과
            </h2>

            <span className="text-xs text-gray-400">
              영화 {movies.length}편
            </span>
          </div>

          {isPending && (
            <p className="py-16 text-center text-gray-500">
              검색 중...
            </p>
          )}

          {isError && (
            <p className="py-16 text-center text-red-500">
              ...검색 결과를 불러오지 못했어요.
            </p>
          )}

          {!isPending && !isError && movies.length === 0 && (
            <p className="py-20 text-center text-gray-500">
              검색 결과가 없어요.
            </p>
          )}

          {/* 영화 검색 결과 */}
          {!isPending && !isError && movies.length > 0 && (
            <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2">

              {movies.map((movie) => {
                const posterUrl = movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "";

                return (
                  <article
                    key={movie.id}
                    className="flex min-w-0 gap-[18px] border-b border-[#dfe3e8] py-5"
                  >
                    {/* 포스터 */}
                    <Link
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                      className="h-[190px] w-[126px] shrink-0 overflow-hidden rounded-lg bg-gray-200"
                    >
                      {posterUrl ? (
                        <img
                          src={posterUrl}
                          alt={`${movie.title} 포스터`}
                          className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-gray-500">
                          포스터 없음
                        </div>
                      )}
                    </Link>

                    {/* 영화 정보 */}
                    <div className="flex min-w-0 flex-1 flex-col items-start">

                      <Link
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                        className="no-underline"
                      >
                        <h3 className="text-base font-bold text-[#17191e] hover:text-[#2f65f8]">
                          {movie.title}
                        </h3>
                      </Link>

                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-400">
                        <span>{movie.original_title}</span>
                        <span>{movie.release_date}</span>
                      </div>

                      <p className="mt-3 line-clamp-3 text-xs leading-6 text-gray-500">
                        {movie.overview || "등록된 줄거리가 없습니다."}
                      </p>

                      <Link
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                        className="mt-auto pt-3 text-xs font-semibold text-[#2f65f8] no-underline hover:underline"
                      >
                        상세 보기 →
                      </Link>

                    </div>
                  </article>
                );
              })}

            </div>
          )}
        </>
      )}
    </main>
  );
}