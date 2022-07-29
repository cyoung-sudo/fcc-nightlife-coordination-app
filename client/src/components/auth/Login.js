import './Login.css';
// React
import { useState } from 'react';
// Router
import { Link } from 'react-router-dom';
// Icons
import { FaWpforms } from 'react-icons/fa';

export default function Login(props) {
  // Controlled inputs
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const handleLogin = (e) => {
    // Prevent refresh on submit
    e.preventDefault();
    console.log(`Submitting username[${loginUser}], password[${loginPass}]`);
  };

  return (
    <div id="login">
      <div id="login-header">
        <h1><span><FaWpforms/></span>Login</h1>
      </div>

      <form id="login-form" onSubmit={handleLogin}>
        <div className="login-input">
          <label>Username</label>
          <input type="text" onChange={e => setLoginUser(e.target.value)} placeholder="username"/>
        </div>
        <div className="login-input">
          <label>Password</label>
          <input type="password" onChange={e => setLoginPass(e.target.value)} placeholder="password"/>
        </div>
        <div id="login-submit">
          <input type="submit" value="Submit"/>
        </div>
      </form>

      <div id="login-links">
        <Link to="/signup">Signup</Link> if you don't have an account
      </div>
    </div>
  );
};