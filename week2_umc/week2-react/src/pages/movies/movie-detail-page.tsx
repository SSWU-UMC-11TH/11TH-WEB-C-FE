import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BookmarkButton } from "../../components/bookmark-button";
import { getTmdbPosterUrl, getTmdbBackdropUrl } from "../../utils/movies/tmdb-image";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import { useAuthStore } from "../../stores/auth-store";
import { getMemberIdFromToken } from "../../utils/auth/get-member-id-from-token";
import { getMemberRatings } from "../../api/ratings/get-member-ratings";
import { createRating } from "../../api/ratings/create-rating";
import { updateRating } from "../../api/ratings/update-rating";
import { deleteRating } from "../../api/ratings/delete-rating";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const accessToken = useAuthStore((state) => state.accessToken);
  const memberId = getMemberIdFromToken(accessToken);

  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  // 1. 영화 상세 데이터 요청
  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", parsedMovieId],
    queryFn: () => getMovieDetail(parsedMovieId),
    enabled: isValidMovieId,
  });

  // 2. 내 평점 목록 조회 후 현재 영화의 내 평점 찾기
  const memberRatingsQuery = useQuery({
    queryKey: ["ratings", "member", memberId],
    queryFn: () => getMemberRatings(memberId!),
    enabled: Boolean(memberId) && isValidMovieId,
  });

  const existingRating = memberRatingsQuery.data?.find(
    (item) => item.movieId === parsedMovieId
  );

  // 평점 및 후기 입력 상태
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  // 서버에서 기존 평점을 불러오면 입력 폼에 초기값 반영
  useEffect(() => {
    if (existingRating) {
      setRating(existingRating.score);
      setReview(existingRating.comment ?? "");
    } else {
      setRating(0);
      setReview("");
    }
  }, [existingRating]);

  // 3. 평점 등록 / 수정 뮤테이션
  const saveRatingMutation = useMutation({
    mutationFn: async () => {
      if (existingRating) {
        return updateRating(existingRating.ratingId, {
          score: rating,
          comment: review,
        });
      }
      return createRating({
        movieId: parsedMovieId,
        score: rating,
        comment: review,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings", "member", memberId] });
      alert(existingRating ? "평점이 수정되었습니다." : "평점이 등록되었습니다.");
    },
    onError: () => {
      alert("평점 저장에 실패했습니다. 다시 시도해 주세요.");
    },
  });

  // 4. 평점 삭제 뮤테이션
  const deleteRatingMutation = useMutation({
    mutationFn: () => deleteRating(existingRating!.ratingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ratings", "member", memberId] });
      setRating(0);
      setReview("");
      alert("평점이 삭제되었습니다.");
    },
    onError: () => {
      alert("평점 삭제에 실패했습니다. 다시 시도해 주세요.");
    },
  });

  const handleSaveReview = () => {
    if (!memberId) {
      if (confirm("로그인이 필요한 기능입니다. 로그인 페이지로 이동할까요?")) {
        navigate({ to: "/login" });
      }
      return;
    }
    if (rating === 0) {
      alert("별점을 선택해 주세요!");
      return;
    }
    saveRatingMutation.mutate();
  };

  const handleDeleteReview = () => {
    if (!existingRating) return;
    if (confirm("작성한 평점을 삭제할까요?")) {
      deleteRatingMutation.mutate();
    }
  };

  // 잘못된 영화 번호 처리
  if (!isValidMovieId) {
    return (
      <div className="w-full min-h-screen bg-[#f4f5f7] flex items-center justify-center">
        <main className="text-center py-[60px]">
          <h2 className="text-[18px] font-[700] text-[#111]">
            올바르지 않은 영화 번호예요.
          </h2>
          <Link
            to="/"
            className="text-[13px] text-[#2563eb] underline mt-[12px] inline-block"
          >
            영화 목록으로 돌아가기
          </Link>
        </main>
      </div>
    );
  }

  // 로딩 상태 UI
  if (movieDetailQuery.isPending) {
    return (
      <div className="w-full min-h-screen bg-[#f4f5f7] flex items-center justify-center">
        <div className="text-center py-[60px] text-[#6b7280]">
          영화를 불러오는 중입니다...
        </div>
      </div>
    );
  }

  // 에러 상태 또는 데이터가 없는 경우 UI
  if (movieDetailQuery.isError || !movieDetailQuery.data) {
    return (
      <div className="w-full min-h-screen bg-[#f4f5f7] flex items-center justify-center">
        <main className="text-center py-[60px]">
          <h2 className="text-[18px] font-[700] text-[#111]">
            {movieDetailQuery.isError
              ? getMovieDetailErrorMessage(movieDetailQuery.error)
              : "영화를 찾을 수 없어요."}
          </h2>
          <Link
            to="/"
            className="text-[13px] text-[#2563eb] underline mt-[12px] inline-block"
          >
            영화 목록으로 돌아가기
          </Link>
        </main>
      </div>
    );
  }

  const movie = movieDetailQuery.data;

  const formattedRuntime = movie.runtime
    ? (() => {
        const hours = Math.floor(movie.runtime / 60);
        const minutes = movie.runtime % 60;
        return hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
      })()
    : "상영 시간 정보가 없어요.";

  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const isSubmitting =
    saveRatingMutation.isPending || deleteRatingMutation.isPending;

  return (
    <div className="w-full min-h-screen bg-[#f4f5f7] font-sans text-[#111] flex flex-col justify-between">
      <div>
        {/* 상단 배경 영역 */}
        <section className="relative w-full h-[360px] bg-black text-white overflow-hidden">
          {backdropUrl && (
            <img
              src={backdropUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

          <div className="relative max-w-[1080px] mx-auto h-full px-[20px] py-[20px] flex flex-col justify-between box-border">
            <Link
              to="/"
              className="text-[13px] text-[#e5e7eb] hover:text-white no-underline flex items-center gap-[4px] w-fit"
            >
              &lt; 영화 목록
            </Link>

            <div className="mb-[10px]">
              <h1 className="text-[32px] font-[800] text-white mb-[8px] leading-tight">
                {movie.title}
              </h1>
              <p className="text-[13px] text-[#d1d5db] mb-[6px]">
                {movie.original_title}
              </p>
              <p className="text-[12px] text-[#9ca3af]">
                {movie.release_date}{" "}
                {movie.genres.map((g) => g.name).join(" · ")} ·{" "}
                {formattedRuntime}
              </p>
            </div>
          </div>
        </section>

        {/* 본문 상세 정보 및 내 평점 영역 */}
        <main className="max-w-[1080px] mx-auto px-[20px] py-[32px] box-border">
          <div className="flex flex-col lg:flex-row gap-[32px] items-start justify-between">
            {/* 왼쪽: 포스터 & 개요 */}
            <div className="flex flex-col md:flex-row gap-[28px] items-start flex-1">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={`${movie.title} 포스터`}
                  className="w-[180px] h-[260px] object-cover rounded-[12px] shadow-md shrink-0"
                />
              ) : (
                <div className="w-[180px] h-[260px] bg-[#e5e7eb] rounded-[12px] shadow-md shrink-0 flex items-center justify-center text-[12px] text-[#9ca3af]">
                  이미지 없음
                </div>
              )}

              <div className="flex flex-col justify-start gap-[12px] flex-1">
                {movie.tagline && (
                  <h2 className="text-[18px] font-[700] text-[#111111]">
                    {movie.tagline}
                  </h2>
                )}
                <p className="text-[13px] text-[#4b5563] leading-relaxed max-w-[500px]">
                  {movie.overview}
                </p>

                <div className="mt-[16px]">
                  <BookmarkButton movieId={movie.id} variant="detail" />
                </div>
              </div>
            </div>

            {/* 내 평점 섹션 */}
            <div className="w-full lg:w-[320px] shrink-0 border-t lg:border-t-0 lg:border-l border-[#e5e7eb] pt-[24px] lg:pt-0 lg:pl-[32px]">
              <h2 className="text-[18px] font-[700] text-[#111111]">
                내 평점
              </h2>
              <p className="text-[11px] text-[#94979c] mb-[10px]">
                별점은 필수, 후기는 선택이에요.
              </p>

              {/* 별점 선택 카드 */}
              <div className="flex items-center justify-start gap-[4px] mb-[8px]">
                {[1, 2, 3, 4, 5].map((star) => {
                  const activeRating = hoverRating || rating;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="w-[35px] h-[35px] flex items-center justify-center bg-white border border-[#e5e7eb] rounded-[10px] transition-colors hover:border-[#2563eb] active:scale-95 cursor-pointer"
                    >
                      <svg
                        width="23"
                        height="23"
                        viewBox="0 0 24 24"
                        fill={activeRating >= star ? "#2563eb" : "#464749"}
                        className="transition-colors duration-150"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </button>
                  );
                })}
              </div>

              {/* 후기 입력 창 */}
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="영화를 보고 느낀 점을 남겨보세요."
                className="w-full h-[100px] p-[12px] text-[12px] bg-white border border-[#e5e7eb] rounded-[10px] resize-none focus:outline-none focus:border-[#2563eb] placeholder:text-[#9ca3af] box-border mb-[12px]"
              />

              {/* 저장 / 수정 / 삭제 버튼 */}
              <div className="flex items-center gap-[8px]">
                <button
                  type="button"
                  onClick={handleSaveReview}
                  disabled={isSubmitting}
                  className="flex-1 py-[12px] bg-[#1e293b] hover:bg-[#0f172a] text-white text-[13px] font-[600] rounded-[10px] transition-colors active:scale-95 cursor-pointer disabled:opacity-60"
                >
                  {existingRating ? "평점 수정" : "평점 저장"}
                </button>

                {existingRating && (
                  <button
                    type="button"
                    onClick={handleDeleteReview}
                    disabled={isSubmitting}
                    className="px-[16px] py-[12px] bg-white hover:bg-[#fef2f2] text-[#dc2626] border border-[#fecaca] text-[13px] font-[600] rounded-[10px] transition-colors active:scale-95 cursor-pointer disabled:opacity-60"
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 푸터 영역 */}
      <footer className="w-full border-t border-[#e5e7eb] bg-white py-[16px] mt-[40px]">
        <div className="max-w-[1080px] mx-auto px-[20px] flex items-center justify-end gap-[8px] text-[11px] text-[#6b7280]">
          <img
            src="/icons/tmdb-logo.svg"
            alt="TMDB Logo"
            className="h-[12px] object-contain"
          />
          <span>
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </span>
        </div>
      </footer>
    </div>
  );
}