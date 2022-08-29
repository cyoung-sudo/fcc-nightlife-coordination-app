import './HomePage.css';
import axios from 'axios';
// React
import { useState, useEffect } from 'react';
// Router
import { Link, useNavigate } from 'react-router-dom';

export default function HomePage(props) {
  // Loading status
  const [loaded, setLoaded] = useState(false);
  // Hooks
  const navigate = useNavigate();
  
  //----- Redirect to recent search-results for authenicated users
  useEffect(() => {
    // Request for session status
    axios({
      method: "get",
      withCredentials: true,
      url: "/api/auth/getSession"
    })
    .then(res => {
      if(res.data.success) {
        // Request for recent search
        axios({
          method: "get",
          withCredentials: true,
          url: "/api/yelp/recent"
        })
        .then(res2 => {
          if(res2.data.success) {
            // Navigate to recent search results
            navigate("/bars", {state: {searchResults: res2.data.businesses}});
          } else {
            // Finished loading data
            setLoaded(true);
          }
        })
        .catch(err => console.log(err));
      } else {
        // Finished loading data
        setLoaded(true);
      }
    })
    .catch(err => console.log(err));
  }, []);

  if(loaded) {
    return (
      <div id="home-page">
        <div id="home-page-content">
          <div id="home-page-header">
            <h1>Nightlife Coordinator</h1>
            <p>Browse for local bars and plan your nightlife</p>
            <p>Create an account or get started below</p>
          </div>
  
          <div id="home-page-links">
            <Link to="search-bars">Search Bars</Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }
};