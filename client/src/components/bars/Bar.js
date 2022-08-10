import './Bar.css';
import axios from 'axios';
// React
import { useState, useEffect } from 'react';
// Router
import { Link, useLocation } from 'react-router-dom';

export default function Bar(props) {
  // Requested data
  const [loggedIn, setLoggedIn] = useState(false);
  // Hooks
  const { state } = useLocation();

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
  }, []);

  //----- Add bar for current user
  const handleBar = bar => {
    // Send data to server
    axios({
      method: "post",
      data: { bar },
      withCredentials: true,
      url: "/api/user/addBar"
    })
    .then(res => {
      if(res.data.success) {
        console.log("Added bar");
      } else {
        console.log("Failed to add bar")
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div id="bar">
      <div id="bar-header">
        <h1>{state.bar.name}</h1>
      </div>

      <div>
        <div>{state.bar.rating}</div>
        <div>{state.bar.review_count} reviews</div>
      </div>

      <div id="bar-categories">
        {state.bar.categories.map(category => (
          <div key={category.alias}>{category.title}</div>
        ))}
      </div>

      <div id="bar-links">
        {loggedIn &&
          <button onClick={() => handleBar(state.bar)}>Add Bar</button>
        }
        <Link to="/search-bars">Search for Bars</Link>
      </div>
    </div>
  );
};