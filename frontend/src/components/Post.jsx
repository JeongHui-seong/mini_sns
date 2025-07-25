import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";

const Post = ({
  post,
  toggleLike,
  commentInput,
  handleCommentChange,
  handleCommentSubmit,
  openCommentModal
}) => {
  const [showFullText, setShowFullText] = useState(false);
  const isLongText = post.text.length > 80;
  const displayedText =
    showFullText || !isLongText ? post.text : post.text.slice(0, 80) + "...";

  return (
    <div className="post-card">
      <div className="post-header-with-pic">
        <div className="post-profile-pic" />
        <div className="post-user-info">
          <strong className="post-user-name">{post.user}</strong>
          <span className="post-date">{post.date}</span>
        </div>
      </div>

      <img src={post.img} alt="게시물 이미지" className="post-image" />

      <div className="post-actions">
        <span
          onClick={() => toggleLike(post.id)}
          style={{ cursor: "pointer" }}
          aria-label="좋아요 버튼"
        >
          {post.liked ? <FaHeart color="red" /> : <FaRegHeart color="black" />}
        </span>
        <span style={{ cursor: "pointer", marginLeft: "10px" }} aria-label="댓글 버튼">
          <FaRegComment />
        </span>
      </div>

      <div className="like-count">좋아요 {post.likeCount.toLocaleString()}개</div>

      <div className="post-text">
        <strong>{post.user}</strong> {displayedText}
        {isLongText && (
          <button
            className="more-button"
            onClick={() => setShowFullText(!showFullText)}
            aria-label="더보기 버튼"
          >
            {showFullText ? "접기" : "더 보기"}
          </button>
        )}
      </div>

      <div
        className="comments-count"
        style={{ cursor: "pointer", color: "#555" }}
        onClick={() => openCommentModal(post)}
      >
        댓글 {post.comments.length}개 모두 보기
      </div>

      <div className="comment-section">
        <input
          type="text"
          placeholder="댓글 달기..."
          className="comment-input"
          value={commentInput[post.id] || ""}
          onChange={(e) => handleCommentChange(post.id, e.target.value)}
        />
        <button
          className="comment-button"
          onClick={() => handleCommentSubmit(post.id)}
          disabled={!commentInput[post.id]?.trim()}
        >
          게시
        </button>
      </div>
    </div>
  );
};

export default Post;
