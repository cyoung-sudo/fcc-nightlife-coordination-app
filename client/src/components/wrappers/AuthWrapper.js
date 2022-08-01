import axios from 'axios';
// React
import React, { useState, useEffect } from 'react';
// Router
import { useNavigate } from 'react-router-dom';

export default function AuthWrapper({ children }) {
  // Requested data
  const [session, setSession] = useState(null);
  // Authentication status
  const [authenticated, setAuthenticated] = useState(false);
  // Hooks
  const navigate = useNavigate();

  //----- Check session status
  useEffect(() => {
    // Scroll to top of page
    window.scrollTo(0, 0);
    // Request for session status
    axios({
      method: "get",
      withCredentials: true,
      url: "/api/auth/getSession"
    })
    .then(res => {
      if(res.data.success) {
        // Set local state
        setSession(res.data.session);
        setAuthenticated(true);
      } else {
        // Navigate to root route
        navigate("/");
      }
    })
    .catch(err => console.log(err));
  }, [authenticated]);

  // Render child once data is ready
  if(authenticated) {
    // Pass "session" as prop to child component
    return React.cloneElement(children, { session });
  } else {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }
};