import React from 'react';
import { Link } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import './PropertiesList.css';

const PropertiesList = ({ onAddToFavourites }) => {
  return (
    <div className="properties-list-page">
      <h1>All Properties</h1>
      
      
      <div className="properties-grid">
        {propertiesData.properties.map(property => (
          <div key={property.id} className="property-card">
            <div className="property-image-container">
              <img 
                src={property.picture} 
                alt={property.location}
                className="property-image"
              />
              <span className="property-type-badge">{property.type}</span>
            </div>
            
            <div className="property-card-content">
              <h3 className="property-card-price">£{property.price.toLocaleString()}</h3>
              
              <div className="property-card-info">
                <span className="property-bedrooms">
                  🛏️ {property.bedrooms} Bedrooms
                </span>
                <span className="property-tenure">{property.tenure}</span>
              </div>
              
              <p className="property-card-location">📍 {property.location}</p>
              
              <p className="property-card-description">
                {property.description.replace(/<br>/g, ' ').substring(0, 120)}...
              </p>
              
              <div className="property-card-actions">
                <Link 
                  to={`/property/${property.id}`} 
                  className="btn btn-view-details"
                >
                  View Details
                </Link>
                <button 
                  className="btn btn-add-favourite"
                  onClick={() => onAddToFavourites(property)}
                >
                   Add to Favourites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesList;