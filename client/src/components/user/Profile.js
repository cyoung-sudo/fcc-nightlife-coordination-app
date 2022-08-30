import './Profile.css';
import axios from 'axios';
// React
import { useState, useEffect } from 'react';
// Router
import { Link, useNavigate } from 'react-router-dom';
// Icons
import { BsStarFill, BsStar } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
// Rating
import Rating from 'react-rating';

export default function Profile(props) {
  // Requested data
  const [bars, setBars] = useState([]);
  const [refresh, setRefresh] = useState(false);
  // Loading status
  const [loaded, setLoaded] = useState(false);
  // Pagination
  const [page, setPage] = useState(1);
  const [pageContent, setPageContent] = useState([]);
  // Hooks
  const navigate = useNavigate();

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
      // Set content for current page
      handlePageContent(res.data.bars);
      // Finished loading data
      setLoaded(true);
    })
    .catch(err => console.log(err));
  }, [refresh, page]);

  // Handle delete button
  const handleDelAcc = () => {
    let result = window.confirm("Are you sure you want to delete your account?");
    if(result) {
      // Request to delete account
      axios({
        method: "delete",
        withCredentials: true,
        url: "/api/user"
      })
      .then(res => {
        logout();
        // Navigate to root route
        navigate("/");
      })
      .catch(err => console.log(err));
    }
  };

  //----- Handle user logout
  const logout = () =>{
    // Request for user logout
    axios({
      method: "post",
      withCredentials: true,
      url: "/api/auth/logout"
    })
    .then(res => {
      // Redirect to root route
      navigate("/");
    })
    .catch(err => console.log(err));
  };

  //----- Remove bar for current user
  const handleRemove = barId => {
    let result = window.confirm("Are you sure you want to delete?");
    if(result) {
      // Request to remove bar for current user
      axios({
        method: "delete",
        data: { barId },
        withCredentials: true,
        url: "/api/user/bar"
      })
      .then(res => {
        if(res.data.success) {
          // Refresh component
          setRefresh(refresh => !refresh);
          // Scroll to top of page
          window.scrollTo(0, 0);
        }
      })
      .catch(err => console.log(err));
    }
  };

  // Set content for current page
  const handlePageContent = results => {
    let start = (page - 1) * 10;
    let end = page * 10;
    let content = results.slice(start);
    if(content.length <= 10) {
      setPageContent(content);
    } else {
      setPageContent(results.slice(start, end));
    }
    // Scroll to top of page
    window.scrollTo(0, 0);
  };

  if(loaded) {
    return (
      <div id="profile">
        <div id="profile-header">
          <h1>{props.session.user.username}'s Profile<span><CgProfile/></span></h1>
        </div>

        <div id="profile-links">
          <button onClick={handleDelAcc}>Delete account</button>
        </div>
  
        {(pageContent.length > 0) && <ul id="profile-bars">
          {pageContent.map(bar => (
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
              <div className="profile-bars-links">
                <Link to={`/bars/${bar.id}`}>More Info</Link>
                <button onClick={() => handleRemove(bar.id)}>Remove</button>
              </div>
              <div>
                {bar.is_closed ? <span className="profile-bars-closed">Closed</span> : <span className="profile-bars-open">Open</span>}
              </div>
            </li>
          ))}
        </ul>}

        {(pageContent.length === 0) &&
          <div id="profile-bars-none">
            <h3>No bars added yet...</h3>
          </div>
        }
  
        <div id="profile-bars-pagination">
          <div id="profile-bars-page">Page: {page} of {(Math.ceil(bars.length / 10))}</div>
          <div id="profile-bars-page-btns">
            {(page > 1) && 
              <button onClick={() => setPage(page => page - 1)}>Prev</button>
            }   
            {(page < (Math.ceil(bars.length / 10))) &&
              <button onClick={() => setPage(page => page + 1)}>Next</button>
            }
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