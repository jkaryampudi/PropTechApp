import React from 'react';
import './PropertyCard.css';
import { FaBed, FaBath, FaCar, FaRulerCombined, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';

const PropertyCard = ({ property = {}, onClick }) => {
  // Defensive checks for all properties
  const {
    id = 0,
    title = 'Property',
    address = '',
    price = 0,
    beds = 0,
    baths = 0,
    parking = 0,
    size = 0,
    image = '',
    investment = {},
    agent = {}
  } = property || {};

  const {
    rentalYield = 0,
    capitalGrowth = 0,
    weeklyCashflow = 0
  } = investment || {};

  const {
    name = '',
    listedDate = ''
  } = agent || {};

  // Safe formatting function
  const formatNumber = (num) => {
    if (num === undefined || num === null) return '0';
    return typeof num === 'number' ? num.toLocaleString() : num.toString();
  };

  return (
    <div className="property-card card-animated hover-lift">
      <div className="property-image">
        <img src={image || '/images/property-placeholder.jpg'} alt={title} />
        <div className="property-price">${formatNumber(price)}</div>
      </div>
      
      <div className="property-content">
        <h3 className="property-title">{title}</h3>
        <p className="property-address">
          <FaMapMarkerAlt style={{ marginRight: '5px' }} />
          {address}
        </p>
        
        <div className="property-specs">
          <div className="spec-item">
            <FaBed className="spec-icon" />
            <span className="spec-value">{beds}</span>
            <span className="spec-label">Beds</span>
          </div>
          
          <div className="spec-item">
            <FaBath className="spec-icon" />
            <span className="spec-value">{baths}</span>
            <span className="spec-label">Baths</span>
          </div>
          
          <div className="spec-item">
            <FaCar className="spec-icon" />
            <span className="spec-value">{parking}</span>
            <span className="spec-label">Parking</span>
          </div>
          
          <div className="spec-item">
            <FaRulerCombined className="spec-icon" />
            <span className="spec-value">{size}m²</span>
            <span className="spec-label">Area</span>
          </div>
        </div>
        
        <div className="property-metrics">
          <div className="metric-item">
            <div className="metric-value">{formatNumber(rentalYield)}%</div>
            <div className="metric-label">Rental Yield</div>
          </div>
          
          <div className="metric-item">
            <div className="metric-value">{formatNumber(capitalGrowth)}%</div>
            <div className="metric-label">Capital Growth</div>
          </div>
          
          <div className="metric-item">
            <div className="metric-value">${formatNumber(weeklyCashflow)}</div>
            <div className="metric-label">Weekly Cashflow</div>
          </div>
        </div>
        
        <div className="agent-section">
          <div className="agent-name">{name}</div>
          <div className="listing-date">Listed {listedDate}</div>
        </div>
        
        <button className="view-details-btn" onClick={onClick}>
          View Details <FaArrowRight className="btn-icon" />
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
