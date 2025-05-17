import React from 'react';
import AuthForm from '../components/AuthForm';
import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <div>
      <h2>Create Account</h2>
      <AuthForm mode="register" />
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
