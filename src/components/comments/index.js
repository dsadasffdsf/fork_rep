import React, { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import CommentsList from '../comments-list';
import useSelector from '../../hooks/use-selector';
import CommentsInputForm from '../comments-input-form';
import shallowequal from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';

function Comments({ comments, articleId }) {
  // console.log(articleId,"-----------------copasdsad");

  const [replyingToCommentId, setReplyingToCommentId] = useState(null);

  const handleReply = commentId => {
    setReplyingToCommentId(commentId);
  };

  return (
    <div className="Comments-wrapper">
      <div className="Comments-total">Комментарии ({comments ? comments.count : '0'})</div>

      <CommentsList
        commentsList={comments.items}
        onReply={handleReply}
        replyingToCommentId={replyingToCommentId}
      />
      {replyingToCommentId === null && (
        <CommentsInputForm
          title={'Новый комментарий'}
          parentId={articleId}
          fetch={commentsActions.addNewComment}
        />
      )}
    </div>
  );
}

export default Comments;
