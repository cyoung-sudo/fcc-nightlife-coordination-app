import './SearchBars.css';
import axios from 'axios';
// React
import { useState } from 'react';
// Router
import { Link, useNavigate } from 'react-router-dom';

export default function SearchBars(props) {
  // Controlled inputs
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(new Array(4).fill(false));
  const [open, setOpen] = useState(true);
  // Hooks
  const navigate = useNavigate();

  //----- Handle bar form submit
  const handleSearch = e => {
    // Prevent refresh on submit
    e.preventDefault();
    // Format prices
    let formattedPrices = formatPrices();
    //Validations...
    // Send form data to server
    axios({
      method: "post",
      data: {
        location,
        price: formattedPrices,
        open
      },
      withCredentials: true,
      url: "/api/yelp"
    })
    .then(res => {
      // Navigate to search results
      navigate("/search-bars/bars", {state: {searchResults: res.data.businesses}});
    })
    .catch(err => console.log(err));
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
  const formatPrices = () => {
    let result = []
    for(let i = 0; i < price.length; i++) {
      if(price[i] === true) {
        result.push(i + 1);
      }
    }
    return result.join(",");
  };

  return (
    <div id="search-bars">
      <div id="search-bars-header">
        <h1>Bar Search</h1>
      </div>

      <form id="search-bars-form" onSubmit={handleSearch}>
        <div className="search-bars-input">
          <label>Location</label>
          <input type="text" onChange={e => setLocation(e.target.value)} placeholder="location"/>
        </div>
        <div className="search-bars-input">
          <label>Price</label>
          <input type="checkbox" value="0" name="price" onChange={e => handlePrice(e.target.value)}/> $
          <input type="checkbox" value="1" name="price" onChange={e => handlePrice(e.target.value)}/> $$
          <input type="checkbox" value="2" name="price" onChange={e => handlePrice(e.target.value)}/> $$$
          <input type="checkbox" value="3" name="price" onChange={e => handlePrice(e.target.value)}/> $$$$
        </div>
        <div className="search-bars-input">
          <label>Open Now</label>
          <input type="radio" value={true} name="open" defaultChecked onChange={e => setOpen(e.target.value)}/> Yes
          <input type="radio" value={false} name="open" onChange={e => setOpen(e.target.value)}/> No
        </div>
        <div id="search-bars-submit">
          <input type="submit" value="Submit"/>
        </div>
      </form>

      <div id="search-bars-links">
        <Link to="/">Back</Link> to bars page
      </div>
    </div>
  );
};