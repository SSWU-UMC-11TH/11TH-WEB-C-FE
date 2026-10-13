export default function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <h1>UMCine</h1>

                <nav>
                    <a href="#">영화</a>
                    <a href="#">장르</a>
                    <a href="#">내 서재</a>
                </nav>
            </div>

            <div className="header-right">
                <button type="button">검색</button>
                <button type="button">로그아웃</button>
            </div>
        </header>
    );
}