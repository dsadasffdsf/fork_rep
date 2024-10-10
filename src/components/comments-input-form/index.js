import React, { useState } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import shallowequal from 'shallowequal';
import { Link } from 'react-router-dom';

function CommentsInputForm({ title, parentId, fetch }) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const select = useSelector(
    state => ({
      exists: state.session.exists,
    }),
    shallowequal,
  );

  const submitHandler = e => {
    e.preventDefault();
    // console.log(fetch);

    dispatch(fetch({ commentData: text, id: parentId }));
    setText(''); // Очищаем текст после отправки
  };

  return (
    <>
      {select.exists ? (
        <div>
          <h5 style={{ fontSize: '12px' }}>{title}</h5>
          <form onSubmit={submitHandler}>
            <textarea
              type="text"
              className="comments-input-form-input"
              placeholder={'Текст'}
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <button>Отправить</button>
          </form>
        </div>
      ) : (
        <div className="Comments-link">
          <Link to={`/login`}>Войдите</Link>, чтобы иметь возможность комментировать
        </div>
      )}
    </>
  );
}

export default CommentsInputForm;
