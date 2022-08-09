import './Bars.css';
// React
import { useState, useEffect } from 'react';
// Router
import { Link, useLocation } from 'react-router-dom';

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
        <h1>Bar Results</h1>
      </div>

      <div id="bars-links">
        <Link to="/search-bars">Search Bars</Link>
      </div>

      <div id="bars-results">
        {pageContent && pageContent.map(result => (
          <li key={result.id}>
            <img src={result.image_url} alt="image"/>
            <div className="bars-name">{result.name}</div>
            <div className="bars-rating">Rating: {result.rating}</div>
            <div>Review Count: {result.review_count}</div>
            <div className="bars-categories">
              {result.categories.map(category => (
                <div key={category.alias}>{category.title}</div>
              ))}
            </div>
            <div>{result.price}</div>
            <div>{result.location.display_address}</div>
            <div>{result.is_closed ? "Closed" : "Open"}</div>
          </li>
        ))}
      </div>

      <div id="bars-pagination">
        <div>Page: {page}/{(Math.ceil(searchResults.length / 10))}</div>
        <div>
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