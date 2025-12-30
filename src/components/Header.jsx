import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation with React Router
import './Header.css';

function Header ()  {
  return (
    <header className="header">
      
        <h1>Nestify</h1>
      
      
      <nav>
        <ul>
          <li><Link to="/">Property Search</Link></li>
          <li><Link to="/property-list">Properties</Link></li>
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;