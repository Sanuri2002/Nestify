import { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchForm.css';

function SearchForm({ onSearch }) {
  const [formData, setFormData] = useState({
    type: null,
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    dateFrom: null,
    dateTo: null,
    postcode: ''
  });

  // Options for React Select dropdowns
  const typeOptions = [
    { value: '', label: 'Any' },
    { value: 'House', label: 'House' },
    { value: 'Flat', label: 'Flat' }
  ];

  const priceOptions = [
    { value: '', label: 'No min' },
    { value: 200000, label: '£200,000' },
    { value: 300000, label: '£300,000' },
    { value: 400000, label: '£400,000' },
    { value: 500000, label: '£500,000' },
    { value: 750000, label: '£750,000' },
    { value: 1000000, label: '£1,000,000' }
  ];

  const maxPriceOptions = [
    { value: '', label: 'No max' },
    { value: 300000, label: '£300,000' },
    { value: 400000, label: '£400,000' },
    { value: 500000, label: '£500,000' },
    { value: 750000, label: '£750,000' },
    { value: 1000000, label: '£1,000,000' },
    { value: 1500000, label: '£1,500,000' }
  ];

  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5+' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert form data to search criteria
    const criteria = {
      type: formData.type?.value || '',
      minPrice: formData.minPrice?.value || '',
      maxPrice: formData.maxPrice?.value || '',
      minBedrooms: formData.minBedrooms?.value || '',
      maxBedrooms: formData.maxBedrooms?.value || '',
      dateFrom: formData.dateFrom,
      dateTo: formData.dateTo,
      postcode: formData.postcode
    };

    onSearch(criteria);
  };

  const handleReset = () => {
    setFormData({
      type: null,
      minPrice: null,
      maxPrice: null,
      minBedrooms: null,
      maxBedrooms: null,
      dateFrom: null,
      dateTo: null,
      postcode: ''
    });
    onSearch({
      type: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateFrom: null,
      dateTo: null,
      postcode: ''
    });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>Search Properties</h2>
      
      <div className="form-group">
        <label htmlFor="type">Property Type:</label>
        <Select
          id="type"
          options={typeOptions}
          value={formData.type}
          onChange={(option) => setFormData({ ...formData, type: option })}
          placeholder="Select type..."
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="minPrice">Min Price:</label>
          <Select
            id="minPrice"
            options={priceOptions}
            value={formData.minPrice}
            onChange={(option) => setFormData({ ...formData, minPrice: option })}
            placeholder="No min"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxPrice">Max Price:</label>
          <Select
            id="maxPrice"
            options={maxPriceOptions}
            value={formData.maxPrice}
            onChange={(option) => setFormData({ ...formData, maxPrice: option })}
            placeholder="No max"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="minBedrooms">Min Bedrooms:</label>
          <Select
            id="minBedrooms"
            options={bedroomOptions}
            value={formData.minBedrooms}
            onChange={(option) => setFormData({ ...formData, minBedrooms: option })}
            placeholder="Any"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxBedrooms">Max Bedrooms:</label>
          <Select
            id="maxBedrooms"
            options={bedroomOptions}
            value={formData.maxBedrooms}
            onChange={(option) => setFormData({ ...formData, maxBedrooms: option })}
            placeholder="Any"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dateFrom">Added After:</label>
          <DatePicker
            id="dateFrom"
            selected={formData.dateFrom}
            onChange={(date) => setFormData({ ...formData, dateFrom: date })}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date..."
            className="date-picker"
            isClearable
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateTo">Added Before:</label>
          <DatePicker
            id="dateTo"
            selected={formData.dateTo}
            onChange={(date) => setFormData({ ...formData, dateTo: date })}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date..."
            className="date-picker"
            isClearable
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="postcode">Postcode Area:</label>
        <input
          type="text"
          id="postcode"
          value={formData.postcode}
          onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
          placeholder="e.g. BR1, NW1"
          className="postcode-input"
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">Search</button>
        <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
}

export default SearchForm;