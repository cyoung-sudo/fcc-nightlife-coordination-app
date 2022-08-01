import './Login.css';
import axios from 'axios';
// React
import { useState } from 'react';
// Router
import { Link, useNavigate } from 'react-router-dom';
// Icons
import { FaWpforms } from 'react-icons/fa';

export default function Login(props) {
  // Controlled inputs
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  // Messages
  const [errorMsg, setErrorMsg] = useState("");
  // Hooks
  const navigate = useNavigate();

  //----- Handle login form submit
  const handleLogin = (e) => {
    // Prevent refresh on submit
    e.preventDefault();
    // Validation checks
    if(loginUser === "") {
      handleErrorMsg("No username was given");
    } else if(loginPass === "") {
      handleErrorMsg("No password was given");
    } else {
      // Send form data to server
      axios({
        method: "post",
        data: {
          username: loginUser,
          password: loginPass
        },
        withCredentials: true,
        url: "/api/auth/login"
      }).then((res) => {
        if(!res.data.success) {
          // Display error message
          handleErrorMsg(res.data.message);
        } else {
          // Navigate to profile route
          navigate("/profile");
        }
      })
      .catch(err => console.log(err));
    }
  };

  // Display error message
  const handleErrorMsg = message => {
    // Scroll to top of page
    window.scrollTo(0, 0);
    setErrorMsg(message);
  };

  return (
    <div id="login">
      {errorMsg && 
        <div id="login-error-msg">
          <div>{errorMsg}</div>
        </div>
      }

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