import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import propertiesData from '../data/properties.json';
import './PropertiesList.css';

// Draggable Property Card Component
const DraggablePropertyCard = ({ property, onAddToFavourites, isFavourite }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROPERTY',
    item: { property },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div 
      ref={drag}
      className={`property-card ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="property-image-container">
        <img 
          src={property.picture} 
          alt={property.location}
          className="property-image"
        />
        <span className="property-type-badge">{property.type}</span>
        {isFavourite && <span className="favourite-badge">❤️ Favourited</span>}
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
            className={`btn ${isFavourite ? 'btn-remove-favourite' : 'btn-add-favourite'}`}
            onClick={() => onAddToFavourites(property)}
            disabled={isFavourite}
          >
            {isFavourite ? '❤️ In Favourites' : '🤍 Add to Favourites'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Draggable Favourite Item Component
const DraggableFavouriteItem = ({ property, onRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FAVOURITE',
    item: { propertyId: property.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div 
      ref={drag}
      className={`favourite-sidebar-item ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img 
        src={property.picture} 
        alt={property.location}
        className="favourite-sidebar-image"
      />
      <div className="favourite-sidebar-details">
        <p className="favourite-sidebar-price">£{property.price.toLocaleString()}</p>
        <p className="favourite-sidebar-location">{property.location.split(',')[0]}</p>
      </div>
      <button 
        className="btn-remove-sidebar"
        onClick={() => onRemove(property.id)}
        aria-label="Remove from favourites"
      >
        ✕
      </button>
    </div>
  );
};

// Favourites Sidebar Component
const FavouritesSidebar = ({ favourites, onRemove, onClear, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PROPERTY',
    drop: (item) => onDrop(item.property),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div 
      ref={drop}
      className={`favourites-sidebar ${isOver ? 'drop-hover' : ''}`}
    >
      <div className="favourites-sidebar-header">
        <h3>Favourites ({favourites.length})</h3>
        {favourites.length > 0 && (
          <button className="btn-clear-sidebar" onClick={onClear}>
            Clear All
          </button>
        )}
      </div>

      <div className="favourites-sidebar-content">
        {favourites.length === 0 ? (
          <div className="favourites-sidebar-empty">
            <p>No favourites yet</p>
            <p className="drop-hint">Drag properties here or click the favourite button</p>
          </div>
        ) : (
          <div className="favourites-sidebar-list">
            {favourites.map(property => (
              <DraggableFavouriteItem 
                key={property.id}
                property={property}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Drop Zone for Removing Favourites
const RemoveDropZone = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FAVOURITE',
    drop: (item) => onDrop(item.propertyId),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div 
      ref={drop}
      className={`remove-drop-zone ${isOver ? 'drop-hover-remove' : ''}`}
    >
      <span className="drop-zone-icon">🗑️</span>
      <span className="drop-zone-text">Drop here to remove</span>
    </div>
  );
};

// Main PropertiesList Component
const PropertiesList = ({ 
  favourites, 
  onAddToFavourites, 
  onRemoveFromFavourites, 
  onClearFavourites 
}) => {
  const handleDropToFavourites = (property) => {
    onAddToFavourites(property);
  };

  const handleDropToRemove = (propertyId) => {
    onRemoveFromFavourites(propertyId);
  };

  return (
    <div className="properties-list-container">
      <div className="properties-list-main">
        <h1>All Properties</h1>
        <p className="properties-count">Showing {propertiesData.properties.length} properties</p>
        
        <div className="properties-grid">
          {propertiesData.properties.map(property => {
            const isFavourite = favourites.some(fav => fav.id === property.id);
            return (
              <DraggablePropertyCard
                key={property.id}
                property={property}
                onAddToFavourites={onAddToFavourites}
                isFavourite={isFavourite}
              />
            );
          })}
        </div>
      </div>

      <div className="properties-list-sidebar-wrapper">
        <FavouritesSidebar 
          favourites={favourites}
          onRemove={onRemoveFromFavourites}
          onClear={onClearFavourites}
          onDrop={handleDropToFavourites}
        />
        
        {favourites.length > 0 && (
          <RemoveDropZone onDrop={handleDropToRemove} />
        )}
      </div>
    </div>
  );
};

export default PropertiesList;