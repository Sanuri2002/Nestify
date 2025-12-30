import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchForm from './components/SearchForm';
import FavouritesBar from './components/FavouritesBar';
import PropertiesList from './components/PropertiesList';
import PropertyDetails from './components/PropertyDetails';
import './App.css';

// Import properties data
import propertiesData from './data/properties.json';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Convert month name to number
  const getMonthNumber = (monthName) => {
    const months = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return months[monthName] || 0;
  };

  // Handle search
  const handleSearch = (criteria) => {
    setHasSearched(true);
    let results = [...propertiesData.properties];

    // Filter by type
    if (criteria.type) {
      results = results.filter(prop => 
        prop.type.toLowerCase() === criteria.type.toLowerCase()
      );
    }

    // Filter by price range
    if (criteria.minPrice) {
      results = results.filter(prop => prop.price >= Number(criteria.minPrice));
    }
    if (criteria.maxPrice) {
      results = results.filter(prop => prop.price <= Number(criteria.maxPrice));
    }

    // Filter by bedrooms
    if (criteria.minBedrooms) {
      results = results.filter(prop => prop.bedrooms >= Number(criteria.minBedrooms));
    }
    if (criteria.maxBedrooms) {
      results = results.filter(prop => prop.bedrooms <= Number(criteria.maxBedrooms));
    }

    // Filter by postcode
    if (criteria.postcode) {
      results = results.filter(prop => 
        prop.location.toUpperCase().includes(criteria.postcode.toUpperCase())
      );
    }

    // Filter by date range
    if (criteria.dateFrom || criteria.dateTo) {
      results = results.filter(prop => {
        const propDate = new Date(
          prop.added.year, 
          getMonthNumber(prop.added.month), 
          prop.added.day
        );
        
        let matchesFrom = true;
        let matchesTo = true;
        
        if (criteria.dateFrom) {
          matchesFrom = propDate >= criteria.dateFrom;
        }
        
        if (criteria.dateTo) {
          matchesTo = propDate <= criteria.dateTo;
        }
        
        return matchesFrom && matchesTo;
      });
    }

    setSearchResults(results);
  };

  // Add to favourites
  const handleAddToFavourites = (property) => {
    // Check if property is already in favourites
    if (!favourites.find(fav => fav.id === property.id)) {
      setFavourites([...favourites, property]);
      alert(`${property.location} has been added to your favourites!`);
    } else {
      alert('This property is already in your favourites!');
    }
  };

  // Remove from favourites
  const handleRemoveFromFavourites = (propertyId) => {
    setFavourites(favourites.filter(fav => fav.id !== propertyId));
  };

  // Clear all favourites
  const handleClearFavourites = () => {
    if (window.confirm('Are you sure you want to clear all favourites?')) {
      setFavourites([]);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            {/* Search Property Page - Route: / */}
            <Route 
              path="/" 
              element={
                <>
                  <SearchForm onSearch={handleSearch} />
                  <FavouritesBar 
                    favourites={favourites}
                    onRemove={handleRemoveFromFavourites}
                    onClear={handleClearFavourites}
                  />
                </>
              } 
            />
            
            {/* Properties List Page - Route: /property-list */}
            <Route 
              path="/property-list" 
              element={
                <PropertiesList 
                  onAddToFavourites={handleAddToFavourites}
                />
              } 
            />

            {/* Property Details Page - Route: /property/:id */}
            <Route 
              path="/property/:id" 
              element={
                <PropertyDetails 
                  onAddToFavourites={handleAddToFavourites}
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;