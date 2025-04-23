import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SuburbCard.css';
import { FaArrowUp, FaArrowRight, FaChartLine } from 'react-icons/fa';

const SuburbCard = ({ suburb }) => {
  const navigate = useNavigate();
  
  // Function to determine which arrow icon to show based on trend
  const getTrendIcon = (value, type) => {
    if (type === 'price' || type === 'vacancy') {
      return value.includes('↑') ? <FaArrowUp className="trend-up" /> : <FaArrowRight className="trend-neutral" />;
    } else {
      return value.includes('→') ? <FaArrowRight className="trend-neutral" /> : <FaArrowUp className="trend-up" />;
    }
  };

  // Function to get color class based on investment score
  const getScoreColorClass = (score) => {
    const numericScore = parseFloat(score);
    if (numericScore >= 8.0) return 'score-high';
    if (numericScore >= 7.0) return 'score-medium';
    return 'score-low';
  };

  // Extract numeric value from price string
  const extractPrice = (priceStr) => {
    return priceStr.replace(/[^\d]/g, '');
  };
  
  // Extract score value without "/10"
  const extractScore = (scoreStr) => {
    return scoreStr.replace('/10', '');
  };
  
  // Handle view profile click
  const handleViewProfile = () => {
    console.log("Navigating to suburb profile with ID:", suburb.id);
    navigate(`/suburb/${suburb.id}`);
  };

  return (
    <div className="suburb-card">
      <div className="suburb-card-header" style={{ backgroundImage: `url(${suburb.imageUrl || '/images/sydney-skyline.jpeg'})` }}>
        <div className="suburb-overlay">
          <h2 className="suburb-name">{suburb.name}</h2>
          <p className="suburb-location">{suburb.postcode}, {suburb.region}</p>
          <div className={`investment-score ${getScoreColorClass(suburb.investmentScore)}`}>
            <span>{extractScore(suburb.investmentScore)}</span>
            <small>/10</small>
          </div>
        </div>
      </div>
      
      <div className="suburb-card-body">
        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-icon house-icon">
              <span>🏠</span>
            </div>
            <div className="metric-content">
              <h3>House Price</h3>
              <p className="metric-value">${extractPrice(suburb.medianHousePrice)}
                <span className="trend-indicator">{getTrendIcon(suburb.medianHousePrice, 'price')}</span>
              </p>
            </div>
          </div>
          
          <div className="metric-item">
            <div className="metric-icon unit-icon">
              <span>🏢</span>
            </div>
            <div className="metric-content">
              <h3>Unit Price</h3>
              <p className="metric-value">${extractPrice(suburb.medianUnitPrice)}
                <span className="trend-indicator">{getTrendIcon(suburb.medianUnitPrice, 'price')}</span>
              </p>
            </div>
          </div>
          
          <div className="metric-item">
            <div className="metric-icon yield-icon">
              <span>💰</span>
            </div>
            <div className="metric-content">
              <h3>Rental Yield</h3>
              <p className="metric-value">{suburb.grossRentalYield}
                <span className="trend-indicator">{getTrendIcon(suburb.grossRentalYield, 'yield')}</span>
              </p>
            </div>
          </div>
          
          <div className="metric-item">
            <div className="metric-icon vacancy-icon">
              <span>🔑</span>
            </div>
            <div className="metric-content">
              <h3>Vacancy Rate</h3>
              <p className="metric-value">{suburb.vacancyRate}
                <span className="trend-indicator">{getTrendIcon(suburb.vacancyRate, 'vacancy')}</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="price-trend-chart">
          <h3><FaChartLine /> Price Trend (5 Years)</h3>
          <div className="chart-placeholder">
            <div className="chart-line"></div>
          </div>
        </div>
        
        <div className="suburb-highlights">
          <div className="highlight-item">
            <span className="highlight-icon">⭐</span>
            <span className="highlight-text">{suburb.highlights && suburb.highlights[0] ? suburb.highlights[0] : 'Strong capital growth potential'}</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">📈</span>
            <span className="highlight-text">{suburb.highlights && suburb.highlights[1] ? suburb.highlights[1] : 'Developing infrastructure'}</span>
          </div>
        </div>
      </div>
      
      <button className="view-profile-btn" onClick={handleViewProfile}>
        View Suburb Profile
        <span className="btn-arrow">→</span>
      </button>
    </div>
  );
};

export default SuburbCard;
