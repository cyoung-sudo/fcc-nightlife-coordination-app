import './Profile.css';
import axios from 'axios';
// React
import { useState, useEffect } from 'react';
// Router
import { Link } from 'react-router-dom';
// Icons
import { BsStarFill, BsStar } from 'react-icons/bs';
// Rating
import Rating from 'react-rating';

export default function Profile(props) {
  // Requested data
  const [bars, setBars] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
  }, [refresh]);

  //----- Remove bar for current user
  const handleRemove = barId => {
    // Request to remove bar for current user
    axios({
      method: "delete",
      data: { barId },
      withCredentials: true,
      url: "/api/user/bar"
    })
    .then(res => {
      if(res.data.success) {
        console.log("Deleted bar");
        // Refresh component
        setRefresh(refresh => !refresh);
        // Scroll to top of page
        window.scrollTo(0, 0);
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div id="profile">
      <div id="profile-header">
        <h1>{props.session.user.username}'s Profile</h1>
      </div>

      <ul id="profile-bars">
        {bars.map(bar => (
          <li key={bar.id}>
            <img src={bar.image_url} alt="image"/>
            <div className="profile-bars-name">{bar.name}</div>
            <div className="profile-bars-rating">
              <Rating 
                start={0}
                stop={5}
                fractions={2}
                initialRating={bar.rating}
                readonly={true}
                emptySymbol={<BsStar/>}
                fullSymbol={<BsStarFill/>}/> {bar.review_count}
            </div>
            <div className="profile-bars-categories">
              {bar.categories.map(category => (
                <div key={category.alias}>{category.title}</div>
              ))}
            </div>
            <div className="priofile-bars-links">
              <Link to={`/bars/${bar.id}`}>More Info</Link>
              <button onClick={() => handleRemove(bar.id)}>Remove</button>
            </div>
            <div>{bar.is_closed ? "Closed" : "Open"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};