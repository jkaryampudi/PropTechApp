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
import { FaInfoCircle, FaHome, FaChartBar, FaMapMarkedAlt, FaBed, FaBath, FaCar, FaRulerCombined, FaMapMarkerAlt, FaHeart, FaRegHeart, FaArrowLeft, FaTimes, FaArrowRight } from 'react-icons/fa';
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
            
            {/* Updated property grid with exactly 3 columns */}
            <div className="property-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              background: '#f9fbfd'
            }}>
              {getPropertiesForSuburb().map(property => (
                <div className="property-card" key={property.id} style={{
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  background: 'white',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Property image with price overlay */}
                  <div className="property-image" style={{ 
                    position: 'relative',
                    height: '200px',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={property.image || '/images/property-placeholder.jpg'} 
                      alt={property.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                    />
                    <div className="property-price" style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      background: '#1a3a6d',
                      color: 'white',
                      padding: '8px 16px',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}>
                      {formatCurrency(property.price)}
                    </div>
                  </div>
                  
                  {/* Property content */}
                  <div className="property-content" style={{
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1
                  }}>
                    {/* Property title */}
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      {property.title}
                    </h3>
                    
                    {/* Property address */}
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      margin: '0 0 16px 0',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <FaMapMarkerAlt style={{ marginRight: '5px', color: '#0052FF' }} />
                      {property.address}
                    </p>
                    
                    {/* Property specs */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                      borderBottom: '1px solid #f0f0f0',
                      paddingBottom: '16px'
                    }}>
                      {/* Beds */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}>
                        <FaBed style={{ color: '#0052FF', fontSize: '18px', marginBottom: '4px' }} />
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{property.beds}</span>
                        <span style={{ fontSize: '12px', color: '#666' }}>Beds</span>
                      </div>
                      
                      {/* Baths */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}>
                        <FaBath style={{ color: '#0052FF', fontSize: '18px', marginBottom: '4px' }} />
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{property.baths}</span>
                        <span style={{ fontSize: '12px', color: '#666' }}>Baths</span>
                      </div>
                      
                      {/* Parking */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}>
                        <FaCar style={{ color: '#0052FF', fontSize: '18px', marginBottom: '4px' }} />
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{property.parking}</span>
                        <span style={{ fontSize: '12px', color: '#666' }}>Parking</span>
                      </div>
                      
                      {/* Area */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}>
                        <FaRulerCombined style={{ color: '#0052FF', fontSize: '18px', marginBottom: '4px' }} />
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{property.size}m²</span>
                        <span style={{ fontSize: '12px', color: '#666' }}>Area</span>
                      </div>
                    </div>
                    
                    {/* Investment metrics */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                      borderBottom: '1px solid #f0f0f0',
                      paddingBottom: '16px'
                    }}>
                      {/* Rental Yield */}
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold', color: '#0052FF', fontSize: '16px' }}>
                          {property.investment?.rentalYield || 3.5}%
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>Rental Yield</div>
                      </div>
                      
                      {/* Capital Growth */}
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold', color: '#0052FF', fontSize: '16px' }}>
                          {property.investment?.capitalGrowth || 6.4}%
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>Capital Growth</div>
                      </div>
                      
                      {/* Weekly Cashflow */}
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold', color: '#0052FF', fontSize: '16px' }}>
                          ${property.investment?.weeklyCashflow || 35}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>Weekly Cashflow</div>
                      </div>
                    </div>
                    
                    {/* Agent info */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '16px'
                    }}>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                        {property.agent?.name || 'Jessica Smith'}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        Listed {property.agent?.listedDate || '28 Mar 2025'}
                      </div>
                    </div>
                    
                    {/* View Details button */}
                    <button 
                      onClick={() => handleViewDetails(property.id)}
                      style={{
                        backgroundColor: '#0052FF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '12px',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: 'auto',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      View Details <FaArrowRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'market' && (
          <div className="market-tab">
            <h2>Market Data</h2>
            
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
                  Price History
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: 'normal', 
                    backgroundColor: '#e74c3c', 
                    color: 'white',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    marginLeft: '10px'
                  }}>
                    Data: CoreLogic
                  </span>
                </h3>
                <div style={{ height: '300px' }}>
                  <Line data={priceHistoryData} options={priceHistoryOptions} />
                </div>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '15px' }}>
                  Historical price trends for houses and units in {suburb.name} over the past 10 years.
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
                  Rental Yield Trends
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: 'normal', 
                    backgroundColor: '#f39c12', 
                    color: 'white',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    marginLeft: '10px'
                  }}>
                    Data: SQM Research
                  </span>
                </h3>
                <div style={{ height: '300px' }}>
                  <Bar data={rentalYieldData} options={rentalYieldOptions} />
                </div>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '15px' }}>
                  Rental yield trends for houses and units in {suburb.name} over the past 5 years.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="map-tab">
            <h2>Location & Amenities</h2>
            <div className="map-container" style={{ height: '400px', marginBottom: '20px' }}>
              {/* Placeholder for Google Maps */}
              <div style={{ 
                backgroundColor: '#f5f5f5', 
                width: '100%', 
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}>
                Map view is currently unavailable
              </div>
            </div>
            
            <div className="amenities-container">
              <h3>Nearby Amenities</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '15px',
                marginTop: '15px'
              }}>
                <div className="amenity-card" style={{
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  padding: '15px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#3498db' }}>Schools</h4>
                  <ul style={{ paddingLeft: '20px', margin: '0' }}>
                    <li>Gregory Hills Public School</li>
                    <li>St Gregory's College</li>
                    <li>Macarthur Anglican School</li>
                  </ul>
                </div>
                
                <div className="amenity-card" style={{
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  padding: '15px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#3498db' }}>Shopping</h4>
                  <ul style={{ paddingLeft: '20px', margin: '0' }}>
                    <li>Gregory Hills Town Centre</li>
                    <li>Narellan Town Centre</li>
                    <li>Macarthur Square</li>
                  </ul>
                </div>
                
                <div className="amenity-card" style={{
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  padding: '15px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#3498db' }}>Transport</h4>
                  <ul style={{ paddingLeft: '20px', margin: '0' }}>
                    <li>Bus Routes 301, 302</li>
                    <li>Leppington Train Station</li>
                    <li>M5 Motorway Access</li>
                  </ul>
                </div>
                
                <div className="amenity-card" style={{
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  padding: '15px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#3498db' }}>Healthcare</h4>
                  <ul style={{ paddingLeft: '20px', margin: '0' }}>
                    <li>Gregory Hills Medical Centre</li>
                    <li>Campbelltown Hospital</li>
                    <li>Camden Hospital</li>
                  </ul>
                </div>
              </div>
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
