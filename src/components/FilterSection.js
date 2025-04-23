import React, { useState } from 'react';
import './FilterSection.css';

const FilterSection = () => {
  const [filters, setFilters] = useState({
    investmentStrategy: 'All Strategies',
    propertyType: 'All Types',
    priceRange: [300000, 500000],
    rentalYield: [2, 10],
    capitalGrowth: 'Any',
    region: 'All Regions'
  });

  const handleReset = () => {
    setFilters({
      investmentStrategy: 'All Strategies',
      propertyType: 'All Types',
      priceRange: [300000, 500000],
      rentalYield: [2, 10],
      capitalGrowth: 'Any',
      region: 'All Regions'
    });
  };

  const handleApplyFilters = () => {
    // In a real application, this would filter the data
    console.log('Applying filters:', filters);
  };

  return (
    <div className="filter-section">
      <h2>Filter Suburbs</h2>
      <div className="filters-container">
        <div className="filter-group">
          <label>Investment Strategy</label>
          <select 
            value={filters.investmentStrategy}
            onChange={(e) => setFilters({...filters, investmentStrategy: e.target.value})}
          >
            <option>All Strategies</option>
            <option>Capital Growth</option>
            <option>High Yield</option>
            <option>Balanced</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Property Type</label>
          <select
            value={filters.propertyType}
            onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
          >
            <option>All Types</option>
            <option>House</option>
            <option>Unit/Apartment</option>
            <option>Townhouse</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Price Range</label>
          <input 
            type="range" 
            min="300000" 
            max="5000000" 
            value={filters.priceRange[1]} 
            onChange={(e) => setFilters({...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)]})}
          />
          <div className="range-labels">
            <span>$300k</span>
            <span>$5M+</span>
          </div>
        </div>

        <div className="filter-group">
          <label>Rental Yield (%)</label>
          <input 
            type="range" 
            min="2" 
            max="10" 
            value={filters.rentalYield[1]} 
            onChange={(e) => setFilters({...filters, rentalYield: [filters.rentalYield[0], parseInt(e.target.value)]})}
          />
          <div className="range-labels">
            <span>2%</span>
            <span>10%</span>
          </div>
        </div>

        <div className="filter-group">
          <label>Capital Growth Potential</label>
          <select
            value={filters.capitalGrowth}
            onChange={(e) => setFilters({...filters, capitalGrowth: e.target.value})}
          >
            <option>Any</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Region/LGA</label>
          <select
            value={filters.region}
            onChange={(e) => setFilters({...filters, region: e.target.value})}
          >
            <option>All Regions</option>
            <option>Sydney Inner</option>
            <option>Sydney Eastern Suburbs</option>
            <option>Western Sydney</option>
            <option>Northern Sydney</option>
            <option>Southern Sydney</option>
            <option>Central Coast</option>
            <option>Newcastle</option>
            <option>Wollongong</option>
            <option>Regional NSW</option>
          </select>
        </div>
      </div>
      
      <div className="filter-actions">
        <button className="reset-btn" onClick={handleReset}>Reset</button>
        <button className="apply-btn" onClick={handleApplyFilters}>Apply Filters</button>
      </div>
    </div>
  );
};

export default FilterSection;
