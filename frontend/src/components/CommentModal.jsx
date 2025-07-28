import React from "react";
import "./CommentModal.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CommentModal = ({ post, onClose, toggleLike, commentInput, handleCommentChange, handleCommentSubmit}) => {
  if (!post) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-left">
          <img src={post.img} alt="post" className="modal-post-image" />
        </div>

        <div className="modal-right">
          <div className="modal-header">
            <div className="modal-user-info">
              <div className="modal-profile-pic" />
              <div>
                <strong>{post.user}</strong>
                <p className="modal-date">{post.date}</p>
              </div>
            </div>
          </div>

          <div className="modal-content-text">
            <p>{post.text}</p>
          </div>

          <div className="modal-like-section">
            <span
              className="modal-like-icon"
              onClick={() => toggleLike(post.id)}
              style={{ cursor: "pointer" }}
            >
              {post.liked ? (
                <FaHeart color="red" />
              ) : (
                <FaRegHeart />
              )}
            </span>
            <span className="modal-like-count">
              좋아요 {post.likeCount.toLocaleString()}개
            </span>
          </div>

          <hr className="modal-divider" />

          <div className="modal-comments-area">
            {post.comments.map((comment) => (
              <div key={comment.id} className="modal-comment">
                <div className="modal-profile-pic" />
                <div>
                  <strong>{comment.user}</strong>
                  <p className="modal-comment-date">2025년 7월 24일 10시 5분</p>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="modal-comment-input">
          <input
            type="text"
            placeholder="댓글 달기..."
            value={commentInput[post.id] || ""}
            onChange={(e) => handleCommentChange(post.id, e.target.value)}
          />
          <button
            onClick={() => handleCommentSubmit(post.id)}
            disabled={!commentInput[post.id]?.trim()}
          >
            게시
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
