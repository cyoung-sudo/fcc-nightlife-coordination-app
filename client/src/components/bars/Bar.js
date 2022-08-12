import './Bar.css';
import axios from 'axios';
// React
import { useState, useEffect } from 'react';
// Router
import { Link, useParams } from 'react-router-dom';
// Icons
import { BsStarFill, BsStar } from 'react-icons/bs';
// Rating
import Rating from 'react-rating';
// Image gallery
import ImageGallery from 'react-image-gallery';

export default function Bar(props) {
  // Requested data
  const [loggedIn, setLoggedIn] = useState(false);
  const [bar, setBar] = useState({});
  // Formatted data
  const [photos, setPhotos] = useState([]);
  // Loading status
  const [loaded, setLoaded] = useState(false);
  // Hooks
  const { barId } = useParams();

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
      }
      // Request for given bar
      axios({
        method: "post",
        data: { barId: barId },
        withCredentials: true,
        url: "/api/yelp/details"
      })
      .then(res2 => {
        setBar(res2.data.bar);
        let formattedPhotos = formatPhotos(res2.data.bar.photos);
        console.log(formattedPhotos)
        setPhotos(formattedPhotos);
        setLoaded(true);     
      })
      .catch(err => console.log(err));
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

  const formatPhotos = photos => {
    return photos.map(photo => {
      return {
        original: photo,
        thumbnail: photo,
      }
    });
  };

  if(loaded) {
    return (
      <div id="bar">
        <div id="bar-header">
          <h1>{bar.name}</h1>
        </div>
  
        <div id="bar-rating">
          <Rating 
            start={0}
            stop={5}
            fractions={2}
            initialRating={bar.rating}
            readonly={true}
            emptySymbol={<BsStar/>}
            fullSymbol={<BsStarFill/>}/> {bar.review_count} Reviews
        </div>
  
        <div id="bar-details">
          <div>{bar.is_claimed ? "Claimed": "Unclaimed"}</div>
          <div>{bar.price}</div>
          {bar.categories.map(category => (
            <div key={category.alias}>{category.title}</div>
          ))}
        </div>

        <div id="bar-time">
          <div>{bar.is_closed ? "Closed" : "Open"}</div>
        </div>
  
        <div id="bar-photos">
          <ImageGallery 
            items={photos}
            showThumbnails={false}
            showPlayButton={false}
          />
        </div>

        <div id="bar-links">
          {loggedIn &&
            <button onClick={() => handleBar(bar)}>Add Bar</button>
          }
          <Link to="/search-bars">Search for Bars</Link>
        </div>
      </div>
    );
  } else {
    <div>
      <h3>Loading...</h3>
    </div>
  }
};