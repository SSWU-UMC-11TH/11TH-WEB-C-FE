import { useNavigate } from "@tanstack/react-router";
import { useQuery, useQueries } from "@tanstack/react-query"; 
import { FiUser } from "react-icons/fi";
import { getMe } from "../../api/members/me";
import { getFavorites } from "../../api/favorites/get-favorites"; 
import { getMovieDetail } from "../../api/movies/get-movie-detail"; 
import { useAuthStore } from "../../stores/auth-store";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; 
export function MyPage() {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);

  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    retry: false,
  });

  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    enabled: Boolean(accessToken),
  });

  const favorites = favoritesQuery.data ?? [];

  const movieQueries = useQueries({
    queries: favorites.map((fav) => ({
      queryKey: ["movies", "detail", fav.movieId],
      queryFn: () => getMovieDetail(fav.movieId),
    })),
  });

  const handleGoToEdit = () => {
    navigate({ to: "/my/edit" });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f4f5f7] flex flex-col justify-between">
      {/* 메인 콘텐츠 영역 */}
      <div className="max-w-[1080px] w-full mx-auto px-[20px] py-10 flex-1">
        {/* 헤더 섹션 (내 정보 & 정보 수정) */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">내 정보</h1>
          <button
            onClick={handleGoToEdit}
            className="px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-[600] rounded-lg transition-colors cursor-pointer"
          >
            정보 수정
          </button>
        </div>

        {/* 기본 정보 섹션 */}
        <section className="pt-6 pb-8 border-b border-gray-200">
          <h2 className="text-xs font-semibold text-gray-700 mb-4">기본 정보</h2>
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
              <FiUser className="w-7 h-7 text-gray-500" />
            </div>

            <div className="flex gap-16 text-xs">
              <div>
                <span className="block text-gray-400 mb-1">닉네임</span>
                <span className="font-bold text-gray-900 text-sm">
                  {meQuery.isLoading ? "불러오는 중..." : (meQuery.data?.nickname ?? "-")}
                </span>
              </div>
              <div>
                <span className="block text-gray-400 mb-1">이메일</span>
                <span className="font-bold text-gray-900 text-sm">
                  {meQuery.isLoading ? "불러오는 중..." : (meQuery.data?.email ?? "-")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 내 즐겨찾기 섹션 */}
        <section className="pt-8 space-y-4">
          <h2 className="text-xs font-semibold text-gray-700">내 즐겨찾기</h2>

          {/* 즐겨찾기 영화 카드 렌더링 */}
          {favoritesQuery.isLoading ? (
            <p className="text-xs text-gray-400 py-8 text-center">
              즐겨찾기 목록을 불러오는 중...
            </p>
          ) : favorites.length === 0 ? (
            <p className="text-xs text-gray-400 py-8 text-center">
              즐겨찾기한 영화가 없습니다.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {favorites.map((fav, index) => {
                const movie = movieQueries[index]?.data;
                const posterUrl = movie?.poster_path
                  ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
                  : "";

                return (
                  <div
                    key={fav.favoriteId}
                    onClick={() =>
                      navigate({
                        to: "/movies/$movieId",
                        params: { movieId: String(fav.movieId) },
                      })
                    }
                    className="flex flex-col items-start w-full group cursor-pointer"
                  >
                    <div className="relative w-full aspect-[1/1.05] rounded-[12px] overflow-hidden bg-[#e5e7eb] shadow-sm">
                      {posterUrl && (
                        <img
                          src={posterUrl}
                          alt={movie?.title ?? "영화 포스터"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      )}
                    </div>
                    <div className="mt-2 space-y-0.5 w-full">
                      <h3 className="font-semibold text-xs text-gray-900 truncate">
                        {movie?.title ?? `영화 #${fav.movieId}`}
                      </h3>
                      <p className="text-[11px] text-gray-400">
                        {movie?.release_date?.replaceAll("-", ".") ?? ""}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 페이지네이션 (< 1 >) */}
          <div className="flex justify-center items-center gap-2 pt-8">
            <button
              disabled
              className="w-6 h-6 flex items-center justify-center text-gray-300 cursor-not-allowed text-xs"
            >
              &lt;
            </button>
            <button className="w-6 h-6 flex items-center justify-center bg-gray-900 text-white rounded text-[11px] font-semibold">
              1
            </button>
            <button
              disabled
              className="w-6 h-6 flex items-center justify-center text-gray-300 cursor-not-allowed text-xs"
            >
              &gt;
            </button>
          </div>
        </section>
      </div>

      {/* 푸터 영역 */}
      <footer className="w-full border-t border-[#e5e7eb] bg-white py-[16px] mt-10">
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