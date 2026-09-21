export function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        {/* 왼쪽: 로고 및 내비게이션 메뉴 */}
        <div className="header-left">
          <div className="logo-text">UMCine</div>
          <nav className="nav-menu">
            <a href="#" className="nav-link active">영화</a>
            <a href="#" className="nav-link">검색</a>
            <a href="#" className="nav-link">내 정보</a>
          </nav>
        </div>

        {/* 오른쪽: 돋보기 아이콘 버튼 및 파란색 로그인 버튼 */}
        <div className="header-right">
          <button className="search-btn" type="button" aria-label="검색">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button className="login-btn" type="button">로그인</button>
        </div>
      </div>
    </header>
  );
}