import React from 'react';
import AuthForm from '../components/AuthForm';
import { Link } from 'react-router-dom';
import '../components/AuthForm.css';

function RegisterPage() {
  return (
    <>
      <div className="auth-container">
        <AuthForm mode="register" />
      </div>
      <p className="auth-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </>
  );
}


export default RegisterPage;
