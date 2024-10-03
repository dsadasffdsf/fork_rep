import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

function NavMenu({ onNavigate, btnTitle, username }) {
  return (
    <div className="Nav-menu">
      {username && (
        <Link className="Nav-menu-username" to="/profile">
          {username}
        </Link>
      )}
      <button className="Nav-menu-btn" onClick={() => onNavigate()}>
        {btnTitle}
      </button>
    </div>
  );
}

export default NavMenu;
