import './SearchBars.css';
import axios from 'axios';
// React
import { useState } from 'react';
// Router
import { useNavigate } from 'react-router-dom';
// Icons
import { BiSearchAlt } from 'react-icons/bi';

export default function SearchBars(props) {
  // Controlled inputs
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(new Array(4).fill(false));
  const [open, setOpen] = useState(true);
  // Messages
  const [errorMsg, setErrorMsg] = useState("");
  // Hooks
  const navigate = useNavigate();

  //----- Handle bar form submit
  const handleSearch = e => {
    // Prevent refresh on submit
    e.preventDefault();
    // Format prices
    let formattedPrices = formatPrices();
    // Validations
    if(location === "") {
      handleErrorMsg("No location was given");
    } else if(formattedPrices === "") {
      handleErrorMsg("No price(s) was given");
    } else {
      // Send form data to server
      axios({
        method: "post",
        data: {
          location,
          price: formattedPrices,
          open
        },
        withCredentials: true,
        url: "/api/yelp/search"
      })
      .then(res => {
        // Navigate to search results
        navigate("/bars", {state: {searchResults: res.data.businesses}});
      })
      .catch(err => console.log(err));
    }
  };

  // Update price array state
  const handlePrice = priceVal => {
    let priceCopy = [...price];
    // Toggle price value
    priceCopy[priceVal] = !priceCopy[priceVal];
    // Set local state
    setPrice(priceCopy);
  };

  // Convert price array to string
  // ([false, true, true, false] => "$$,$$$")
  const formatPrices = () => {
    let result = []
    for(let i = 0; i < price.length; i++) {
      if(price[i] === true) {
        result.push(i + 1);
      }
    }
    return result.join(",");
  };

  // Display error message
  const handleErrorMsg = message => {
    // Scroll to top of page
    window.scrollTo(0, 0);
    setErrorMsg(message);
  };

  return (
    <div id="search-bars">
      {errorMsg && 
        <div id="search-bars-error-msg">
          <div>{errorMsg}</div>
        </div>
      }

      <div id="search-bars-header">
        <h1>Bar Search<span><BiSearchAlt/></span></h1>
      </div>

      <form id="search-bars-form" onSubmit={handleSearch}>
        <div className="search-bars-input">
          <label>Location</label>
          <input type="text" onChange={e => setLocation(e.target.value)} placeholder="location"/>
        </div>

        <div className="search-bars-radio">
          <label>Price</label>
          <input type="checkbox" value="0" name="price" onChange={e => handlePrice(e.target.value)}/> $
          <input type="checkbox" value="1" name="price" onChange={e => handlePrice(e.target.value)}/> $$
          <input type="checkbox" value="2" name="price" onChange={e => handlePrice(e.target.value)}/> $$$
          <input type="checkbox" value="3" name="price" onChange={e => handlePrice(e.target.value)}/> $$$$
        </div>

        <div className="search-bars-radio">
          <label>Open Now</label>
          <input type="radio" value={true} name="open" defaultChecked onChange={e => setOpen(e.target.value)}/> Yes
          <input type="radio" value={false} name="open" onChange={e => setOpen(e.target.value)}/> No
        </div>
        
        <div id="search-bars-submit">
          <input type="submit" value="Submit"/>
        </div>
      </form>
    </div>
  );
};