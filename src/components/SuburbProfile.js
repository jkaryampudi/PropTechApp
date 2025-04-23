import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Radar, Pie, Line, Bar } from 'react-chartjs-2';
import { useParams, useNavigate } from 'react-router-dom';
import './SuburbProfile.css';
import { FaInfoCircle, FaHome, FaChartBar, FaMapMarkedAlt, FaBed, FaBath, FaCar, FaRulerCombined, FaMapMarkerAlt, FaHeart, FaRegHeart, FaArrowLeft, FaTimes } from 'react-icons/fa';
import PropertyDetails from './PropertyDetails';
import propertyData from '../data/propertyData';
import suburbData from '../data/suburbData';
import householdData from '../data/householdData';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const SuburbProfile = ({ suburb: propSuburb, onClose }) => {
  const navigate = useNavigate();
  const { suburbId } = useParams();
  const [suburb, setSuburb] = useState(null);
  const [activeTab, setActiveTab] = useState('properties'); // Set properties as default active tab
  const [savedProperties, setSavedProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  
  // Initialize suburb from either props or URL parameter
  useEffect(() => {
    console.log("SuburbProfile useEffect - initializing suburb");
    console.log("propSuburb:", propSuburb);
    console.log("suburbId from URL:", suburbId);
    
    setIsLoading(true);
    
    let suburbToUse;
    if (propSuburb) {
      suburbToUse = propSuburb;
    } else if (suburbId) {
      // Find suburb by ID from the imported data
      const foundSuburb = suburbData.find(s => s.id === parseInt(suburbId));
      if (!foundSuburb) {
        console.error(`Suburb with ID ${suburbId} not found in data:`, suburbData);
      }
      suburbToUse = foundSuburb;
    }
    
    if (suburbToUse) {
      console.log("Setting suburb data:", suburbToUse);
      setSuburb(suburbToUse);
    } else {
      console.error("No suburb data available");
    }
    
    setIsLoading(false);
  }, [propSuburb, suburbId]);
  
  const formatCurrency = (value) => {
    return value.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })
      .replace(/\.00$/, '');
  };

  const toggleSaveProperty = (propertyId) => {
    if (savedProperties.includes(propertyId)) {
      setSavedProperties(savedProperties.filter(id => id !== propertyId));
    } else {
      setSavedProperties([...savedProperties, propertyId]);
    }
  };
  
  const handleViewDetails = (propertyId) => {
    console.log("Viewing property details for ID:", propertyId);
    const property = propertyData.find(p => p.id === propertyId);
    setSelectedProperty(property);
  };
  
  const handleClosePropertyDetails = () => {
    setSelectedProperty(null);
  };
  
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      // Navigate back to the main page
      navigate('/');
    }
  };

  // Add handler for tab navigation
  const handleTabClick = (tabName) => {
    console.log("Changing tab to:", tabName);
    setActiveTab(tabName);
  };

  // Debug function to log property data
  const debugPropertyData = () => {
    if (!suburb) {
      console.error("Cannot debug property data - suburb is null");
      return;
    }
    
    console.log("Current suburb name:", suburb.name);
    console.log("All property data:", propertyData);
    
    // Check if any properties match the current suburb
    const matchingProperties = propertyData.filter(property => {
      const matches = property.suburb === suburb.name;
      console.log(`Property ID ${property.id} suburb: "${property.suburb}" matches "${suburb.name}": ${matches}`);
      return matches;
    });
    
    console.log("Matching properties:", matchingProperties);
    console.log("Number of matching properties:", matchingProperties.length);
    
    // Check if properties have the suburb field
    const propertiesWithSuburbField = propertyData.filter(property => property.suburb !== undefined);
    console.log("Properties with suburb field:", propertiesWithSuburbField.length);
    
    // Log all suburb names from property data
    const suburbNames = [...new Set(propertyData.map(property => property.suburb))];
    console.log("All suburb names in property data:", suburbNames);
  };

  // Call debug function when Properties tab is active
  useEffect(() => {
    if (activeTab === 'properties' && suburb) {
      console.log("Properties tab is active, debugging property data");
      debugPropertyData();
    }
  }, [activeTab, suburb]);

  if (isLoading) {
    return <div className="loading">Loading suburb profile...</div>;
  }

  if (!suburb) {
    return <div className="error">No suburb data available</div>;
  }

  // Debug log to track tab changes
  console.log("Current active tab:", activeTab);

  // Get properties for the current suburb with fallback
  const getPropertiesForSuburb = () => {
    if (!suburb) return [];
    
    console.log("Getting properties for suburb:", suburb.name);
    
    // Try exact match first
    let matchingProperties = propertyData.filter(property => property.suburb === suburb.name);
    console.log("Properties with exact suburb match:", matchingProperties.length);
    
    // If no exact matches, try case-insensitive match
    if (matchingProperties.length === 0) {
      matchingProperties = propertyData.filter(property => 
        property.suburb && property.suburb.toLowerCase() === suburb.name.toLowerCase()
      );
      console.log("Properties with case-insensitive match:", matchingProperties.length);
    }
    
    // If still no matches, try address contains suburb name
    if (matchingProperties.length === 0) {
      matchingProperties = propertyData.filter(property => 
        property.address && property.address.includes(suburb.name)
      );
      console.log("Properties with address containing suburb name:", matchingProperties.length);
    }
    
    // If still no matches, show all properties as fallback
    if (matchingProperties.length === 0) {
      console.log("No matching properties found, showing all properties as fallback");
      return propertyData;
    }
    
    return matchingProperties;
  };

  // Investment Potential Radar Chart Data
  const radarData = {
    labels: ['Capital Growth', 'Rental Yield', 'Affordability', 'Infrastructure', 'Amenities', 'Transport'],
    datasets: [
      {
        label: 'This Suburb',
        data: [suburb.investmentPotential?.capitalGrowth || 8, 
               suburb.investmentPotential?.rentalYield || 7, 
               suburb.investmentPotential?.affordability || 6, 
               suburb.investmentPotential?.infrastructure || 7, 
               suburb.investmentPotential?.amenities || 8, 
               suburb.investmentPotential?.transport || 6],
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(52, 152, 219, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(52, 152, 219, 1)',
      },
      {
        label: 'Regional Average',
        data: [6, 5, 5, 6, 5, 7],
        backgroundColor: 'rgba(231, 76, 60, 0.2)',
        borderColor: 'rgba(231, 76, 60, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(231, 76, 60, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(231, 76, 60, 1)',
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
    maintainAspectRatio: true,
    responsive: true,
  };

  // Household Composition Pie Chart Data
  const pieData = {
    labels: householdData.map(item => item.name),
    datasets: [
      {
        data: householdData.map(item => item.value),
        backgroundColor: householdData.map(item => item.color),
        borderColor: householdData.map(item => item.color),
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: 'right',
      },
    },
    maintainAspectRatio: true,
    responsive: true,
  };

  // Price History Data
  const priceHistoryData = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Houses',
        data: [800000, 820000, 850000, 870000, 900000, 920000, 950000, 980000, 1020000, 1050000, 1100000],
        backgroundColor: 'rgba(52, 152, 219, 0.5)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Units',
        data: [730000, 735000, 730000, 750000, 760000, 770000, 780000, 790000, 810000, 830000, 850000],
        backgroundColor: 'rgba(231, 76, 60, 0.5)',
        borderColor: 'rgba(231, 76, 60, 1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const priceHistoryOptions = {
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price History (10 Years)',
      },
    },
    maintainAspectRatio: true,
    responsive: true,
  };

  // Rental Yield Trends Data
  const rentalYieldData = {
    labels: ['2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Houses',
        data: [2.3, 2.4, 2.5, 2.6, 2.7],
        backgroundColor: 'rgba(46, 204, 113, 1)',
        borderColor: 'rgba(46, 204, 113, 1)',
        borderWidth: 2,
      },
      {
        label: 'Units',
        data: [2.6, 2.7, 2.8, 2.9, 3.0],
        backgroundColor: 'rgba(243, 156, 18, 1)',
        borderColor: 'rgba(243, 156, 18, 1)',
        borderWidth: 2,
      },
    ],
  };

  const rentalYieldOptions = {
    scales: {
      y: {
        beginAtZero: false,
        min: 2.0,
        max: 4.5,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Rental Yield Trends',
      },
    },
    maintainAspectRatio: true,
    responsive: true,
  };

  return (
    <div className="suburb-profile-container">
      <div className="suburb-profile-header" style={{ 
        background: 'linear-gradient(to right, #3498db, #2ecc71)',
        color: 'white',
        padding: '20px',
        borderRadius: '8px 8px 0 0'
      }}>
        <button className="close-button" onClick={handleClose} style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          background: 'rgba(255, 255, 255, 0.3)',
          border: 'none',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <FaTimes color="white" />
        </button>
        
        <h1 style={{ margin: '0 0 5px 0', fontSize: '28px' }}>{suburb.name}</h1>
        <p style={{ margin: '0 0 20px 0', fontSize: '16px' }}>{suburb.postcode}, {suburb.region}, NSW</p>
        
        <div className="suburb-stats" style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '15px',
          marginBottom: '20px'
        }}>
          <div className="stat-box" style={{
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '15px',
            borderRadius: '8px',
            flex: '1',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '24px', margin: '0 0 5px 0' }}>{formatCurrency(suburb.medianHousePrice)} ↑</h2>
            <p style={{ margin: '0', fontSize: '14px' }}>Median House Price</p>
          </div>
          
          <div className="stat-box" style={{
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '15px',
            borderRadius: '8px',
            flex: '1',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '24px', margin: '0 0 5px 0' }}>{suburb.rentalYield}% →</h2>
            <p style={{ margin: '0', fontSize: '14px' }}>Gross Rental Yield</p>
          </div>
          
          <div className="stat-box" style={{
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '15px',
            borderRadius: '8px',
            flex: '1',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '24px', margin: '0 0 5px 0' }}>{suburb.capitalGrowth || 5.8}%</h2>
            <p style={{ margin: '0', fontSize: '14px' }}>5yr Capital Growth</p>
          </div>
          
          <div className="stat-box" style={{
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '15px',
            borderRadius: '8px',
            flex: '1',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '24px', margin: '0 0 5px 0' }}>{suburb.investmentScore || 8.5}/10</h2>
            <p style={{ margin: '0', fontSize: '14px' }}>Investment Score</p>
          </div>
        </div>
      </div>

      <div className="suburb-tabs" style={{
        display: 'flex',
        borderBottom: '1px solid #e0e0e0',
        background: 'white'
      }}>
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => handleTabClick('overview')}
          style={{
            padding: '15px 20px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'overview' ? '2px solid #3498db' : 'none',
            color: activeTab === 'overview' ? '#3498db' : '#666',
            fontWeight: activeTab === 'overview' ? 'bold' : 'normal',
            cursor: 'pointer'
          }}
        >
          <FaInfoCircle style={{ marginRight: '8px' }} /> Overview
        </button>
        <button 
          className={`tab ${activeTab === 'properties' ? 'active' : ''}`}
          onClick={() => handleTabClick('properties')}
          style={{
            padding: '15px 20px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'properties' ? '2px solid #3498db' : 'none',
            color: activeTab === 'properties' ? '#3498db' : '#666',
            fontWeight: activeTab === 'properties' ? 'bold' : 'normal',
            cursor: 'pointer'
          }}
        >
          <FaHome style={{ marginRight: '8px' }} /> Properties
        </button>
        <button 
          className={`tab ${activeTab === 'market' ? 'active' : ''}`}
          onClick={() => handleTabClick('market')}
          style={{
            padding: '15px 20px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'market' ? '2px solid #3498db' : 'none',
            color: activeTab === 'market' ? '#3498db' : '#666',
            fontWeight: activeTab === 'market' ? 'bold' : 'normal',
            cursor: 'pointer'
          }}
        >
          <FaChartBar style={{ marginRight: '8px' }} /> Market Data
        </button>
        <button 
          className={`tab ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => handleTabClick('map')}
          style={{
            padding: '15px 20px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'map' ? '2px solid #3498db' : 'none',
            color: activeTab === 'map' ? '#3498db' : '#666',
            fontWeight: activeTab === 'map' ? 'bold' : 'normal',
            cursor: 'pointer'
          }}
        >
          <FaMapMarkedAlt style={{ marginRight: '8px' }} /> Map
        </button>
      </div>

      <div className="tab-content" style={{ padding: '20px', background: 'white' }}>
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <h2>Suburb Highlights</h2>
            <ul className="highlights">
              {suburb.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>

            <div className="charts-container" style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '30px', 
              marginTop: '30px',
              marginBottom: '30px'
            }}>
              <div className="chart-box" style={{ 
                flex: '1', 
                minWidth: '300px', 
                border: '1px solid #eee', 
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ borderBottom: '2px solid #3498db', paddingBottom: '10px', marginBottom: '20px' }}>
                  Investment Potential
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: 'normal', 
                    backgroundColor: '#9b59b6', 
                    color: 'white',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    marginLeft: '10px'
                  }}>
                    Data: Combined Sources
                  </span>
                </h3>
                <div style={{ height: '300px' }}>
                  <Radar data={radarData} options={radarOptions} />
                </div>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '15px' }}>
                  Radar chart showing investment potential across key metrics compared to regional averages.
                </p>
              </div>

              <div className="chart-box" style={{ 
                flex: '1', 
                minWidth: '300px', 
                border: '1px solid #eee', 
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ borderBottom: '2px solid #3498db', paddingBottom: '10px', marginBottom: '20px' }}>
                  Household Composition
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: 'normal', 
                    backgroundColor: '#2ecc71', 
                    color: 'white',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    marginLeft: '10px'
                  }}>
                    Data: ABS
                  </span>
                </h3>
                <div style={{ height: '300px' }}>
                  <Pie data={pieData} options={pieOptions} />
                </div>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '15px' }}>
                  Breakdown of household types in the suburb.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="properties-tab">
            <h2 style={{ fontSize: '24px', margin: '0 0 20px 0' }}>Properties in {suburb.name}</h2>
            
            <div className="view-controls" style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
              borderBottom: '1px solid #eee',
              paddingBottom: '15px'
            }}>
              <div className="view-mode">
                <button 
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '8px 15px',
                    border: '1px solid #ddd',
                    background: viewMode === 'grid' ? '#f5f5f5' : 'white',
                    borderRadius: '4px 0 0 4px',
                    cursor: 'pointer'
                  }}
                >
                  Grid
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '8px 15px',
                    border: '1px solid #ddd',
                    borderLeft: 'none',
                    background: viewMode === 'list' ? '#f5f5f5' : 'white',
                    borderRadius: '0 4px 4px 0',
                    cursor: 'pointer'
                  }}
                >
                  List
                </button>
              </div>
              
              <div className="filters">
                <button style={{
                  padding: '8px 15px',
                  border: '1px solid #ddd',
                  background: 'white',
                  borderRadius: '4px',
                  marginRight: '10px',
                  cursor: 'pointer'
                }}>
                  Sort
                </button>
                <button style={{
                  padding: '8px 15px',
                  border: '1px solid #ddd',
                  background: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Filter
                </button>
              </div>
            </div>
            
            <p style={{ color: '#666', marginBottom: '20px' }}>
              Showing {getPropertiesForSuburb().length} properties in {suburb.name}
            </p>
            
            <div className="property-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
              gap: '20px'
            }}>
              {getPropertiesForSuburb().map(property => (
                <div className="property-card" key={property.id} style={{
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <div className="property-image" style={{ position: 'relative' }}>
                    {/* Blue rectangle placeholder for property image */}
                    <div style={{ 
                      backgroundColor: '#3498db', 
                      width: '100%', 
                      height: '200px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      padding: '10px',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}>
                      {formatCurrency(property.price)}
                    </div>
                    <button 
                      className="favorite-btn"
                      onClick={() => toggleSaveProperty(property.id)}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        color: savedProperties.includes(property.id) ? '#e74c3c' : 'white',
                        fontSize: '20px',
                        cursor: 'pointer'
                      }}
                    >
                      {savedProperties.includes(property.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>
                  
                  <div className="property-details" style={{ padding: '15px' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{property.title}</h3>
                    <p style={{ 
                      margin: '0 0 15px 0', 
                      color: '#666',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <FaMapMarkerAlt style={{ marginRight: '5px' }} /> {property.address}
                    </p>
                    
                    <div className="property-features" style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #eee',
                      paddingBottom: '15px',
                      marginBottom: '15px'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <FaBed style={{ color: '#666', marginBottom: '5px' }} />
                        <p style={{ margin: '0', fontSize: '16px' }}>{property.beds || property.bedrooms}</p>
                        <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>Beds</p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <FaBath style={{ color: '#666', marginBottom: '5px' }} />
                        <p style={{ margin: '0', fontSize: '16px' }}>{property.baths || property.bathrooms}</p>
                        <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>Baths</p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <FaCar style={{ color: '#666', marginBottom: '5px' }} />
                        <p style={{ margin: '0', fontSize: '16px' }}>{property.parking}</p>
                        <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>Parking</p>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <FaRulerCombined style={{ color: '#666', marginBottom: '5px' }} />
                        <p style={{ margin: '0', fontSize: '16px' }}>{property.size}m²</p>
                        <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>Area</p>
                      </div>
                    </div>
                    
                    <div className="investment-metrics" style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '15px'
                    }}>
                      <div style={{ 
                        background: '#e8f4fc', 
                        padding: '8px 12px', 
                        borderRadius: '4px',
                        textAlign: 'center',
                        flex: '1',
                        marginRight: '8px'
                      }}>
                        <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>
                          {property.investment?.rentalYield || '3.5'}%
                        </p>
                        <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>Rental Yield</p>
                      </div>
                      <div style={{ 
                        background: '#e8f8f0', 
                        padding: '8px 12px', 
                        borderRadius: '4px',
                        textAlign: 'center',
                        flex: '1',
                        marginRight: '8px'
                      }}>
                        <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>
                          {property.investment?.capitalGrowth || '5.2'}%
                        </p>
                        <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>Capital Growth</p>
                      </div>
                      <div style={{ 
                        background: '#fdf9e8', 
                        padding: '8px 12px', 
                        borderRadius: '4px',
                        textAlign: 'center',
                        flex: '1'
                      }}>
                        <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>
                          ${property.investment?.weeklyCashflow || '25'}
                        </p>
                        <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>Weekly Cashflow</p>
                      </div>
                    </div>
                    
                    <div className="agent-info" style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '15px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img 
                          src={`https://randomuser.me/api/portraits/thumb/${property.id % 2 === 0 ? 'men' : 'women'}/${property.id * 10}.jpg`} 
                          alt="Agent" 
                          style={{ 
                            width: '30px', 
                            height: '30px', 
                            borderRadius: '50%',
                            marginRight: '10px'
                          }}
                        />
                        <span>{property.id % 2 === 0 ? 'Robert Brown' : 'Jessica Smith'}</span>
                      </div>
                      <span style={{ color: '#999', fontSize: '14px' }}>
                        Listed {property.id % 2 === 0 ? '5' : '28'} Mar 2025
                      </span>
                    </div>
                    
                    <div className="property-actions" style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <button 
                        className="view-details-btn"
                        onClick={() => handleViewDetails(property.id)}
                        style={{
                          background: '#3498db',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '10px 20px',
                          flex: '1',
                          marginRight: '10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        View Details →
                      </button>
                      <button 
                        className="favorite-btn-outline"
                        onClick={() => toggleSaveProperty(property.id)}
                        style={{
                          background: 'white',
                          color: savedProperties.includes(property.id) ? '#e74c3c' : '#666',
                          border: `1px solid ${savedProperties.includes(property.id) ? '#e74c3c' : '#ddd'}`,
                          borderRadius: '4px',
                          padding: '10px',
                          cursor: 'pointer'
                        }}
                      >
                        {savedProperties.includes(property.id) ? <FaHeart /> : <FaRegHeart />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {getPropertiesForSuburb().length === 0 && (
              <div className="no-properties-message" style={{
                textAlign: 'center',
                padding: '40px',
                background: '#f9f9f9',
                borderRadius: '8px'
              }}>
                <p>No properties found for this suburb. Please check back later for new listings.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'market' && (
          <div className="market-tab">
            <h2>Market Data</h2>
            
            <div className="market-charts-container" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '30px', 
              marginTop: '20px' 
            }}>
              <div className="chart-box" style={{ 
                border: '1px solid #eee', 
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ margin: '0' }}>Price History (10 Years)</h3>
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: 'normal', 
                    backgroundColor: '#3498db', 
                    color: 'white',
                    padding: '3px 8px',
                    borderRadius: '12px'
                  }}>
                    Data: CoreLogic
                  </span>
                </div>
                <div style={{ height: '350px' }}>
                  <Line data={priceHistoryData} options={priceHistoryOptions} />
                </div>
              </div>

              <div className="chart-box" style={{ 
                border: '1px solid #eee', 
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ margin: '0' }}>Rental Yield Trends</h3>
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: 'normal', 
                    backgroundColor: '#3498db', 
                    color: 'white',
                    padding: '3px 8px',
                    borderRadius: '12px'
                  }}>
                    Data: SQM Research
                  </span>
                </div>
                <div style={{ height: '350px' }}>
                  <Bar data={rentalYieldData} options={rentalYieldOptions} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="location-tab">
            <h2>Location & Amenities</h2>
            <div className="map-container" style={{ height: '450px', marginBottom: '20px' }}>
              <iframe
                title="Suburb Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0, borderRadius: '8px' }}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBQgCnA9zBPCxuRXQm-o_H1Pers5yjRPP8&q=${suburb.name},+NSW,+Australia`}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
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

export default SuburbProfile;
