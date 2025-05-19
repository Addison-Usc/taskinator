/**
 * Author: Addison Uscinowicz
 * -- Login page that renders the AuthForm in login mode, provides register page link.
 */

import React from 'react';
import AuthForm from '../components/AuthForm';
import { Link } from 'react-router-dom';
import '../components/AuthForm.css';

function LoginPage() {
  return (
    <>
      <div className="auth-container">
        <AuthForm mode="login" />
      </div>
      <p className="auth-link">
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </>
  );
}

export default LoginPage;
