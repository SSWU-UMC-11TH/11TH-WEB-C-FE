import { Link } from "@tanstack/react-router";

export function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <h1>UMCine</h1>

                <nav>
                    <Link to="/">영화</Link>
                    <a href="#">장르</a>
                    <a href="#">내 서재</a>
                </nav>
            </div>

            <div className="header-right">
                <Link to="/search">검색</Link>
                <button type="button">로그아웃</button>
            </div>
        </header>
    );
}