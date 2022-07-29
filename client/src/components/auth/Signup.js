import './Signup.css';
// React
import { useState } from 'react';
// Router
import { Link } from 'react-router-dom';
// Icons
import { FaWpforms } from 'react-icons/fa';

export default function Signup(props) {
  // Controlled inputs
  const [signupUser, setSignupUser] = useState("");
  const [signupPass, setSignupPass] = useState("");

  const handleSignup = (e) => {
    // Prevent refresh on submit
    e.preventDefault();
    console.log(`Submitting username[${signupUser}], password[${signupPass}]`);
  };

  return (
    <div id="signup">
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