import React from 'react';
import CommentsItem from '../comments-item';
import CommentsInputForm from '../comments-input-form';
import commentsActions from '../../store-redux/comments/actions';

function CommentsList({ commentsList, onReply, replyingToCommentId }) {
  const renderComments = comments => {
    return comments.map(comment => (
      <li style={{ listStyle: 'none' }} key={comment._id}>
        <CommentsItem comment={comment} onReply={onReply} />

        {replyingToCommentId === comment._id && (
          <CommentsInputForm
            title={'Новый ответ'}
            parentId={comment._id}
            fetch={commentsActions.addAnswerComment}
          />
        )}
        {comment.children && comment.children.length > 0 && (
          //рекурсия для создания эффекта вложенности
          <ul style={{ paddingLeft: '20px' }}>
            <CommentsList
              commentsList={comment.children}
              onReply={onReply}
              replyingToCommentId={replyingToCommentId}
            />
          </ul>
        )}
      </li>
    ));
  };

  return (
    <div>
      {commentsList && commentsList.length > 0 ? (
        <ul style={{ paddingLeft: '0px' }}>
          {renderComments(commentsList)} {/* Вызов рендеринга комментариев */}
        </ul>
      ) : (
        'Комментариев нет'
      )}
    </div>
  );
}

export default CommentsList;
