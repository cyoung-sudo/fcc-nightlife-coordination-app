import './Navbar.css';
import axios from 'axios';
// React
import { useState, useEffect } from 'react';
// Router
import { Link, NavLink, useNavigate } from 'react-router-dom';
// Icons
import { IoIosWine } from 'react-icons/io';

export default function Navbar(props) {
  // Requested data
  const [loggedIn, setLoggedIn] = useState(false);
  // Hooks
  const navigate = useNavigate();

  // Styling for active navlink
  const activeStyle = {
    backgroundColor: "white",
    color: "black"
  };

    //----- Check session status
    useEffect(() => {
      // Request for session status
      axios({
        method: "get",
        withCredentials: true,
        url: "/api/auth/getSession"
      })
      .then(res => {
        if(res.data.success) {
          // Update local state
          setLoggedIn(true);
        } else {
          // Update local state
          setLoggedIn(false);
        }
      })
      .catch(err => console.log(err));
    });

  //----- Handle user logout
  const logout = () =>{
    // Request for user logout
    axios({
      method: "post",
      withCredentials: true,
      url: "/api/auth/logout"
    })
    .then(res => {
      // Redirect to root route
      navigate("/");
    })
    .catch(err => console.log(err));
  };

  return (
    <div id="navbar">
      <Link to="/" id="navbar-name"><IoIosWine/>Nightlife</Link>
      <div id="navbar-links">
        <NavLink 
            to="/"
            style={({ isActive }) => isActive ? activeStyle : undefined
          }>Home</NavLink>

        {!loggedIn && 
          <NavLink 
            to="signup"
            style={({ isActive }) => isActive ? activeStyle : undefined
          }>Signup</NavLink>
        }

        {!loggedIn && 
          <NavLink 
            to="/login"
            style={({ isActive }) => isActive ? activeStyle : undefined
          }>Login</NavLink>
        }

        {loggedIn && 
          <NavLink 
            to="profile"
            style={({ isActive }) => isActive ? activeStyle : undefined
          }>Profile</NavLink>
        }

        {loggedIn && 
          <button id="navbar-logout" onClick={logout}>Logout</button>
        }
      </div>
    </div>
  );
};