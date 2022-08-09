import './HomePage.css';
// Router
import { Link } from 'react-router-dom';

export default function HomePage(props) {
  return (
    <div id="home-page">
      <div id="home-page-header">
        <h1>Nightlife Coordinator</h1>
      </div>

      <div id="home-page-links">
        <Link to="search-bars">Search for Bars</Link>
      </div>
    </div>
  );
};