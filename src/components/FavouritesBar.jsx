import React from 'react';
import './FavouritesBar.css';

const FavouritesBar = ({ favourites, onRemove, onClear }) => {
  return (
    <div className="favourites-bar">
      <div className="favourites-header">
        <h3>Favourite Properties ({favourites.length})</h3>
        {favourites.length > 0 && (
          <button className="btn-clear-all" onClick={onClear}>
            Clear All
          </button>
        )}
      </div>

      <div className="favourites-content">
        {favourites.length === 0 ? (
          <p className="empty-message">
            No favourite properties yet. Drag properties here or click the favourite button to add them.
          </p>
        ) : (
          <div className="favourites-list">
            {favourites.map(property => (
              <div key={property.id} className="favourite-item">
                <img 
                  src={property.picture} 
                  alt={property.location}
                  className="favourite-image"
                />
                <div className="favourite-details">
                  <p className="favourite-price">£{property.price.toLocaleString()}</p>
                  <p className="favourite-location">{property.type} - {property.bedrooms} bed</p>
                  <p className="favourite-area">{property.location.split(',')[0]}</p>
                </div>
                <button 
                  className="btn-remove"
                  onClick={() => onRemove(property.id)}
                  aria-label="Remove from favourites"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouritesBar;