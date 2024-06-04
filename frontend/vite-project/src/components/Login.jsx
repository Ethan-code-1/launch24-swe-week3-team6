import React from 'react';
import '../styles/Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <div className="right-overlay"></div> 
      <form className="login-form">
        <div className="logo-container">
          <h1 className="company-name">Flavor Fusion</h1>
          <img src="/websitelogo.png" alt="Recipe App Logo" className="logo-image" />
        </div>
        <p className="login-subhead">Find just the recipe you have been looking for.</p>
        <hr className="homeHr" />
        <h1 className="login-title">Login</h1>
        <input type="text" className="login-input" placeholder="Username" />
        <input type="password" className="login-input" placeholder="Password" />
        <button className="login-button">Submit</button>
      </form>
    </div>
  );
};

export default Login;
