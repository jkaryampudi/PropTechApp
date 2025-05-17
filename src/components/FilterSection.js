import React, { useState } from 'react';
import './FilterSection.css';
import { FaDollarSign, FaHome, FaBuilding, FaCity, FaChartLine, FaMoneyBillWave, FaBalanceScale, FaPercentage, FaUndo, FaFilter } from 'react-icons/fa';

const FilterSection = () => {
  const [activeStrategy, setActiveStrategy] = useState('all');
  const [priceRange, setPriceRange] = useState(300000);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [rentalYield, setRentalYield] = useState('any');

  const handleStrategyClick = (strategy) => {
    setActiveStrategy(strategy);
  };

  const handlePropertyTypeClick = (type) => {
    if (selectedPropertyTypes.includes(type)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter(t => t !== type));
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, type]);
    }
  };

  const handleReset = () => {
    setActiveStrategy('all');
    setPriceRange(300000);
    setSelectedPropertyTypes([]);
    setRentalYield('any');
  };

  return (
    <div className="filter-section card-animated">
      <div className="filter-header">
        <FaFilter className="filter-title-icon" />
        <h2>Investment Strategy</h2>
      </div>
      
      <div className="filter-grid">
        {/* Left column */}
        <div className="filter-column">
          <div className="filter-group">
            <div className="filter-label">
              <FaChartLine className="filter-icon" />
              <span>Strategy</span>
            </div>
            <div className="compact-options">
              <button 
                className={`compact-option ${activeStrategy === 'all' ? 'active' : ''}`}
                onClick={() => handleStrategyClick('all')}
              >
                <FaFilter className="option-icon" />
                <span>All</span>
              </button>
              <button 
                className={`compact-option ${activeStrategy === 'cashflow' ? 'active' : ''}`}
                onClick={() => handleStrategyClick('cashflow')}
              >
                <FaMoneyBillWave className="option-icon" />
                <span>Cashflow</span>
              </button>
              <button 
                className={`compact-option ${activeStrategy === 'growth' ? 'active' : ''}`}
                onClick={() => handleStrategyClick('growth')}
              >
                <FaChartLine className="option-icon" />
                <span>Growth</span>
              </button>
              <button 
                className={`compact-option ${activeStrategy === 'balanced' ? 'active' : ''}`}
                onClick={() => handleStrategyClick('balanced')}
              >
                <FaBalanceScale className="option-icon" />
                <span>Balanced</span>
              </button>
            </div>
          </div>
          
          <div className="filter-group">
            <div className="filter-label">
              <FaBuilding className="filter-icon" />
              <span>Property Type</span>
            </div>
            <div className="compact-options">
              <button 
                className={`compact-option ${selectedPropertyTypes.includes('house') ? 'active' : ''}`}
                onClick={() => handlePropertyTypeClick('house')}
              >
                <FaHome className="option-icon" />
                <span>House</span>
              </button>
              <button 
                className={`compact-option ${selectedPropertyTypes.includes('apartment') ? 'active' : ''}`}
                onClick={() => handlePropertyTypeClick('apartment')}
              >
                <FaBuilding className="option-icon" />
                <span>Apartment</span>
              </button>
              <button 
                className={`compact-option ${selectedPropertyTypes.includes('townhouse') ? 'active' : ''}`}
                onClick={() => handlePropertyTypeClick('townhouse')}
              >
                <FaCity className="option-icon" />
                <span>Townhouse</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Right column */}
        <div className="filter-column">
          <div className="filter-group">
            <div className="filter-label">
              <FaDollarSign className="filter-icon" />
              <span>Price Range</span>
            </div>
            <div className="slider-container">
              <input 
                type="range" 
                min="100000" 
                max="1000000" 
                step="50000" 
                value={priceRange} 
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="range-slider"
              />
              <div className="range-labels">
                <span>$100K</span>
                <span className="current-value">${(priceRange / 1000).toFixed(0)}K</span>
                <span>$1M</span>
              </div>
            </div>
          </div>
          
          <div className="filter-group">
            <div className="filter-label">
              <FaPercentage className="filter-icon" />
              <span>Rental Yield %</span>
            </div>
            <div className="compact-options">
              <button 
                className={`compact-option ${rentalYield === 'any' ? 'active' : ''}`}
                onClick={() => setRentalYield('any')}
              >
                <span>Any</span>
              </button>
              <button 
                className={`compact-option ${rentalYield === 'low' ? 'active' : ''}`}
                onClick={() => setRentalYield('low')}
              >
                <span>Low</span>
              </button>
              <button 
                className={`compact-option ${rentalYield === 'high' ? 'active' : ''}`}
                onClick={() => setRentalYield('high')}
              >
                <span>High</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="filter-actions">
        <button className="reset-btn" onClick={handleReset}>
          <FaUndo className="button-icon" />
          <span>Reset</span>
        </button>
        
        <button className="apply-btn">
          <span>Apply Filters</span>
          <FaFilter className="button-icon" />
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
