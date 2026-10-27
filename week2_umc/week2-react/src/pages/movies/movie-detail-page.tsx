import { Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { movies } from "../../data/movies";
import { cn } from "../../utils/cn";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    movie?.isBookmarked ?? false
  );

  // 평점 및 후기 관련 상태 추가
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  if (!movie) {
    return (
      <div className="w-full min-h-screen bg-[#f4f5f7] flex items-center justify-center">
        <main className="text-center py-[60px]">
          <h2 className="text-[18px] font-[700] text-[#111]">
            영화를 찾을 수 없어요.
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

  const handleToggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const handleSaveReview = () => {
    if (rating === 0) {
      alert("별점을 선택해 주세요!");
      return;
    }
    alert(`평점이 저장되었습니다.\n별점: ${rating}점\n후기: ${review}`);
  };

  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const formattedRuntime =
    hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;

  return (
    <div className="w-full min-h-screen bg-[#f4f5f7] font-sans text-[#111] flex flex-col justify-between">
      <div>
        {/* 상단 배경 영역 */}
        <section className="relative w-full h-[360px] bg-black text-white overflow-hidden">
          {movie.backdropPath && (
            <img
              src={movie.backdropPath}
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
                {movie.originalTitle}
              </p>
              <p className="text-[12px] text-[#9ca3af]">
                {movie.releaseDate} {movie.genres.join(" · ")} {formattedRuntime}
              </p>
            </div>
          </div>
        </section>

        {/* 본문 상세 정보 및 내 평점 영역 */}
        <main className="max-w-[1080px] mx-auto px-[20px] py-[32px] box-border">
          <div className="flex flex-col lg:flex-row gap-[32px] items-start justify-between">
            {/* 왼쪽: 포스터 & 개요 */}
            <div className="flex flex-col md:flex-row gap-[28px] items-start flex-1">
              <img
                src={movie.posterPath}
                alt={`${movie.title} 포스터`}
                className="w-[180px] h-[260px] object-cover rounded-[12px] shadow-md shrink-0"
              />

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
                  <button
                    type="button"
                    onClick={handleToggleBookmark}
                    className={cn(
                      "inline-flex items-center gap-[8px] px-[18px] py-[10px] rounded-[10px] text-[13px] font-[600] cursor-pointer transition-all duration-200 ease-in-out shadow-sm active:scale-95 border",
                      isBookmarked
                        ? "bg-[#2563eb] hover:bg-[#1d4ed8] text-white border-[#1d4ed8]"
                        : "bg-white hover:bg-[#f9fafb] text-[#374151] border-[#e5e7eb]"
                    )}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={isBookmarked ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={cn(
                        "transition-colors duration-200",
                        isBookmarked ? "text-white" : "text-[#6b7280]"
                      )}
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>{isBookmarked ? "즐겨찾기 완료" : "즐겨찾기"}</span>
                  </button>
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
                  return(
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
                        fill={ activeRating >= star ? "#2563eb" : "#464749"}
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

              {/* 저장 버튼 */}
              <button
                type="button"
                onClick={handleSaveReview}
                className="w-full py-[12px] bg-[#1e293b] hover:bg-[#0f172a] text-white text-[13px] font-[600] rounded-[10px] transition-colors active:scale-95 cursor-pointer"
              >
                평점 저장
              </button>
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