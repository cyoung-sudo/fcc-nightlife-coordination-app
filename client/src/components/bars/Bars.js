import './Bars.css';
// React
import { useState, useEffect } from 'react';
// Router
import { Link, useLocation } from 'react-router-dom';
// Icons
import { BsStarFill, BsStar } from 'react-icons/bs';
import { FaGlassCheers } from 'react-icons/fa';
// Rating
import Rating from 'react-rating';

export default function Bars(props) {
  // Pagination
  const [page, setPage] = useState(1);
  const [pageContent, setPageContent] = useState([]);
  // Hooks
  const { state } = useLocation();
  const { searchResults } = state;

  // Set page content
  useEffect(() => {
    handlePageContent(searchResults);
  }, [page]);

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

  return (
    <div id="bars">
      <div id="bars-header">
        <h1>Bar Results<span><FaGlassCheers/></span></h1>
      </div>

      <div id="bars-links">
        <Link to="/search-bars">Search Bars</Link>
      </div>

      <ul id="bars-results">
        {pageContent && pageContent.map(result => (
          <li key={result.id}>
            <img src={result.image_url} alt="image"/>
            <div className="bars-name">{result.name}</div>
            <div className="bars-rating">
              <Rating 
                start={0}
                stop={5}
                fractions={2}
                initialRating={result.rating}
                readonly={true}
                emptySymbol={<BsStar/>}
                fullSymbol={<BsStarFill/>}/> {result.review_count}
            </div>
            <div className="bars-categories">
              {result.categories.map(category => (
                <div key={category.alias}>{category.title}</div>
              ))}
            </div>
            <div className="bars-links">
              <Link to={result.id}>More Info</Link>
            </div>
            <div>
              {result.is_closed ? <span className="bars-closed">Closed</span> : <span className="bars-open">Open</span>}
            </div>
          </li>
        ))}
      </ul>

      <div id="bars-pagination">
        <div id="bars-page">Page: {page} of {(Math.ceil(searchResults.length / 10))}</div>
        <div id="bars-page-btns">
          {(page > 1) && 
            <button onClick={() => setPage(page => page - 1)}>Prev</button>
          }   
          {(page < (Math.ceil(searchResults.length / 10))) &&
            <button onClick={() => setPage(page => page + 1)}>Next</button>
          }
        </div>
      </div>
    </div>
  );
};