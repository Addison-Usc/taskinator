/**
 * Author: Addison Uscinowicz
 * -- Allows users to view and update their account info.
 */

import React, { useEffect, useState } from 'react';
import '../components/AuthForm.css';

function AccountPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('http://localhost:3001/api/protected', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await res.json();
      if (data.user) {
        setForm({ username: data.user.username, email: data.user.email, password: '' }); 
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/api/users/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="auth-container">
      <h2>Edit Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="New Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="New Password (leave blank to keep the same)"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Save Changes</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AccountPage;
