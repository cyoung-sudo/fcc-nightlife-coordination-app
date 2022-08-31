import './Bar.css';
import axios from 'axios';
// React
import { useState, useEffect } from 'react';
// Router
import { Link, useParams } from 'react-router-dom';
// Icons
import { BsStarFill, BsStar, BsDot } from 'react-icons/bs';
import { AiFillCheckCircle, AiFillClockCircle, AiFillPhone } from 'react-icons/ai'
import { MdLocationOn } from 'react-icons/md';
// Rating
import Rating from 'react-rating';
// Image gallery
import ImageGallery from 'react-image-gallery';

export default function Bar(props) {
  // Requested data
  const [loggedIn, setLoggedIn] = useState(false);
  const [bar, setBar] = useState({});
  // Formatted data
  const [formattedPhotos, setFormattedPhotos] = useState([]);
  const [formattedHours, setFormattedHours] = useState({});
  // Messages
  const [message, setMessage] = useState("");
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
        // Format photo data
        let formattedPhotos = formatPhotos(res2.data.bar.photos);
        setFormattedPhotos(formattedPhotos);
        // Format hours data
        let formattedHours = formatHours(res2.data.bar.hours[0].open);
        setFormattedHours(formattedHours);
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
      url: "/api/user/bar"
    })
    .then(res => {
      if(res.data.success) {
        handleMsg("Successfully added bar");
      } else {
        handleMsg("Already added bar");
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

  const formatHours = hours => {
    let result = {};
    for(let hour of hours) {
      let startH = parseInt(hour.start.slice(0,2));
      let startM = hour.start.slice(2);
      let endH = parseInt(hour.end.slice(0,2));
      let endM = hour.end.slice(2);
      // Format start-hours
      let startFmt = formatHoursHelper(startH, startM);
      // Format end-hours
      let endFmt = formatHoursHelper(endH, endM);
      result[hour.day] = [startFmt, endFmt];
    }
    return result;
  };

  const formatHoursHelper = (hour, min) => {
    let result;
    // 12:00am
    if(hour === 0) {
      result = "12:" + min + "am";
    // 12:00pm
    } else if(hour === 12) {
      result = "12:" + min + "pm";
    // 1:00am - 11:00am
    } else if(hour <= 11) {
      if(hour <= 9) {
        result = "0" + hour + ":" + min + "am";
      } else {
        result = hour + ":" + min + "am";
      }
    // 1:00pm - 11:00pm
    } else {
      hour = hour - 12;
      if(hour <= 9) {
        result = "0" + hour + ":" + min + "pm";
      } else {
        result = hour + ":" + min + "pm";
      }
    }
    return result;
  };

  // Display message
  const handleMsg = message => {
    // Scroll to top of page
    window.scrollTo(0, 0);
    setMessage(message);
  };

  if(loaded) {
    return (
      <div id="bar">
        {message && 
          <div id="bar-msg">
            <div>{message}</div>
          </div>
        }

        <div id="bar-header">
          <h1>{bar.name}</h1>
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
            {bar.is_claimed ? <div id="bar-claimed"><span><AiFillCheckCircle/></span>Claimed</div> : "Unclaimed"}
            <BsDot/>{bar.price}
          </div>
          <div id="bar-categories">
            {bar.categories.map(category => (
              <div key={category.alias}>{category.title}</div>
            ))}
          </div>
          <div id="bar-time">
            {bar.hours[0].is_open_now ? <span className="bar-open">Open</span> : <span className="bar-closed">Closed</span>}
          </div>
        </div>
  
        <div id="bar-photos">
          <ImageGallery 
            items={formattedPhotos}
            showThumbnails={false}
            showPlayButton={false}
          />
        </div>

        <div id="bar-details-extra">
          <div id="bar-location">
            <h2>Location<span><MdLocationOn/></span></h2>
            <div id="bar-location-content">
              {bar.location.display_address}
            </div>
          </div>

          <div id="bar-hours">
            <h2>Hours<span><AiFillClockCircle/></span></h2>
            <div id="bar-hours-content">
              <div>Mon {formattedHours[0] ?
                <span>{formattedHours[0][0]} - {formattedHours[0][1]}</span> : "Closed"}
              </div>
              <div>Tue {formattedHours[1] ?
                <span>{formattedHours[1][0]} - {formattedHours[1][1]}</span> : "Closed"}
              </div>
              <div>Wed {formattedHours[2] ?
                <span>{formattedHours[2][0]} - {formattedHours[2][1]}</span> : "Closed"}
              </div>
              <div>Thu {formattedHours[3] ?
                <span>{formattedHours[3][0]} - {formattedHours[3][1]}</span> : "Closed"}
              </div>
              <div>Fri {formattedHours[4] ?
                <span>{formattedHours[4][0]} - {formattedHours[4][1]}</span> : "Closed"}
              </div>
              <div>Sat {formattedHours[5] ?
                <span>{formattedHours[5][0]} - {formattedHours[5][1]}</span> : "Closed"}
              </div>
              <div>Sun {formattedHours[6] ?
                <span>{formattedHours[6][0]} - {formattedHours[6][1]}</span> : "Closed"}
              </div>
            </div>
          </div>

          <div id="bar-contact">
            <h2>Contact<span><AiFillPhone/></span></h2>
            <div id="bar-contact-content">
              {bar.display_phone}
            </div>
          </div>
        </div>

        <div id="bar-links">
          {loggedIn &&
            <button onClick={() => handleBar(bar)}>Add Bar</button>
          }
          <a href={bar.url} target="_blank" rel="noreferrer">Visit Yelp page</a>
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