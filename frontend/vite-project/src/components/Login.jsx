import React from 'react';
import '../styles/Login.css';


const Login = () => {
    return (
      <div className="login-container">
        <div className="login-overlay"></div>
        <div className="right-overlay"></div> 
        <form className="login-form">
            <h1 className = 'company-name'>Flavor Fusion</h1>
            <br></br>

            <hr className = "homeHr"></hr>
          <h1 className="login-title">Login</h1>
          <p className="login-subhead">Start exploring 100s of recipes today!</p>
          <br></br>


          <input type="text" className="login-input" placeholder="Username" />
          <input type="password" className="login-input" placeholder="Password" />
          <button className="login-button">Submit</button>
        </form>
      </div>
    );
  };
  

export default Login;
