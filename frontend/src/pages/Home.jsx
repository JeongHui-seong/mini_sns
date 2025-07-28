// Home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPen } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";
import CommentModal from "../components/CommentModal";
import NewPostModal from "../components/NewPostModal";
import "./Home.css";

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
  }
];

const Home = () => {
  
  const loggedInUser = {
    // name: "안정민",
    followerList: ["혜미", "정다은", "혜삔"],
    followingList: ["혜미", "정다은", "혜삔"],
    posts: 10
  };

  const [user, setUser] = useState(loggedInUser);
  const [activeTab, setActiveTab] = useState("posts");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const filteredPosts = allPosts.filter((post) =>
    user.followingList.includes(post.user)
  );

  const [posts, setPosts] = useState(filteredPosts);
  const [commentInput, setCommentInput] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(null);


  const selectedPost = posts.find((post) => post.id === selectedPostId);

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
    if (!input || !user) return;

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: Date.now(), user: user.name, text: input },
              ],
            }
          : post
      )
    );
    setCommentInput((prev) => ({ ...prev, [postId]: "" }));
  };

  const handlePostSubmit = ({ text, file }) => {
    if (!user) return;

    const newPost = {
      id: Date.now(),
      user: user.name,
      date: new Date().toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
      img: file ? URL.createObjectURL(file) : "",
      liked: false,
      likeCount: 0,
      text,
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  useEffect(() => {
    axios.get("/api/board")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("게시물 로드 실패:", error);
      });
  }, []);

  useEffect(() => {
    axios.get("/api/member/me")
      .then((response) => {
        setUser({
          name: response.data.nickname,
          followersList: [],
          followingList: [],
          posts: 0
        });
      })
      .catch((error) => {
        console.error("사용자 정보 로드 실패:", error);
      });
  }, []);

  return (
    <div className="app-wrapper">
      <Sidebar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="home-container">
        <div className="feed">
          <div
            className="today-mood-box"
            onClick={() => setIsPostModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsPostModalOpen(true);
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

      {selectedPost && (
        <CommentModal
          post={selectedPost}
          onClose={handleCloseModal}
          toggleLike={toggleLike}
          commentInput={commentInput}
          handleCommentChange={handleCommentChange}
          handleCommentSubmit={handleCommentSubmit}
        />
      )}

      {isPostModalOpen && (
        <NewPostModal
          onClose={() => setIsPostModalOpen(false)}
          onSubmit={handlePostSubmit}
        />
      )}
    </div>
  );
};

export default Home;