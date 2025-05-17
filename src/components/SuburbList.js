import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuburbCard from './SuburbCard';
import PropertyCard from './PropertyCard';
import PropertyDetails from './PropertyDetails';
import suburbData from '../data/suburbData';
import propertyData from '../data/propertyData';
import './SuburbList.css';
import { FaHome, FaChartBar, FaBuilding, FaStar, FaMapMarkedAlt, FaArrowRight } from 'react-icons/fa';

const SuburbList = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showAllCards, setShowAllCards] = useState(false);
  const navigate = useNavigate();
  
  const handleViewPropertyDetails = (propertyId) => {
    console.log("Viewing property details for property ID:", propertyId);
    const property = propertyData.find(p => p.id === propertyId);
    setSelectedProperty(property);
  };
  
  const handleClosePropertyDetails = () => {
    setSelectedProperty(null);
  };

  const handleViewSuburbProfile = (suburbId) => {
    console.log("Viewing suburb profile for suburb ID:", suburbId);
    navigate(`/suburb/${suburbId}`);
  };
  
  // Select top 5 featured properties based on investment potential
  // Combining rental yield and capital growth as criteria
  const featuredProperties = [...propertyData]
    .sort((a, b) => {
      const scoreA = (a.investment?.rentalYield || 0) + (a.investment?.capitalGrowth || 0);
      const scoreB = (b.investment?.rentalYield || 0) + (b.investment?.capitalGrowth || 0);
      return scoreB - scoreA;
    })
    .slice(0, 5);
  
  // Get top 2 suburbs and top 2 properties for the unified row
  const topSuburbs = suburbData.slice(0, 2);
  const topProperties = featuredProperties.slice(0, 2);
  
  // Get remaining suburbs and properties for expanded view
  const remainingSuburbs = suburbData.slice(2);
  const remainingProperties = featuredProperties.slice(2);
  
  return (
    <div className="suburb-list-container">
      <h2 className="section-title">
        <FaStar className="section-icon" />
        Top Investment Opportunities
      </h2>
      
      <div className="unified-card-row">
        {topSuburbs.map(suburb => (
          <div key={suburb.id} className="card-wrapper">
            <div className="card-label">High-Potential Suburb</div>
            <SuburbCard 
              suburb={{
                ...suburb,
                postcode: suburb.postcode || suburb.location?.split(',')[0] || '',
                region: suburb.region || suburb.location?.split(',')[1]?.trim() || 'Metropolitan',
                rating: suburb.rating || (Math.random() * 3 + 5).toFixed(1),
                housePrice: suburb.medianPrice || 0,
                unitPrice: suburb.unitPrice || Math.floor(suburb.medianPrice * 0.7) || 0,
                highlights: suburb.highlights || [
                  'Close to transport links',
                  'Vibrant urban precinct',
                  'Growing demand for housing'
                ].slice(0, 2)
              }}
              onClick={() => handleViewSuburbProfile(suburb.id)}
            />
          </div>
        ))}
        
        {topProperties.map(property => (
          <div key={property.id} className="card-wrapper">
            <div className="card-label">Featured Property</div>
            <PropertyCard 
              property={property}
              onClick={() => handleViewPropertyDetails(property.id)}
            />
          </div>
        ))}
      </div>
      
      {showAllCards && (
        <div className="expanded-sections">
          <div className="section-column">
            <h3 className="subsection-title">
              <FaMapMarkedAlt className="section-icon" />
              More High-Potential Suburbs
            </h3>
            
            <div className="suburb-grid">
              {remainingSuburbs.map(suburb => (
                <div key={suburb.id} className="suburb-card-wrapper">
                  <SuburbCard 
                    suburb={{
                      ...suburb,
                      postcode: suburb.postcode || suburb.location?.split(',')[0] || '',
                      region: suburb.region || suburb.location?.split(',')[1]?.trim() || 'Metropolitan',
                      rating: suburb.rating || (Math.random() * 3 + 5).toFixed(1),
                      housePrice: suburb.medianPrice || 0,
                      unitPrice: suburb.unitPrice || Math.floor(suburb.medianPrice * 0.7) || 0,
                      highlights: suburb.highlights || [
                        'Close to transport links',
                        'Vibrant urban precinct',
                        'Growing demand for housing'
                      ].slice(0, 2)
                    }}
                    onClick={() => handleViewSuburbProfile(suburb.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="section-column">
            <h3 className="subsection-title">
              <FaStar className="section-icon" />
              More Featured Properties
            </h3>
            
            <div className="property-grid">
              {remainingProperties.map(property => (
                <div key={property.id} className="property-card-wrapper">
                  <PropertyCard 
                    property={property}
                    onClick={() => handleViewPropertyDetails(property.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="view-more-container">
        <button 
          className="view-more-btn" 
          onClick={() => setShowAllCards(!showAllCards)}
        >
          {showAllCards ? 'Show Less' : 'View More Opportunities'} 
          <FaArrowRight className="btn-icon" />
        </button>
      </div>
      
      {selectedProperty && (
        <PropertyDetails 
          property={selectedProperty} 
          onClose={handleClosePropertyDetails} 
        />
      )}
    </div>
  );
};

export default SuburbList;
