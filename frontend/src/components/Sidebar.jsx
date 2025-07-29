import React from "react";
import "../pages/Home.css";
import { FaThLarge, FaBell } from "react-icons/fa";

const Sidebar = ({ user, activeTab, setActiveTab, hasPosts }) => {
  // user가 없으면 로딩 상태 표시
  if (!user) {
    return (
      <div className="mypage-card">
        <div className="profile-section">
          <div className="profile-pic" />
          <h2 className="profile-name">로딩 중...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="mypage-card">
      <div className="profile-section">
        <div className="profile-pic" />
        <h2 className="profile-name">{user.name || '사용자'}</h2>
        <p className="profile-desc">안녕하세요 안녕하세요</p>

        <div className="profile-stats">
          <div>
            <strong>{user.followerList?.length || 0}</strong>
            <span>팔로워</span>
          </div>
          <div>
            <strong>{user.followingList?.length || 0}</strong>
            <span>팔로잉</span>
          </div>
          <div>
            <strong>{user.posts || 0}</strong>
            <span>게시물</span>
          </div>
        </div>

        <div className="tab-menu">
          <button
            className={activeTab === "posts" ? "active" : ""}
            onClick={() => setActiveTab("posts")}
          >
            <FaThLarge />
            <span>게시물</span>
          </button>
          <button
            className={activeTab === "notifications" ? "active" : ""}
            onClick={() => setActiveTab("notifications")}
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