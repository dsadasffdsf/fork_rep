import React from 'react';
import './style.css';

function CommentsItem({ comment, onReply }) {
  const { author, dateCreate, text } = comment;

  const handleReply = () => {
    // Вызываем функцию onReplyClick с ID комментария
    onReply(comment._id);
  };

  return (
    <div className="Comments-item">
      <div>
        <strong className="Comments-item-username">{author.profile.name}</strong>
        <span className="Comments-item-date">{new Date(dateCreate).toLocaleString()}</span>
      </div>
      <div className="Comments-item-data">{text}</div>
      <div
        className="Comments-item-answer"
        onClick={handleReply}
        style={{ cursor: 'pointer', color: 'blue' }}
      >
        Ответить
      </div>
    </div>
  );
}

export default CommentsItem;
