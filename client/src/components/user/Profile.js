import './Profile.css';
import axios from 'axios';
// React
import { useState, useEffect } from 'react';

export default function Profile(props) {
  // Requested data
  const [bars, setBars] = useState([]);

  //----- Get bars for current user
  useEffect(() => {
    // Request bars for current user
    axios({
      method: "get",
      withCredentials: true,
      url: "/api/user/bars"
    })
    .then(res => {
      setBars(res.data.bars);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div id="profile">
      <div id="profile-header">
        <h1>{props.session.user.username}'s Profile</h1>
      </div>

      <div id="profile-bars">
        {bars.map(bar => (
          <div key={bar.id}>
            <div>{bar.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};