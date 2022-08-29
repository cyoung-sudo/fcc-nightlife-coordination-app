import './Navbar.css';
import axios from 'axios';
// React
import { useState, useEffect } from 'react';
// Router
import { Link, NavLink, useNavigate } from 'react-router-dom';
// Icons
import { IoIosWine } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi'

export default function Navbar(props) {
  // Requested data
  const [loggedIn, setLoggedIn] = useState(false);
  // Hooks
  const navigate = useNavigate();

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
        setLoggedIn(true);
      } else {
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

  // Styling for active navlink
  const activeStyle = {
    backgroundColor: "crimson",
    color: "white"
  };

  return (
    <div id="navbar">
      <Link to="/" id="navbar-logo">Nightlife<span><IoIosWine/></span></Link>

      {/* Links */}
      <ul id="navbar-links">
        <li>
          <NavLink 
            to="/"
            style={({ isActive }) => isActive ? activeStyle : undefined
          }>Home</NavLink>
        </li>

        {!loggedIn && 
          <li>
            <NavLink 
              to="signup"
              style={({ isActive }) => isActive ? activeStyle : undefined
            }>Signup</NavLink>
          </li>
        }

        {!loggedIn && 
          <li>
            <NavLink 
              to="login"
              style={({ isActive }) => isActive ? activeStyle : undefined
            }>Login</NavLink>
          </li>
        }

        {loggedIn && 
          <li>
            <NavLink 
              to="search-bars"
              style={({ isActive }) => isActive ? activeStyle : undefined
            }>Search</NavLink>
          </li>
        }

        {loggedIn && 
          <li>
            <NavLink 
              to="profile"
              style={({ isActive }) => isActive ? activeStyle : undefined
            }>Profile</NavLink>
          </li>
        }

        {loggedIn && 
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        }
      </ul>
      {/* /Links */}

      <input id="navbar-collapse-toggle" type="checkbox"/>
      <label id="navbar-collapse-button" htmlFor="navbar-collapse-toggle"><GiHamburgerMenu/></label>

      {/* Collapsed links */}
      <ul id="navbar-collapse-links">
        <li>
          <NavLink 
            to="/"
            style={({ isActive }) => isActive ? activeStyle : undefined
          }>Home</NavLink>
        </li>

        {!loggedIn && 
          <li>
            <NavLink 
              to="signup"
              style={({ isActive }) => isActive ? activeStyle : undefined
            }>Signup</NavLink>
          </li>
        }

        {!loggedIn && 
          <li>
            <NavLink 
              to="login"
              style={({ isActive }) => isActive ? activeStyle : undefined
            }>Login</NavLink>
          </li>
        }

        {loggedIn && 
          <li>
            <NavLink 
              to="search-bars"
              style={({ isActive }) => isActive ? activeStyle : undefined
            }>Search</NavLink>
          </li>
        }

        {loggedIn && 
          <li>
            <NavLink 
              to="profile"
              style={({ isActive }) => isActive ? activeStyle : undefined
            }>Profile</NavLink>
          </li>
        }

        {loggedIn && 
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        }
      </ul>
      {/* /Collapsed links */}
    </div>
  );
};