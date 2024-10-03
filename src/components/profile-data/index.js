import React from 'react';
import './style.css';

function ProfileData({ dto }) {
  const { phone, name, email } = dto;
  return (
    <div className="Profile-data">
      <h2>Профиль</h2>
      <p className="">
        Имя: <span className="Profile-data-label">{name}</span>
      </p>
      <p className="">
        Телефон: <span className="Profile-data-label">{phone}</span>
      </p>
      <p className="">
        email: <span className="Profile-data-label">{email}</span>
      </p>
    </div>
  );
}

export default ProfileData;
