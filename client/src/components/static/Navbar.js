import './Navbar.css';
// Router
import { NavLink } from 'react-router-dom';
// Icons
import { IoIosWine } from 'react-icons/io';

export default function Navbar(props) {
  // Styling for active navlink
  const activeStyle = {
    backgroundColor: "white",
    color: "black"
  };

  return (
    <div id="navbar">
      <div id="navbar-name"><IoIosWine/>Nightlife</div>
      <div id="navbar-links">
        <NavLink 
            to="/"
            style={({ isActive }) => isActive ? activeStyle : undefined
          }>Bars</NavLink>
        <NavLink 
            to="signup"
            style={({ isActive }) => isActive ? activeStyle : undefined
          }>Signup</NavLink>
        <NavLink 
            to="login"
            style={({ isActive }) => isActive ? activeStyle : undefined
          }>Login</NavLink>
      </div>
    </div>
  );
};