import React from 'react';
import './Header.css';

function Header({ onToggleSidebar }) {
  return (
    <header className="header">
      <div className="left">
        <h1 className="title">AdminPanel</h1>
        {/* <button className="hamburger" onClick={onToggleSidebar} aria-label="Toggle Sidebar">
          &#9776; 
        </button> */}
      </div>
      <div className="right">
        <button className="btn login-btn">Login</button>
        <button className="btn profile-btn">Profile</button>
      </div>
    </header>
  );
}

export default Header;
