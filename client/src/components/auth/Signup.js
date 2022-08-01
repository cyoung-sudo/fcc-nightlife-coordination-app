import './Signup.css';
import axios from 'axios';
// React
import { useState } from 'react';
// Router
import { Link, useNavigate } from 'react-router-dom';
// Icons
import { FaWpforms } from 'react-icons/fa';

export default function Signup(props) {
  // Controlled inputs
  const [signupUser, setSignupUser] = useState("");
  const [signupPass, setSignupPass] = useState("");
  // Messages
  const [errorMsg, setErrorMsg] = useState("");
  // Hooks
  const navigate = useNavigate();

  //----- Handle signup form submit
  const handleSignup = (e) => {
    // Prevent refresh on submit
    e.preventDefault();
    // Send form data to server
    axios({
      method: "post",
      data: {
        username: signupUser,
        password: signupPass
      },
      withCredentials: true,
      url: "/api/auth/signup"
    })
    .then(res => {
      if(!res.data.success) {
        // Display error message
        handleErrorMsg(res.data.error.message);
      } else {
        // Navigate to profile route
        navigate("/profile");
      }
    })
    .catch(err => console.log(err));
  };

  // Display error message
  const handleErrorMsg = message => {
    // Scroll to top of page
    window.scrollTo(0, 0);
    setErrorMsg(message);
  };

  return (
    <div id="signup">
      {errorMsg && 
        <div id="signup-error-msg">
          <div>{errorMsg}</div>
        </div>
      }

      <div id="signup-header">
        <h1><span><FaWpforms/></span>Signup</h1>
      </div>

      <form id="signup-form" onSubmit={handleSignup}>
        <div className="signup-input">
          <label>Username</label>
          <input type="text" onChange={e => setSignupUser(e.target.value)} placeholder="username"/>
        </div>
        <div className="signup-input">
          <label>Password</label>
          <input type="password" onChange={e => setSignupPass(e.target.value)} placeholder="password"/>
        </div>
        <div id="signup-submit">
          <input type="submit" value="Submit"/>
        </div>
      </form>

      <div id="signup-links">
        <Link to="/login">Login</Link> if you already have an account
      </div>
    </div>
  );
};