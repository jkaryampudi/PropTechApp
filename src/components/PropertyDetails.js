import React, { useState, useEffect, useCallback, useRef } from 'react';
import './PropertyDetails.css';
import { FaBed, FaBath, FaCar, FaRulerCombined, FaCalendarAlt, FaChartLine, FaMapMarkerAlt } from 'react-icons/fa';
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';

const PropertyDetails = ({ property, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview'); // Changed default to overview to avoid map errors
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [directions, setDirections] = useState(null);
  const [routeAnimations, setRouteAnimations] = useState({});
  const [allAnimationsPlaying, setAllAnimationsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(3);
  const [distanceMarkers, setDistanceMarkers] = useState({});
  const [mapError, setMapError] = useState(false);
  
  const mapRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const amenityMarkersRef = useRef({});
  const animationIdsRef = useRef({});
  
  // Map container style
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '8px'
  };
  
  // Map options with custom styling
  const mapOptions = {
    mapTypeControl: false,
    streetViewControl: true,
    fullscreenControl: true,
    styles: [
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{ "color": "#dedede" }, { "lightness": 21 }]
      }
    ]
  };

  // Define amenity data with custom icons and route colors
  const amenities = {
    station: { 
      id: 'station',
      name: property?.amenities?.find(a => a.id === 'station')?.name || "Train Station",
      distance: property?.amenities?.find(a => a.id === 'station')?.distance || "350m",
      coordinates: property?.amenities?.find(a => a.id === 'station')?.coordinates || { lat: -33.891967, lng: 151.138269 },
      icon: "https://maps.google.com/mapfiles/kml/shapes/rail.png",
      routeColor: "#4285F4", // Google Blue
      transportMode: "WALKING"
    },
    shopping: { 
      id: 'shopping',
      name: property?.amenities?.find(a => a.id === 'shopping')?.name || "Shopping Centre",
      distance: property?.amenities?.find(a => a.id === 'shopping')?.distance || "500m",
      coordinates: property?.amenities?.find(a => a.id === 'shopping')?.coordinates || { lat: -33.887967, lng: 151.139869 },
      icon: "https://maps.google.com/mapfiles/kml/shapes/shopping.png",
      routeColor: "#EA4335", // Google Red
      transportMode: "WALKING"
    },
    school: { 
      id: 'school',
      name: property?.amenities?.find(a => a.id === 'school')?.name || "Public School",
      distance: property?.amenities?.find(a => a.id === 'school')?.distance || "750m",
      coordinates: property?.amenities?.find(a => a.id === 'school')?.coordinates || { lat: -33.892967, lng: 151.141869 },
      icon: "https://maps.google.com/mapfiles/kml/shapes/schools.png",
      routeColor: "#FBBC05", // Google Yellow
      transportMode: "WALKING"
    },
    medical: { 
      id: 'medical',
      name: property?.amenities?.find(a => a.id === 'medical')?.name || "Medical Centre",
      distance: property?.amenities?.find(a => a.id === 'medical')?.distance || "1.1km",
      coordinates: property?.amenities?.find(a => a.id === 'medical')?.coordinates || { lat: -33.885967, lng: 151.142869 },
      icon: "https://maps.google.com/mapfiles/kml/shapes/hospitals.png",
      routeColor: "#34A853", // Google Green
      transportMode: "WALKING"
    }
  };

  // Handle map load
  const onMapLoad = useCallback((map) => {
    try {
      mapRef.current = map;
      
      // Check if DirectionsService is available
      if (window.google && window.google.maps && window.google.maps.DirectionsService) {
        directionsServiceRef.current = new window.google.maps.DirectionsService();
      } else {
        console.warn("Google Maps DirectionsService not available");
        return;
      }
      
      // Add property marker
      const propertyMarker = new window.google.maps.Marker({
        position: property.coordinates,
        map: map,
        title: property.title,
        icon: {
          url: 'https://maps.google.com/mapfiles/kml/shapes/homegardenbusiness.png',
          scaledSize: new window.google.maps.Size(40, 40)
        },
        animation: window.google.maps.Animation.DROP
      });
      
      // Add property info window
      const propertyInfoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="max-width: 250px; padding: 10px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #2c3e50;">${property.title}</h3>
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #7f8c8d;">${property.address}</p>
            <p style="margin: 0; font-weight: bold; font-size: 16px; color: #3498db;">$${property.price.toLocaleString()}</p>
          </div>
        `
      });
      propertyInfoWindow.open(map, propertyMarker);
      
      // Add amenity markers and calculate routes
      Object.values(amenities).forEach(amenity => {
        // Create marker
        const amenityMarker = new window.google.maps.Marker({
          position: amenity.coordinates,
          map: map,
          title: amenity.name,
          icon: {
            url: amenity.icon,
            scaledSize: new window.google.maps.Size(32, 32)
          },
          animation: window.google.maps.Animation.DROP
        });
        
        // Store marker reference
        amenityMarkersRef.current[amenity.id] = amenityMarker;
        
        // Add info window
        const amenityInfoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="max-width: 200px; padding: 10px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #2c3e50;">${amenity.name}</h3>
              <p style="margin: 0; font-size: 14px; color: #7f8c8d;">Distance: ${amenity.distance}</p>
            </div>
          `
        });
        
        // Add click listener
        amenityMarker.addListener('click', () => {
          amenityInfoWindow.open(map, amenityMarker);
          animateRoute(amenity.id);
        });
        
        // Calculate route
        calculateRoute(amenity.id);
      });
      
      // Fit map to show all markers
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(property.coordinates);
      Object.values(amenities).forEach(amenity => {
        bounds.extend(amenity.coordinates);
      });
      map.fitBounds(bounds);
    } catch (error) {
      console.error("Error loading map:", error);
      setMapError(true);
    }
  }, [property]);
  
  // Calculate route between property and amenity
  const calculateRoute = useCallback((amenityId) => {
    if (!mapRef.current || !directionsServiceRef.current) return;
    
    const amenity = amenities[amenityId];
    
    try {
      directionsServiceRef.current.route(
        {
          origin: property.coordinates,
          destination: amenity.coordinates,
          travelMode: window.google.maps.TravelMode[amenity.transportMode]
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            // Store route path for animation
            const route = result.routes[0].overview_path;
            
            setRouteAnimations(prev => ({
              ...prev,
              [amenityId]: {
                path: route,
                currentIndex: 0,
                isPlaying: false,
                polyline: new window.google.maps.Polyline({
                  path: [],
                  geodesic: true,
                  strokeColor: amenity.routeColor,
                  strokeOpacity: 1.0,
                  strokeWeight: 5,
                  map: mapRef.current
                })
              }
            }));
            
            // Add distance and duration to amenity info
            const leg = result.routes[0].legs[0];
            
            // Create distance marker with transport icon
            const midpoint = Math.floor(route.length / 2);
            if (midpoint > 0) {
              const transportIcon = amenity.transportMode === "WALKING" ? 
                "https://maps.google.com/mapfiles/kml/shapes/walking.png" : 
                "https://maps.google.com/mapfiles/kml/shapes/cabs.png";
              
              // Create standard marker for distance
              try {
                const distanceMarker = new window.google.maps.Marker({
                  position: route[midpoint],
                  map: mapRef.current,
                  title: `${amenity.name}: ${leg.distance.text} (${leg.duration.text})`,
                  icon: {
                    url: transportIcon,
                    scaledSize: new window.google.maps.Size(24, 24)
                  },
                  visible: false
                });
                
                setDistanceMarkers(prev => ({
                  ...prev,
                  [amenityId]: distanceMarker
                }));
              } catch (error) {
                console.error("Error creating distance marker:", error);
              }
            }
          } else {
            console.error(`Directions request failed: ${status}`);
          }
        }
      );
    } catch (error) {
      console.error("Error calculating route:", error);
    }
  }, [property, amenities]);
  
  // Animate a specific route
  const animateRoute = useCallback((amenityId) => {
    try {
      const animation = routeAnimations[amenityId];
      if (!animation) return;
      
      // If animation is already playing, stop it
      if (animation.isPlaying) {
        stopAnimation(amenityId);
        return;
      }
      
      // Reset animation if it was previously played
      animation.currentIndex = 0;
      animation.polyline.setPath([]);
      
      // Add active class to amenity element
      const amenityElement = document.getElementById(`amenity-${amenityId}`);
      if (amenityElement) {
        amenityElement.classList.add('active');
        amenityElement.classList.add('pulse');
      }
      
      // Start animation
      setRouteAnimations(prev => ({
        ...prev,
        [amenityId]: {
          ...prev[amenityId],
          isPlaying: true
        }
      }));
      
      animateStep(amenityId);
      
      // Show distance marker
      if (distanceMarkers[amenityId] && distanceMarkers[amenityId].setVisible) {
        distanceMarkers[amenityId].setVisible(true);
      }
    } catch (error) {
      console.error("Error animating route:", error);
    }
  }, [routeAnimations, distanceMarkers]);
  
  // Animation step function
  const animateStep = useCallback((amenityId) => {
    try {
      const animation = routeAnimations[amenityId];
      if (!animation) return;
      
      const path = animation.path;
      const speed = 6 - animationSpeed; // Invert speed (1 = fastest, 5 = slowest)
      
      // If animation is complete, loop it
      if (animation.currentIndex >= path.length) {
        animation.currentIndex = 0;
        animation.polyline.setPath([]);
      }
      
      // Add next point to the polyline
      const currentPath = animation.polyline.getPath();
      currentPath.push(path[animation.currentIndex]);
      animation.currentIndex++;
      
      // Update distance marker position to follow the animation
      if (distanceMarkers[amenityId] && animation.currentIndex > Math.floor(path.length / 2)) {
        if (distanceMarkers[amenityId].setPosition) {
          distanceMarkers[amenityId].setPosition(path[Math.floor(path.length / 2)]);
          distanceMarkers[amenityId].setVisible(true);
        }
      }
      
      // Continue animation if not at the end
      if (animation.currentIndex < path.length) {
        animationIdsRef.current[amenityId] = setTimeout(() => {
          animateStep(amenityId);
        }, speed * 50); // Adjust speed based on slider
      } else {
        // When animation completes one cycle
        animationIdsRef.current[amenityId] = setTimeout(() => {
          if (animation.isPlaying) {
            animateStep(amenityId);
          }
        }, 1000); // Pause at the end before looping
      }
    } catch (error) {
      console.error("Error in animation step:", error);
    }
  }, [routeAnimations, animationSpeed, distanceMarkers]);
  
  // Stop animation for a specific route
  const stopAnimation = useCallback((amenityId) => {
    try {
      // Clear timeout
      if (animationIdsRef.current[amenityId]) {
        clearTimeout(animationIdsRef.current[amenityId]);
      }
      
      // Reset animation state
      setRouteAnimations(prev => ({
        ...prev,
        [amenityId]: {
          ...prev[amenityId],
          isPlaying: false
        }
      }));
      
      // Remove active class from amenity element
      const amenityElement = document.getElementById(`amenity-${amenityId}`);
      if (amenityElement) {
        amenityElement.classList.remove('active');
        amenityElement.classList.remove('pulse');
      }
      
      // Hide distance marker
      if (distanceMarkers[amenityId] && distanceMarkers[amenityId].setVisible) {
        distanceMarkers[amenityId].setVisible(false);
      }
    } catch (error) {
      console.error("Error stopping animation:", error);
    }
  }, [distanceMarkers]);
  
  // Toggle all animations
  const toggleAllAnimations = useCallback(() => {
    try {
      if (allAnimationsPlaying) {
        // Stop all animations
        Object.keys(routeAnimations).forEach(key => {
          stopAnimation(key);
        });
        setAllAnimationsPlaying(false);
      } else {
        // Start all animations
        Object.keys(routeAnimations).forEach(key => {
          if (!routeAnimations[key].isPlaying) {
            animateRoute(key);
          }
        });
        setAllAnimationsPlaying(true);
      }
    } catch (error) {
      console.error("Error toggling animations:", error);
    }
  }, [allAnimationsPlaying, routeAnimations, animateRoute, stopAnimation]);
  
  // Reset all animations
  const resetAnimations = useCallback(() => {
    try {
      // Stop all animations
      Object.keys(routeAnimations).forEach(key => {
        stopAnimation(key);
        if (routeAnimations[key].polyline && routeAnimations[key].polyline.setPath) {
          routeAnimations[key].polyline.setPath([]);
        }
      });
      
      setAllAnimationsPlaying(false);
    } catch (error) {
      console.error("Error resetting animations:", error);
    }
  }, [routeAnimations, stopAnimation]);
  
  // Update animation speed
  const handleSpeedChange = useCallback((e) => {
    setAnimationSpeed(parseInt(e.target.value));
  }, []);
  
  // Clean up animations on unmount
  useEffect(() => {
    const currentAnimationIds = { ...animationIdsRef.current };
    
    return () => {
      Object.keys(currentAnimationIds).forEach(key => {
        clearTimeout(currentAnimationIds[key]);
      });
    };
  }, []);

  // Handle map errors
  const handleMapError = useCallback((error) => {
    console.error("Google Maps Error:", error);
    setMapError(true);
  }, []);

  return (
    <div className="property-details-overlay">
      <div className="property-details-modal">
        <span className="close-btn" onClick={onClose}>&times;</span>
        
        <div className="property-header" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${property.image})`
        }}>
          <div className="property-header-content">
            <h2>{property.title}</h2>
            <p>{property.address}</p>
            <p className="price">${property.price.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="property-specs">
          <div className="spec">
            <div className="spec-icon"><FaBed /></div>
            <div className="spec-value">{property.beds}</div>
            <div className="spec-label">Bedrooms</div>
          </div>
          <div className="spec">
            <div className="spec-icon"><FaBath /></div>
            <div className="spec-value">{property.baths}</div>
            <div className="spec-label">Bathrooms</div>
          </div>
          <div className="spec">
            <div className="spec-icon"><FaCar /></div>
            <div className="spec-value">{property.parking}</div>
            <div className="spec-label">Parking</div>
          </div>
          <div className="spec">
            <div className="spec-icon"><FaRulerCombined /></div>
            <div className="spec-value">{property.size}</div>
            <div className="spec-label">Size (sqm)</div>
          </div>
          <div className="spec">
            <div className="spec-icon"><FaCalendarAlt /></div>
            <div className="spec-value">{property.year || 2020}</div>
            <div className="spec-label">Built</div>
          </div>
        </div>
        
        <div className="property-tabs">
          <div 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </div>
          <div 
            className={`tab ${activeTab === 'investment' ? 'active' : ''}`}
            onClick={() => setActiveTab('investment')}
          >
            Investment
          </div>
          <div 
            className={`tab ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </div>
          <div 
            className={`tab ${activeTab === 'location' ? 'active' : ''}`}
            onClick={() => setActiveTab('location')}
          >
            Location
          </div>
        </div>
        
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <h3>Property Overview</h3>
              <p>{property.description || "This stunning property offers modern living in a highly sought-after location. With spacious interiors and quality finishes throughout, this home represents an excellent opportunity for both homeowners and investors alike."}</p>
              
              <div className="property-highlights">
                <h3>Highlights</h3>
                <ul>
                  <li>Prime location in {property.suburb}</li>
                  <li>Close to public transport, shops and schools</li>
                  <li>Modern design with quality finishes</li>
                  <li>Open plan living areas with abundant natural light</li>
                  <li>Low maintenance property</li>
                </ul>
              </div>
            </div>
          )}
          
          {activeTab === 'investment' && (
            <div className="investment-tab">
              <h3>Investment Analysis</h3>
              
              <div className="investment-metrics">
                <div className="metric">
                  <div className="metric-icon"><FaChartLine /></div>
                  <div className="metric-value">{property.rentalYield || "3.8"}%</div>
                  <div className="metric-label">Rental Yield</div>
                </div>
                <div className="metric">
                  <div className="metric-icon"><FaChartLine /></div>
                  <div className="metric-value">${property.weeklyRent || 650}</div>
                  <div className="metric-label">Est. Weekly Rent</div>
                </div>
                <div className="metric">
                  <div className="metric-icon"><FaChartLine /></div>
                  <div className="metric-value">{property.vacancyRate || "1.2"}%</div>
                  <div className="metric-label">Vacancy Rate</div>
                </div>
                <div className="metric">
                  <div className="metric-icon"><FaChartLine /></div>
                  <div className="metric-value">{property.growthRate || "5.8"}%</div>
                  <div className="metric-label">5yr Growth Rate</div>
                </div>
              </div>
              
              <p>This property represents a solid investment opportunity in a high-demand area with strong rental returns and consistent capital growth. The suburb has shown resilience during market fluctuations and continues to attract both owner-occupiers and investors.</p>
            </div>
          )}
          
          {activeTab === 'features' && (
            <div className="features-tab">
              <h3>Property Features</h3>
              
              <div className="features-list">
                <h4>Interior</h4>
                <ul>
                  <li>Open plan living and dining area</li>
                  <li>Modern kitchen with stone countertops</li>
                  <li>Stainless steel appliances</li>
                  <li>Built-in wardrobes in all bedrooms</li>
                  <li>Air conditioning</li>
                  <li>Internal laundry</li>
                </ul>
                
                <h4>Exterior</h4>
                <ul>
                  <li>Private balcony/courtyard</li>
                  <li>Secure parking</li>
                  <li>Storage cage</li>
                  <li>Building security</li>
                </ul>
              </div>
            </div>
          )}
          
          {activeTab === 'location' && (
            <div className="location-tab">
              <h3>Location & Amenities</h3>
              
              {mapError ? (
                <div className="map-error">
                  <div className="map-error-container">
                    <FaMapMarkerAlt size={48} color="#0052FF" />
                    <h3>Map temporarily unavailable</h3>
                    <p>We're experiencing some issues loading the map. Please check back later.</p>
                  </div>
                  
                  <div className="amenities-list">
                    {Object.values(amenities).map(amenity => (
                      <div 
                        key={amenity.id}
                        id={`amenity-${amenity.id}`}
                        className="amenity"
                      >
                        <div className="amenity-icon" style={{ backgroundColor: amenity.routeColor }}>
                          {amenity.id.charAt(0).toUpperCase()}
                        </div>
                        <div className="amenity-details">
                          <h4>{amenity.name}</h4>
                          <p>{amenity.distance} away</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="map-container">
                    <LoadScript 
                      googleMapsApiKey="" 
                      onError={handleMapError}
                      loadingElement={<div>Loading map...</div>}
                    >
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={property.coordinates}
                        zoom={15}
                        options={mapOptions}
                        onLoad={onMapLoad}
                        onError={handleMapError}
                      />
                    </LoadScript>
                  </div>
                  
                  <div className="animation-controls">
                    <button 
                      className={`animation-btn ${allAnimationsPlaying ? 'active' : ''}`}
                      onClick={toggleAllAnimations}
                    >
                      {allAnimationsPlaying ? 'Pause All Routes' : 'Show All Routes'}
                    </button>
                    <button 
                      className="animation-btn"
                      onClick={resetAnimations}
                    >
                      Reset
                    </button>
                    <div className="animation-speed">
                      <label>Speed:</label>
                      <input 
                        type="range" 
                        min="1" 
                        max="5" 
                        value={animationSpeed} 
                        onChange={handleSpeedChange}
                      />
                    </div>
                  </div>
                  
                  <div className="route-legend">
                    <div className="route-item">
                      <div className="route-color" style={{ backgroundColor: "#4285F4" }}></div>
                      <div className="route-label">Train Station</div>
                    </div>
                    <div className="route-item">
                      <div className="route-color" style={{ backgroundColor: "#EA4335" }}></div>
                      <div className="route-label">Shopping</div>
                    </div>
                    <div className="route-item">
                      <div className="route-color" style={{ backgroundColor: "#FBBC05" }}></div>
                      <div className="route-label">School</div>
                    </div>
                    <div className="route-item">
                      <div className="route-color" style={{ backgroundColor: "#34A853" }}></div>
                      <div className="route-label">Medical</div>
                    </div>
                  </div>
                  
                  <div className="amenities-list">
                    {Object.values(amenities).map(amenity => (
                      <div 
                        key={amenity.id}
                        id={`amenity-${amenity.id}`}
                        className="amenity"
                        onClick={() => animateRoute(amenity.id)}
                      >
                        <div className="amenity-icon" style={{ backgroundColor: amenity.routeColor }}>
                          {amenity.id.charAt(0).toUpperCase()}
                        </div>
                        <div className="amenity-details">
                          <h4>{amenity.name}</h4>
                          <p>{amenity.distance} away</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
