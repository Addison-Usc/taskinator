import React from 'react';
import AuthForm from '../components/AuthForm';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div>
      <h2>Login</h2>
      <AuthForm mode="login" />
      <p>
         Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
export default LoginPage;
