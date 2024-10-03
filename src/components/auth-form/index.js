import React, { useRef, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

function AuthForm({ fetch }) {
  const navigate = useNavigate();
  const login = useRef(null);
  const password = useRef(null);
  const [error, setError] = useState('');
  const submitHandler = async e => {
    e.preventDefault();
    console.log(login.current.value);
    console.log(password.current.value);
    const res = await fetch(login.current.value, password.current.value);
    console.log(res);
    if (res === 'ok') {
      navigate('/profile');
    } else {
      setError(res);
    }
  };

  return (
    <div>
      <form className="Auth-form" onSubmit={submitHandler}>
        <h2>Вход</h2>
        <p className="Auth-form-title-input">Логин</p>
        <input type="text" ref={login} />
        <p className="Auth-form-title-input">Пароль</p>
        <input type="text" ref={password} />
        <div className="Auth-form-error">{error}</div>
        <button className="Auth-form-btn" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
