
import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";
import { BookmarkButton } from "../../components/bookmark-button";

export function MovieDetailPage() {
    const { movieId } = useParams({ from: "/movies/$movieId" });
    const movie = movies.find((item) => item.id === Number(movieId));

    if (!movie) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
                <h1 className="text-2xl font-bold">
                    영화를 찾을 수 없어요.
                </h1>
                <Link to="/" className="text-blue-600 hover:underline">
                    영화 목록으로 돌아가기
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F7F8FA] text-gray-900">
            {/* 상단 배경 이미지 */}
            <section className="relative h-[240px] overflow-hidden md:h-[360px]">
                <img
                    src={movie.backdropPath}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* 이미지 어둡게 처리 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* 영화 제목 및 정보 */}
                <div className="absolute inset-x-0 bottom-6 mx-auto w-full max-w-[1440px] px-4 text-white md:bottom-8 md:px-10 lg:px-20">
                    <Link
                        to="/"
                        className="mb-8 inline-block text-sm hover:underline"
                    >
                        ← 영화 목록
                    </Link>

                    <h1 className="text-2xl font-bold md:text-4xl">
                        {movie.title}
                    </h1>

                    <p className="mt-2 text-sm text-gray-200">
                        {movie.originalTitle}
                    </p>
                    <BookmarkButton movieId={movie.id} />

                    <p className="mt-2 text-sm text-gray-200">
                        {movie.releaseDate} · {movie.genres.join(" · ")} · {movie.runtime}
                    </p>
                    
                </div>
            </section>

            {/* 하단 영화 정보 영역 */}
            <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-6 md:px-10 lg:flex-row lg:px-20">
                {/* 왼쪽: 포스터와 줄거리 */}
                <div className="flex min-w-0 flex-1 flex-col gap-6 sm:flex-row">
                    <img
                        src={movie.posterPath}
                        alt={`${movie.title} 포스터`}
                        className="w-40 self-start rounded-lg object-cover shadow-md sm:w-48 lg:w-52"
                    />

                    <div className="min-w-0 flex-1">
                        <h2 className="text-xl font-bold">
                            {movie.tagline}
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-gray-600">
                            {movie.overview}
                        </p>
                    </div>
                </div>

                {/* 오른쪽: 내 평점 */}
                <aside className="w-full border-t border-gray-200 pt-6 lg:w-[340px] lg:shrink-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                    <h2 className="mb-2 text-lg font-bold">
                        내 평점
                    </h2>

                    <p className="mb-3 text-sm text-gray-500">
                        별점을 선택하고 감상평을 남겨보세요.
                    </p>

                    {/* 별점 UI */}
                    <div className="mb-4 flex gap-2 text-2xl text-gray-400">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                    </div>

                    {/* 감상평 입력 */}
                    <textarea
                        placeholder="영화에 대한 감상을 남겨주세요."
                        className="h-28 w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-sm outline-none focus:border-blue-500"
                    />

                    {/* 저장 버튼 */}
                    <button
                        type="button"
                        className="mt-3 w-full rounded-md bg-gray-900 py-3 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        평점 저장
                    </button>
                </aside>
            </section>
        </main>
    );
}
