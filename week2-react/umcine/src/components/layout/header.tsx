import "./header.css";

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="header-logo">
            <span className="logo-box">
              <img src="/icons/logo-icon.svg" alt="" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
            </span>
            <span className="logo-text"><span className="logo-point">UMC</span>ine</span>
          </div>
          <nav className="header-nav">
            <button type="button" className="nav-item active">영화</button>
            <button type="button" className="nav-item">검색</button>
            <button type="button" className="nav-item">내 정보</button>
          </nav>
        </div>
        <div className="header-right">
          <button type="button" className="icon-search-btn" aria-label="검색">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button type="button" className="login-btn">로그인</button>
        </div>
      </div>
    </header>
  );
};