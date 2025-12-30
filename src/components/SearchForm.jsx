import React, { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateAdded: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchCriteria);
  };

  // Handle reset
  const handleReset = () => {
    setSearchCriteria({
      type: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      postcode: '',
      dateAdded: ''
    });
    onSearch({
      type: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      postcode: '',
      dateAdded: ''
    });
  };

  return (
    <div className="search-form-container">
      <h2>Search for Properties</h2>
      <form onSubmit={handleSubmit} className="search-form">
        
        {/* Property Type */}
        <div className="form-group">
          <label htmlFor="type">Property Type</label>
          <select 
            id="type" 
            name="type" 
            value={searchCriteria.type}
            onChange={handleInputChange}
          >
            <option value="">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="minPrice">Min Price (£)</label>
            <input 
              type="number" 
              id="minPrice" 
              name="minPrice"
              placeholder="e.g. 200000"
              value={searchCriteria.minPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxPrice">Max Price (£)</label>
            <input 
              type="number" 
              id="maxPrice" 
              name="maxPrice"
              placeholder="e.g. 800000"
              value={searchCriteria.maxPrice}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="minBedrooms">Min Bedrooms</label>
            <input 
              type="number" 
              id="minBedrooms" 
              name="minBedrooms"
              min="1"
              placeholder="e.g. 2"
              value={searchCriteria.minBedrooms}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxBedrooms">Max Bedrooms</label>
            <input 
              type="number" 
              id="maxBedrooms" 
              name="maxBedrooms"
              min="1"
              placeholder="e.g. 4"
              value={searchCriteria.maxBedrooms}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Postcode */}
        <div className="form-group">
          <label htmlFor="postcode">Postcode Area</label>
          <input 
            type="text" 
            id="postcode" 
            name="postcode"
            placeholder="e.g. BR1, NW1"
            value={searchCriteria.postcode}
            onChange={handleInputChange}
          />
        </div>

        {/* Date Added */}
        <div className="form-group">
          <label htmlFor="dateAdded">Date Added (after)</label>
          <input 
            type="date" 
            id="dateAdded" 
            name="dateAdded"
            value={searchCriteria.dateAdded}
            onChange={handleInputChange}
          />
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit" className="btn-search">Search</button>
          <button type="button" className="btn-reset" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;