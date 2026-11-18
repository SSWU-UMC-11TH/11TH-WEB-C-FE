import { useNavigate } from "@tanstack/react-router";
import { FiUser } from "react-icons/fi";

const MOCK_FAVORITES = [
  {
    id: 1,
    title: "스파이더맨: 브랜드 뉴 데이",
    date: "2026.07.29",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZvMj_YYELXN4av8Fnv2r2AeCwqHVFUKsmHZsnQqmUBg&s=10   ",
  },
  {
    id: 2,
    title: "오디세이",
    date: "2026.08.05",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8uhUGZwdiQvyu9pwWrJQOIyf7ljRx-pV9ZqLgyvOHBQ&s=10",
  },
  {
    id: 3,
    title: "미니언즈 & 몬스터즈",
    date: "2026.07.15",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2guJHmZOswUhH0qH2UryduMnRYzTOJniWLEKJnHAOIg&s=10",
  },
];

export function MyPage() {
  const navigate = useNavigate();

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
                <span className="font-bold text-gray-900 text-sm">loki_11th</span>
              </div>
              <div>
                <span className="block text-gray-400 mb-1">이메일</span>
                <span className="font-bold text-gray-900 text-sm">
                  seoyoung@cinemalab.kr
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 내 즐겨찾기 섹션 */}
        <section className="pt-8 space-y-4">
          <h2 className="text-xs font-semibold text-gray-700">내 즐겨찾기</h2>

          {/* 카드 배치 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {MOCK_FAVORITES.map((movie) => (
              <div key={movie.id} className="flex flex-col items-start w-full group cursor-pointer">
                <div className="relative w-full aspect-[1/1.05] rounded-[12px] overflow-hidden bg-[#e5e7eb] shadow-sm">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="mt-2 space-y-0.5">
                  <h3 className="font-semibold text-xs text-gray-900 truncate">
                    {movie.title}
                  </h3>
                  <p className="text-[11px] text-gray-400">{movie.date}</p>
                </div>
              </div>
            ))}
          </div>

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