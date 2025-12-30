import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';
  const isPropertiesPage = location.pathname === '/properties';

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Nestify</h1>
          <span className="tagline">Find your perfect property</span>
        </Link>
        
        <nav className="main-nav">
          <Link 
            to="/search" 
            className={`nav-link ${isSearchPage ? 'active' : ''}`}
          >
            <span>Search Properties</span>
          </Link>
          <Link 
            to="/properties" 
            className={`nav-link ${isPropertiesPage ? 'active' : ''}`}
          >
            <span>Properties</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;