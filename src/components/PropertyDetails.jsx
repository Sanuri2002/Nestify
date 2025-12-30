import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import propertiesData from '../data/properties.json';
import './PropertyDetails.css';

const PropertyDetails = ({ onAddToFavourites }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the property by ID
  const property = propertiesData.properties.find(prop => prop.id === id);
  
  // State for image gallery
  const [selectedImage, setSelectedImage] = useState(0);

  // If property not found
  if (!property) {
    return (
      <div className="property-not-found">
        <h2>Property Not Found</h2>
        <p>The property you're looking for doesn't exist.</p>
        <button className="btn btn-primary" onClick={() => navigate('/property-list')}>
          Back to Properties
        </button>
      </div>
    );
  }

  // Extract postcode for Google Maps
  const extractPostcode = (location) => {
    const parts = location.split(' ');
    return parts[parts.length - 1];
  };

  const postcode = extractPostcode(property.location);

  return (
    <div className="property-details-page">
      {/* Back Button */}
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Back to Properties
      </button>

      {/* Property Header */}
      <div className="property-header">
        <div className="property-title-section">
          <h1>{property.location}</h1>
          <p className="property-type-info">
            {property.type} • {property.bedrooms} Bedrooms • {property.tenure}
          </p>
        </div>
        <div className="property-price-section">
          <h2 className="property-price">£{property.price.toLocaleString()}</h2>
          <button 
            className="btn btn-favourite"
            onClick={() => onAddToFavourites(property)}
          >
            ❤️ Add to Favourites
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="image-gallery">
        <div className="main-image">
          <img 
            src={property.images[selectedImage]} 
            alt={`${property.location} - View ${selectedImage + 1}`}
            className="large-image"
          />
        </div>
        
        <div className="thumbnail-gallery">
          {property.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${property.location} - Thumbnail ${index + 1}`}
              className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Property Information Tabs */}
      <Tabs className="property-tabs">
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        {/* Description Tab */}
        <TabPanel>
          <div className="tab-content">
            <h3>Property Description</h3>
            <div 
              className="property-description"
              dangerouslySetInnerHTML={{ __html: property.description }}
            />
            
            <div className="property-features">
              <h4>Key Features</h4>
              <ul>
                <li>{property.bedrooms} Bedrooms</li>
                <li>{property.type}</li>
                <li>{property.tenure}</li>
                <li>Added: {property.added.month} {property.added.day}, {property.added.year}</li>
              </ul>
            </div>
          </div>
        </TabPanel>

        {/* Floor Plan Tab */}
        <TabPanel>
          <div className="tab-content">
            <h3>Floor Plan</h3>
            <div className="floor-plan-container">
              <img 
                src={property.floorplan} 
                alt={`Floor Plan - ${property.location}`}
                className="floor-plan-image"
              />
              <p className="floor-plan-note">
                * Floor plan for illustrative purposes only. Not to scale.
              </p>
            </div>
          </div>
        </TabPanel>

        {/* Map Tab */}
        <TabPanel>
          <div className="tab-content">
            <h3>Location</h3>
            <p className="map-address">{property.location}</p>
            <div className="map-container">
              <iframe
                title="Property Location"
                width="100%"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(postcode)}`}
                allowFullScreen
              />
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyDetails;