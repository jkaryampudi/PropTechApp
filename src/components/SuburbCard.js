import React from 'react';
import './SuburbCard.css';
import { FaHome, FaBuilding, FaChartLine, FaPercentage, FaCheck, FaArrowRight } from 'react-icons/fa';

const SuburbCard = ({ suburb = {}, onClick }) => {
  // Defensive checks for all properties
  const {
    image = '',
    name = 'Suburb',
    postcode = '',
    region = '',
    rating = 0,
    housePrice = 0,
    unitPrice = 0,
    rentalYield = 0,
    vacancyRate = 0,
    highlights = [],
    growthRate = 0
  } = suburb || {};

  // Safe formatting function
  const formatNumber = (num) => {
    if (num === undefined || num === null) return '0';
    return typeof num === 'number' ? num.toLocaleString() : num.toString();
  };

  // Format rating to one decimal place
  const formattedRating = typeof rating === 'number' ? rating.toFixed(1) : '0.0';

  // Determine rating color based on value
  const getRatingColor = (rating) => {
    if (rating >= 7.0) return '#0052FF'; // Blue for high ratings
    if (rating >= 5.0) return '#FFC107'; // Yellow for medium ratings
    return '#F44336'; // Red for low ratings
  };

  return (
    <div className="suburb-card card-animated hover-lift">
      <div className="suburb-image">
        <img src={image} alt={name} />
        <div className="rating-badge" style={{ backgroundColor: getRatingColor(rating) }}>
          {formattedRating}
        </div>
      </div>
      
      <div className="suburb-content">
        <h3 className="suburb-title">{name}</h3>
        <p className="suburb-location">{postcode}, {region}</p>
        
        <div className="price-section">
          <div className="price-item">
            <div className="price-icon house-icon">
              <FaHome />
            </div>
            <div>
              <div className="price-label">House Price</div>
              <div className="price-value">${formatNumber(housePrice)}</div>
            </div>
          </div>
          
          <div className="price-item">
            <div className="price-icon unit-icon">
              <FaBuilding />
            </div>
            <div>
              <div className="price-label">Unit price</div>
              <div className="price-value">${formatNumber(unitPrice)}</div>
            </div>
          </div>
        </div>
        
        <div className="yield-section">
          <div className="yield-item">
            <div className="yield-icon">
              <FaPercentage />
            </div>
            <div>
              <div className="yield-label">Rental Yield</div>
              <div className="yield-value">
                {formatNumber(rentalYield)}%
                <div className="trend-chart"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="highlights-section">
          {highlights.slice(0, 2).map((highlight, index) => (
            <div key={index} className="highlight-item">
              <FaCheck className="highlight-icon" />
              <span className="highlight-text">{highlight}</span>
            </div>
          ))}
        </div>
        
        <button className="view-profile-btn" onClick={onClick}>
          View Suburb Profile
        </button>
      </div>
    </div>
  );
};

export default SuburbCard;
