import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header style={{
            width: "100%",
            padding: "1rem",
            backgroundColor: "#f5f5f5",
            borderBottom: "1px solid #ccc",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <h2 style={{ margin: 0 }}>
                <Link to="/home" style={{ textDecoration: "none", color: "#333" }}>인스타톡</Link>
            </h2>
            <nav>
                <Link to="/home" style={{ marginRight: "1rem" }}>홈</Link>
                <Link to="/">로그아웃</Link> {/* 단순히 로그인 페이지로 이동 */}
            </nav>
        </header>
    );
};

export default Header;
