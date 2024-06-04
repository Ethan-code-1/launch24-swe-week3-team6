import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../firebaseAuth'; 
import { Alert } from '@mui/material';

import '../styles/Login.css';

const Signup = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        await signUp(email, password, username);
        alert('Sign up successfully')
        navigate('/');
      } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
          setError('User already exists with this email');
        } else {
          setError(err.message);
        }
      }
  };

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <div className="right-overlay"></div> 
      <form className="login-form" onSubmit={handleSignUp}>
        <h1 className="company-name">Flavor Fusion</h1>
        <p className="login-subhead">Find just the recipe you have been looking for.</p>

        <hr className="homeHr" />

        <h1 className="login-title">Create an account</h1>

        <input type="text" className="login-input" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="text" className="login-input" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" className="login-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <input type="password" className="login-input" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />

        {error && <Alert severity="error">{error}</Alert>}

        <button className="login-button">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
