import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../firebaseAuth'; 
import { Alert } from '@mui/material';

import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      alert('Log in successfully')
      navigate('/');
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No user found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/invalid-credential':
          setError('Invalid credentials.');
          break;
        default:
          setError(err.message);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <div className="right-overlay"></div> 
      <form className="login-form" onSubmit={handleLogin}>
        <div className="logo-container">
          <h1 className="company-name">Flavor Fusion</h1>
          <img src="/websitelogo.png" alt="Recipe App Logo" className="logo-image" />
        </div>
        <p className="login-subhead">Find just the recipe you have been looking for.</p>
        <hr className="homeHr" />
        <h1 className="login-title">Login</h1>

        <input type="text" className="login-input" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" className="login-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        {error && <Alert severity="error">{error}</Alert>}

        <button className="login-button">Submit</button>
      </form>
    </div>
  );
};

export default Login;
