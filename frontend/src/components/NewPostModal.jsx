// src/components/NewPostModal.jsx
import React, { useState, useEffect, useRef } from "react";
import "./NewPostModal.css";

const NewPostModal = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const fileInputRef = useRef(null); // ref 선언

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setStep(2);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setStep(2);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handlePost = () => {
    if (!text.trim()) return;
    onSubmit({ text, image });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="newpost-box">
        <div className="newpost-header">
          <span>새 게시물 만들기</span>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        {step === 1 && (
          <div
            className="newpost-dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p>사진과 동영상을 여기에 끌어다 놓으세요</p>
            <label className="select-btn">
              컴퓨터에서 선택
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}

        {step === 2 && image && (
          <div className="newpost-preview">
            <img src={URL.createObjectURL(image)} alt="preview" />
            <button onClick={() => setStep(3)} className="next-btn">다음</button>
          </div>
        )}

        {step === 3 && image && (
          <div className="newpost-write">
            <div className="write-image">
              <img src={URL.createObjectURL(image)} alt="preview" />
            </div>
            <textarea
              placeholder="문구 입력..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="submit-btn"
              onClick={handlePost}
              disabled={!text.trim()}
            >
              공유하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPostModal;
