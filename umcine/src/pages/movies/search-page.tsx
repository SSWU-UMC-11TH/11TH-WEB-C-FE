import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { movies } from "../../data/movies";
import MovieGrid from "../../components/movies/movie-grid";

export function SearchPage() {
    const { query } = useSearch({ from: "/search"});
    const navigate = useNavigate({ from: "/search"});
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
            to: "/search",
            search: nextQuery ? { query: nextQuery } : {},
        });
    }

    return (
    <main className="min-h-screen bg-[#F7F8FA]">
        {!normalizedQuery ? (
            <section className="flex min-h-[582px] flex-col items-center px-4 pt-32 pb-20 md:px-[72px] md:pt-[209px] md:pb-[210px]">
                <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">
                    어떤 영화를 찾고 있나요?
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex w-full max-w-[820px] items-center gap-3 rounded-lg border border-gray-400 bg-white px-4 py-3 shadow-md"
                >
                    <input
                        type="text"
                        aria-label="검색어"
                        placeholder="어떤 영화를 찾으시나요?"
                        value={searchText}
                        onChange={(event) =>
                            setSearchText(event.target.value)
                        }
                        className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none"
                    />

                    <button
                        type="submit"
                        className="shrink-0 rounded-md bg-gray-900 px-5 py-2 text-sm font-medium text-white"
                    >
                        검색
                    </button>
                </form>
            </section>
        ) : (
            <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 py-6 md:px-10 lg:px-20">
                <h1 className="text-2xl font-bold text-gray-900">
                    영화 검색 결과
                </h1>

                <form onSubmit={handleSubmit} className="flex gap-3">
                    <input
                        aria-label="검색어"
                        value={searchText}
                        onChange={(event) =>
                            setSearchText(event.target.value)
                        }
                        className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900"
                    />

                    <button
                        type="submit"
                        className="rounded-lg bg-gray-900 px-5 py-3 text-white"
                    >
                        검색
                    </button>
                </form>

                <h2 className="text-lg font-semibold text-gray-900">
                    '{query}' 검색 결과
                </h2>

                <p className="text-sm text-gray-600">
                    영화 {searchResults.length}편
                </p>

                {searchResults.length === 0 ? (
                    <p className="py-16 text-center text-gray-500">
                        검색 결과가 없어요.
                    </p>
                ) : (
                    <MovieGrid
                        movies={searchResults} />
                )}
            </section>
        )}
    </main>
);
}