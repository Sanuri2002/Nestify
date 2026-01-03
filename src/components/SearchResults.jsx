import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = ({ results, hasSearched, onAddToFavourites, favourites }) => {
  // If user hasn't searched yet, show nothing
  if (!hasSearched) {
    return null;
  }

  // If searched but no results found
  if (results.length === 0) {
    return (
      <div className="search-results">
        <h2>Search Results</h2>
        <div className="no-results">
          <p>No properties found matching your criteria.</p>
          <p>Try adjusting your search filters.</p>
        </div>
      </div>
    );
  }

  // Display search results
  return (
    <div className="search-results">
      <h2>Search Results ({results.length} properties found)</h2>
      
      <div className="results-grid">
        {results.map(property => {
          const isFavourite = favourites.some(fav => fav.id === property.id);
          
          return (
            <div key={property.id} className="result-card">
              <div className="result-image-container">
                <img 
                  src={property.picture} 
                  alt={property.location}
                  className="result-image"
                />
                <span className="result-type-badge">{property.type}</span>
                {isFavourite && <span className="result-favourite-badge">❤️</span>}
              </div>
              
              <div className="result-content">
                <h3 className="result-price">£{property.price.toLocaleString()}</h3>
                
                <div className="result-info">
                  <span className="result-bedrooms">
                    🛏️ {property.bedrooms} Bedrooms
                  </span>
                  <span className="result-tenure">{property.tenure}</span>
                </div>
                
                <p className="result-location">📍 {property.location}</p>
                
                <p className="result-description">
                  {property.description.replace(/<br>/g, ' ').substring(0, 150)}...
                </p>
                
                <div className="result-actions">
                  <Link 
                    to={`/property/${property.id}`} 
                    className="btn btn-view"
                  >
                    View Details
                  </Link>
                  <button 
                    className={`btn ${isFavourite ? 'btn-favourited' : 'btn-favourite'}`}
                    onClick={() => onAddToFavourites(property)}
                    disabled={isFavourite}
                  >
                    {isFavourite ? '❤️ Favourited' : '🤍 Add to Favourites'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;