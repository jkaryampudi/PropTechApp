import React from 'react';
import './MarketData.css';

const MarketData = () => {
  return (
    <div className="investment-insights">
      <h2 className="section-title">Investment Insights</h2>
      
      <div className="insights-grid">
        <div className="insight-card">
          <h3>Price History (10 Years)</h3>
          <div className="data-source">Data: CoreLogic</div>
          <div className="chart-container">
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color houses"></span>
                <span className="legend-label">Houses</span>
              </div>
              <div className="legend-item">
                <span className="legend-color units"></span>
                <span className="legend-label">Units</span>
              </div>
            </div>
            <div className="price-history-chart">
              <div className="y-axis">
                <div className="y-label">$1,100,000</div>
                <div className="y-label">$1,000,000</div>
                <div className="y-label">$900,000</div>
                <div className="y-label">$800,000</div>
                <div className="y-label">$700,000</div>
                <div className="y-label">$600,000</div>
              </div>
              <div className="chart-area">
                <svg width="100%" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">
                  {/* House price line */}
                  <path 
                    d="M50,150 L100,140 L150,130 L200,115 L250,100 L300,85 L350,70 L400,55 L450,40" 
                    stroke="#3498db" 
                    strokeWidth="3" 
                    fill="none" 
                  />
                  {/* House price area */}
                  <path 
                    d="M50,150 L100,140 L150,130 L200,115 L250,100 L300,85 L350,70 L400,55 L450,40 L450,200 L50,200 Z" 
                    fill="rgba(52, 152, 219, 0.1)" 
                  />
                  {/* Unit price line */}
                  <path 
                    d="M50,180 L100,180 L150,180 L200,170 L250,165 L300,160 L350,150 L400,140 L450,130" 
                    stroke="#e74c3c" 
                    strokeWidth="3" 
                    fill="none" 
                  />
                  {/* Unit price area */}
                  <path 
                    d="M50,180 L100,180 L150,180 L200,170 L250,165 L300,160 L350,150 L400,140 L450,130 L450,200 L50,200 Z" 
                    fill="rgba(231, 76, 60, 0.1)" 
                  />
                  {/* Data points for houses */}
                  <circle cx="50" cy="150" r="4" fill="#3498db" />
                  <circle cx="100" cy="140" r="4" fill="#3498db" />
                  <circle cx="150" cy="130" r="4" fill="#3498db" />
                  <circle cx="200" cy="115" r="4" fill="#3498db" />
                  <circle cx="250" cy="100" r="4" fill="#3498db" />
                  <circle cx="300" cy="85" r="4" fill="#3498db" />
                  <circle cx="350" cy="70" r="4" fill="#3498db" />
                  <circle cx="400" cy="55" r="4" fill="#3498db" />
                  <circle cx="450" cy="40" r="4" fill="#3498db" />
                  {/* Data points for units */}
                  <circle cx="50" cy="180" r="4" fill="#e74c3c" />
                  <circle cx="100" cy="180" r="4" fill="#e74c3c" />
                  <circle cx="150" cy="180" r="4" fill="#e74c3c" />
                  <circle cx="200" cy="170" r="4" fill="#e74c3c" />
                  <circle cx="250" cy="165" r="4" fill="#e74c3c" />
                  <circle cx="300" cy="160" r="4" fill="#e74c3c" />
                  <circle cx="350" cy="150" r="4" fill="#e74c3c" />
                  <circle cx="400" cy="140" r="4" fill="#e74c3c" />
                  <circle cx="450" cy="130" r="4" fill="#e74c3c" />
                </svg>
              </div>
              <div className="x-axis">
                <div className="x-label">2015</div>
                <div className="x-label">2017</div>
                <div className="x-label">2019</div>
                <div className="x-label">2021</div>
                <div className="x-label">2023</div>
                <div className="x-label">2025</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="insight-card">
          <h3>Rental Yield Trends</h3>
          <div className="data-source">Data: SQM Research</div>
          <div className="chart-container">
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color houses-bar"></span>
                <span className="legend-label">Houses</span>
              </div>
              <div className="legend-item">
                <span className="legend-color units-bar"></span>
                <span className="legend-label">Units</span>
              </div>
            </div>
            <div className="rental-yield-chart">
              <div className="y-axis">
                <div className="y-label">4.5%</div>
                <div className="y-label">4.0%</div>
                <div className="y-label">3.5%</div>
                <div className="y-label">3.0%</div>
                <div className="y-label">2.5%</div>
                <div className="y-label">2.0%</div>
                <div className="y-label">1.5%</div>
              </div>
              <div className="chart-area">
                <div className="bar-group">
                  <div className="bar-label">2021</div>
                  <div className="bar-container">
                    <div className="bar houses-bar" style={{ height: '70px' }}></div>
                    <div className="bar units-bar" style={{ height: '90px' }}></div>
                  </div>
                </div>
                <div className="bar-group">
                  <div className="bar-label">2022</div>
                  <div className="bar-container">
                    <div className="bar houses-bar" style={{ height: '75px' }}></div>
                    <div className="bar units-bar" style={{ height: '95px' }}></div>
                  </div>
                </div>
                <div className="bar-group">
                  <div className="bar-label">2023</div>
                  <div className="bar-container">
                    <div className="bar houses-bar" style={{ height: '80px' }}></div>
                    <div className="bar units-bar" style={{ height: '100px' }}></div>
                  </div>
                </div>
                <div className="bar-group">
                  <div className="bar-label">2024</div>
                  <div className="bar-container">
                    <div className="bar houses-bar" style={{ height: '85px' }}></div>
                    <div className="bar units-bar" style={{ height: '105px' }}></div>
                  </div>
                </div>
                <div className="bar-group">
                  <div className="bar-label">2025</div>
                  <div className="bar-container">
                    <div className="bar houses-bar" style={{ height: '90px' }}></div>
                    <div className="bar units-bar" style={{ height: '110px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketData;
