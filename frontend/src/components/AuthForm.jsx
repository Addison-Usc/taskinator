import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

function AuthForm({ mode }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = mode === 'login' ? '/api/login' : '/api/register';
    const body = mode === 'login'
      ? { email: form.email, password: form.password }
      : form;

    const res = await fetch(`http://localhost:3001${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    alert(data.message || data.error);

    if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    }
  };

  return (
  <>
    <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
    <form onSubmit={handleSubmit}>
      {mode === 'register' && (
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
      )}
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <button type="submit">
        {mode === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  </>
);
}

export default AuthForm;
