import { useState, useEffect } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { BookmarkButton } from "../../components/bookmark-button";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import {getMovieDetailErrorMessage} from "../../utils/movies/get-movie-detail-error-message.ts";
import Footer from "../../components/layout/footer.tsx";
import { getFavoriteStatus } from "../../api/favorites/get-favorite-status.ts";
import { useAuthStore } from "../../stores/auth-store.ts";
import { getMyInfo } from "../../api/members/get-my-info.ts";
import { getMemberRatings } from "../../api/ratings/rating-api.ts";

export function MovieDetailPage() {
    const { movieId: movieIdParam } = useParams({ from: "/movies/$movieId" });
    const [score, setScore] = useState(0);
    const [comment, setComment] = useState("");
    
    // 영화 ID를 숫자로 변환
    const movieId = Number(movieIdParam);

    // 올바른 영화 ID인지 확인
    const isValidMovieId = Number.isSafeInteger(movieId) && movieId > 0;

    const QueryClient = useQueryClient();

    // Tanstack Query로 영화 상세 정보 요청
    const movieDetailQuery = useQuery({
        queryKey: ["movies", "detail", movieId],
        queryFn: () => getMovieDetail(movieId),
        enabled: isValidMovieId,
        staleTime: 30_000,
    });

    // 로그인 토큰
    const accessToken = useAuthStore((state) => state.accessToken);

    // 서버에서 즐겨찾기 여부 조회
    const favoriteStatusQuery = useQuery({
        queryKey: ["favorites", "status", movieId],
        queryFn: () => getFavoriteStatus(movieId),
        enabled: !!accessToken && Number.isSafeInteger(movieId) && movieId > 0,
    });

    // 로그인한 회원 정보 조회
    const memberQuery = useQuery({
        queryKey: ["members", "me"],
        queryFn: getMyInfo,
        enabled: !!accessToken,
    });

    const memberId = memberQuery.data?.memberId;

    // 회원 평점 조회
    const ratingsQuery = useQuery({
        queryKey: ["ratings", "member", memberId],
        queryFn: () => {
            if(memberId == null) {
                throw new Error("회원 ID가 없습니다.");
            }
            return getMemberRatings(memberId);
        },
        enabled: !!accessToken && memberId != null,
    });

    // 현재 영화에 등록한 평점
    const myRating = ratingsQuery.data?.find((rating) => rating.movieId === movieId);

    // 기존 평점이 있으면 입력창에 표시
    useEffect(() => {
        setScore(myRating?.score ?? 0);
        setComment(myRating?.comment ?? "");
    }, [
        movieId,
        myRating?.ratingId,
        myRating?.score,
        myRating?.comment,
    ]);

    // 평점 등록 또는 수정
    // const saveRatingMutation = useMutation({
    //     mutationFn: () => {
    //         const request = {
    //             score, 
    //             comment: comment.trim(),
    //         };

    //          if(myRating) {
    //              return updateRating(myRating.ratingId, request);
    //          }

    //         return CreateRating({movieId, ...request,});
    //     },

    //     onSuccess: async () => {
    //         await QueryClient.invalidateQueries({
    //             queryKey: ["ratings", "member", memberId],
    //         });

    //         alert("평점이 저장됐어요.");
    //     },
    //     onError: (error) => {
    //         console.error("평점 저장 실패:", error);
    //         alert("평점 저장에 실패했어요.");
    //     },
    // });

    // 저장 가능 여부
    // const canSaveRating = !!accessToken && memberId != null && ratingsQuery.isSuccess && !saveRatingMutation.isPending &&
    //                      Number.isInteger(score) && score >= 1 && score <= 5 && comment.length <= 500;


    // 잘못된 영화 id 처리
    if (!isValidMovieId) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
                <h1 className="text-2xl font-bold">
                    올바르지 않은 영화 번호예요.
                 </h1>
                <Link to="/" className="text-blue-600 hover:underline">
                    영화 목록으로 돌아가기
                </Link>
            </main>
        );
    }

    // 로딩 상태
    if (movieDetailQuery.isPending) {
        return (
             <main className="flex min-h-screen items-center justify-center">
                <p>영화 정보를 불러오는 중...</p>
            </main>
        );
    }

    // 오류 상태
    if (movieDetailQuery.isError) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50">
                <h1 className="text-2xl font-bold">
                    영화 정보를 불러올 수 없어요.
                </h1>

                <p className="text-sm text-red-500">
                    {getMovieDetailErrorMessage(movieDetailQuery.error)}
                </p>

                <Link to="/" className="text-blue-600 hover:underline">
                    영화 목록으로 돌아가기
                </Link>
            </main>
        );
    }

    // API 응답 데이터
    const movie = movieDetailQuery.data;
   

    // TMDB 이미지 경로 변환
    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : undefined;

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : undefined;

    const genres = movie.genres
        .map((genre) => genre.name)
        .join(", ");

    const runtime = movie.runtime !== null
        ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`
            : "상영 시간 정보가 없어요.";

   
    return (
        <main className="min-h-screen bg-[#F7F8FA] text-gray-900">
            {/* 상단 배경 이미지 */}
            <section className="relative h-[240px] overflow-hidden md:h-[360px]">
                <img
                    src={backdropUrl}
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
                        {movie.original_title}
                    </p>
                    <BookmarkButton movieId={movie.id} />

                    {accessToken && (
                        favoriteStatusQuery.isPending ? (
                            <p className="text-sm text-gray-300">
                                 즐겨찾기 확인 중...
                            </p>
                    ) : favoriteStatusQuery.isError ? (
                             <p className="text-sm text-red-300">
                                즐겨찾기 상태를 불러오지 못했어요.
                             </p>
                    ) : (
                            <p className="text-sm text-gray-200">
                                 {favoriteStatusQuery.data.isFavorite
                                    ? "즐겨찾기 등록됨"
                                    : "즐겨찾기 미등록"}
                            </p>
                    )
                )}

                    <p className="mt-2 text-sm text-gray-200">
                        {movie.release_date} · {genres} · {runtime}
                    </p>
                    
                </div>
            </section>

            {/* 하단 영화 정보 영역 */}
            <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-6 md:px-10 lg:flex-row lg:px-20">
                {/* 왼쪽: 포스터와 줄거리 */}
                <div className="flex min-w-0 flex-1 flex-col gap-6 sm:flex-row">
                    <img
                        src={posterUrl}
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
                    <div className="mb-4 flex gap-2 text-2xl">
                        {[1, 2, 3, 4, 5].map((star) => (
                     <button
                         key={star}
                        type="button"
                        onClick={() => setScore(star)}
                         aria-label={`${star}점`}
                        aria-pressed={score === star}
                        className={
                                star <= score
                                     ? "text-yellow-400"
                                    : "text-gray-400"
                        }
                            >
                                ★
                             </button>
                        ))}
                    </div>

                    {/* 감상평 입력 */}
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        maxLength={500}
                        placeholder="영화에 대한 감상을 남겨주세요."
                        className="h-28 w-full resize-none rounded-lg border border-gray-200 bg-white p-3 text-sm outline-none focus:border-blue-500"
                    />

                    {/* 저장 버튼 */}
                    {/* <button
                        type="button"
                        onClick={() => saveRatingMutation.mutate()}
                        disabled={!canSaveRating}
                        className="mt-3 w-full rounded-md bg-gray-900 py-3 text-sm font-medium text-white hover:bg-gray-800"
                    >
                        {saveRatingMutation.isPending
                            ? "저장 중..."
                            : myRating
                                ? "평점 수정"
                                : "평점 등록"}
                    </button> */}
                    <Footer/>
                </aside>
            </section>
        </main>
    );
}
