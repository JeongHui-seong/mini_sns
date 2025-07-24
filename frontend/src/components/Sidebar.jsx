import React from "react";
import "../pages/Home.css"; // 스타일은 별도 파일에 정의해도 좋아요s
import { FaThLarge, FaBell } from "react-icons/fa";

const Sidebar = ({ user, activeTab, setActiveTab }) => {
  return (
    <div className="mypage-card">
      <div className="profile-section">
        <div className="profile-pic" />
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-desc">안녕하세요 안녕하세요</p>

        <div className="profile-stats">
          <div>
            <strong>{user.followers}</strong>
            <span>팔로워</span>
          </div>
          <div>
            <strong>{user.following}</strong>
            <span>팔로잉</span>
          </div>
          <div>
            <strong>{user.posts}</strong>
            <span>게시물</span>
          </div>
        </div>

        <div className="tab-menu">
          <button
            className={activeTab === "posts" ? "active" : ""}
            onClick={() => setActiveTab("posts")}
            aria-label="게시물 탭"
          >
            <FaThLarge />
            <span>게시물</span>
          </button>
          <button
            className={activeTab === "notifications" ? "active" : ""}
            onClick={() => setActiveTab("notifications")}
            aria-label="알림 탭"
          >
            <FaBell />
            <span>알림</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
