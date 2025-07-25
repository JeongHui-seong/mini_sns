import React, { useState } from "react";
import { FaThLarge, FaBell, FaPen } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";
import CommentModal from "../components/CommentModal";
import "./Home.css";

const loggedInUser = {
  name: "안정민",
  followers: 26,
  following: 26,
  posts: 10,
  followerList: ["혜미", "정다은", "혜삔"],
  followingList: ["혜미", "정다은", "혜삔"],
};

const allPosts = [
  {
    id: 1,
    user: "혜미",
    date: "2025년 7월 21일 8시 10분",
    img: "/src/assets/img/KakaoTalk_20250720_235020213.jpg",
    liked: true,
    likeCount: 2195,
    text:
      "#버거킹(Burger King)이 닌자를 위한 버거를 제조하기 위해 주간 소년 점프에 연재된 닌자 무협 만화 #나루토(NARUTO)와 협업해 나루토 킹 주니어 밀을 일부 아시아 지역에 출시했습니다....",
    comments: [
      { id: 1, user: "안정민", text: "정말 멋진 협업이네요!" },
      { id: 2, user: "혜삔", text: "맛있어 보여요~" },
    ],
  },
  {
    id: 2,
    user: "혜삔",
    date: "2025년 7월 20일 10시 15분",
    img: "/src/assets/img/KakaoTalk_20250720_235014657.jpg",
    liked: false,
    likeCount: 1,
    text: "ㅋ! 💪",
    comments: [],
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const filteredPosts = allPosts.filter((post) =>
    loggedInUser.followingList.includes(post.user)
  );
  const [posts, setPosts] = useState(filteredPosts);
  const [commentInput, setCommentInput] = useState({});

  // 수정: selectedPostId로 변경
  const [selectedPostId, setSelectedPostId] = useState(null);

  // 최신 상태의 post 객체를 찾음
  const selectedPost = posts.find((post) => post.id === selectedPostId);

  // 모달 열 때 post 객체가 아닌 post id만 저장
  const handleOpenModal = (post) => {
    setSelectedPostId(post.id);
  };

  const handleCloseModal = () => {
    setSelectedPostId(null);
  };

  const toggleLike = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1,
            }
          : post
      )
    );
  };

  const handleCommentChange = (postId, value) => {
    setCommentInput((prev) => ({ ...prev, [postId]: value }));
  };

  const handleCommentSubmit = (postId) => {
    const input = commentInput[postId]?.trim();
    if (!input) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: Date.now(), user: loggedInUser.name, text: input },
              ],
            }
          : post
      )
    );

    setCommentInput((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <div className="app-wrapper">
      <Sidebar
        user={loggedInUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasPosts={posts.length > 0}
      />

      <main className="home-container">
        <div className="feed">
          <div
            className="today-mood-box"
            onClick={() => alert("글쓰기 창을 여세요!")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") alert("글쓰기 창을 여세요!");
            }}
          >
            <input
              type="text"
              className="mood-input"
              placeholder="오늘의 기분은 어떠신가요? 공유해보세요."
              readOnly
            />
            <FaPen className="mood-pen-icon" />
          </div>

          {posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                toggleLike={toggleLike}
                commentInput={commentInput}
                handleCommentChange={handleCommentChange}
                handleCommentSubmit={handleCommentSubmit}
                openCommentModal={handleOpenModal}
              />
            ))
          ) : (
            <div className="empty-message">게시물이 없습니다.</div>
          )}
        </div>
      </main>

      {/* 모달에 toggleLike 함수 넘김 */}
      {selectedPost && (
        <CommentModal
          post={selectedPost}
          onClose={handleCloseModal}
          toggleLike={toggleLike}
        />
      )}
    </div>
  );
};

export default Home;
