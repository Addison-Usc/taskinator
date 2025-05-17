import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This cannot be undone.');
    if (!confirmed) return;

    try {
      const res = await fetch('http://localhost:3001/api/users/me', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();
      alert(data.message || data.error);
      localStorage.removeItem('token');
      navigate('/register');
    } catch (err) {
      alert('Error deleting account.');
      console.error(err);
    }
  };

  const handleThemeChange = () => {
    console.log('Theme change clicked');
  };

  return (
    <header className="header">
      <div className="header-container">
        <span className="header-title">Taskinator</span>
        <nav className="header-nav">
          <Link to="/dashboard">Dashboard</Link>
          {token ? (
            <div className="dropdown-wrapper">
              <Link to="/account">Account</Link>
              <span className="gear" onClick={() => setDropdownOpen(!dropdownOpen)}>⚙️</span>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleThemeChange}>Change Theme</button>
                  <button onClick={handleLogout}>Logout</button>
                  <button onClick={handleDeleteAccount}>Delete Account</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">Login / Register</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
