import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import { FaArrowRight, FaChartLine, FaHome, FaBuilding, FaMoneyBillWave, FaPercentage, FaCity } from 'react-icons/fa';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Add scroll animation detection
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Add parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Set visible after a short delay for entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Calculate parallax movement
  const getParallaxStyle = (depth) => {
    return {
      transform: `translate(${mousePosition.x * depth * -30}px, ${mousePosition.y * depth * -30}px)`
    };
  };

  // Investment icons with animations
  const investmentIcons = [
    { icon: <FaHome />, top: '15%', left: '10%', animation: 'floatAnimation 8s ease-in-out infinite', delay: '0s' },
    { icon: <FaBuilding />, top: '25%', left: '85%', animation: 'floatAnimation 7s ease-in-out infinite', delay: '0.5s' },
    { icon: <FaChartLine />, top: '70%', left: '15%', animation: 'floatAnimation 9s ease-in-out infinite', delay: '1s' },
    { icon: <FaMoneyBillWave />, top: '65%', left: '80%', animation: 'floatAnimation 6s ease-in-out infinite', delay: '1.5s' },
    { icon: <FaPercentage />, top: '40%', left: '5%', animation: 'floatAnimation 10s ease-in-out infinite', delay: '2s' },
    { icon: <FaCity />, top: '20%', left: '60%', animation: 'floatAnimation 8s ease-in-out infinite', delay: '2.5s' }
  ];

  return (
    <div className="hero-section bg-animated">
      {/* Animated particles background */}
      <div className="particles-container">
        {Array.from({ length: 20 }).map((_, index) => (
          <div 
            key={index} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Floating investment icons */}
      {investmentIcons.map((item, index) => (
        <div 
          key={index}
          className={`floating-icon ${isVisible ? 'visible' : ''}`}
          style={{
            top: item.top,
            left: item.left,
            animation: item.animation,
            animationDelay: item.delay,
            ...getParallaxStyle(Math.random() * 0.5 + 0.5)
          }}
        >
          {item.icon}
        </div>
      ))}
      
      {/* Animated graph lines */}
      <div className="graph-container" style={getParallaxStyle(0.2)}>
        <div className="graph-line line1"></div>
        <div className="graph-line line2"></div>
        <div className="graph-line line3"></div>
        <div className="graph-dot dot1"></div>
        <div className="graph-dot dot2"></div>
        <div className="graph-dot dot3"></div>
        <div className="graph-dot dot4"></div>
      </div>
      
      <div className="hero-content">
        <h1 className={`animate-fade-in ${isVisible ? 'visible' : ''}`}>
          Discover High-Yield Suburbs
          <span className="highlight-text">
            <span className="text-animated">Investment Opportunities</span>
          </span>
        </h1>
        <p className={`animate-fade-in delay-200 ${isVisible ? 'visible' : ''}`}>
          Uncover investment opportunities across Australia
        </p>
        <button className={`cta-button btn-animated animate-fade-in delay-400 animate-ripple ${isVisible ? 'visible' : ''}`}>
          <span className="btn-shine"></span>
          Explore Opportunities
          <FaArrowRight className="animate-float" />
        </button>
      </div>
      
      {/* Investment metrics animation */}
      <div className={`investment-metrics ${isVisible ? 'visible' : ''}`} style={getParallaxStyle(0.1)}>
        <div className="metric">
          <div className="metric-value">7.2%</div>
          <div className="metric-label">Avg. Rental Yield</div>
          <div className="metric-bar">
            <div className="metric-bar-fill"></div>
          </div>
        </div>
        <div className="metric">
          <div className="metric-value">12.4%</div>
          <div className="metric-label">Capital Growth</div>
          <div className="metric-bar">
            <div className="metric-bar-fill"></div>
          </div>
        </div>
        <div className="metric">
          <div className="metric-value">8.9/10</div>
          <div className="metric-label">Investment Score</div>
          <div className="metric-bar">
            <div className="metric-bar-fill"></div>
          </div>
        </div>
      </div>
      
      <div className="hero-illustration animate-fade-in delay-300">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Network of connected dots representing property network - enhanced for visual appeal */}
          <circle cx="200" cy="200" r="5" fill="white" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2s" repeatCount="indefinite" />
            <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="250" r="5" fill="white" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2s" repeatCount="indefinite" begin="0.3s" />
            <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="600" cy="220" r="5" fill="white" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2s" repeatCount="indefinite" begin="0.5s" />
            <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="800" cy="250" r="5" fill="white" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2s" repeatCount="indefinite" begin="0.2s" />
            <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" begin="1.5s" />
          </circle>
          <circle cx="1000" cy="180" r="5" fill="white" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2s" repeatCount="indefinite" begin="0.1s" />
            <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" begin="2s" />
          </circle>
          
          <line x1="200" y1="200" x2="400" y2="250" stroke="white" strokeWidth="1" opacity="0.2">
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
            <animate attributeName="stroke-width" values="1;2;1" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="400" y1="250" x2="600" y2="220" stroke="white" strokeWidth="1" opacity="0.2">
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" begin="0.5s" />
            <animate attributeName="stroke-width" values="1;2;1" dur="3s" repeatCount="indefinite" begin="0.5s" />
          </line>
          <line x1="600" y1="220" x2="800" y2="250" stroke="white" strokeWidth="1" opacity="0.2">
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" begin="1s" />
            <animate attributeName="stroke-width" values="1;2;1" dur="3s" repeatCount="indefinite" begin="1s" />
          </line>
          <line x1="800" y1="250" x2="1000" y2="180" stroke="white" strokeWidth="1" opacity="0.2">
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" begin="1.5s" />
            <animate attributeName="stroke-width" values="1;2;1" dur="3s" repeatCount="indefinite" begin="1.5s" />
          </line>
          
          {/* Animated investment graph */}
          <path d="M200,500 Q300,450 400,480 T600,430 T800,450 T1000,400" stroke="#0052FF" strokeWidth="3" fill="none" opacity="0.6">
            <animate attributeName="d" values="M200,500 Q300,450 400,480 T600,430 T800,450 T1000,400;M200,500 Q300,470 400,460 T600,410 T800,430 T1000,380;M200,500 Q300,450 400,480 T600,430 T800,450 T1000,400" dur="10s" repeatCount="indefinite" />
          </path>
          
          <path d="M200,520 Q300,490 400,510 T600,480 T800,500 T1000,470" stroke="#4C8BFF" strokeWidth="2" fill="none" opacity="0.4">
            <animate attributeName="d" values="M200,520 Q300,490 400,510 T600,480 T800,500 T1000,470;M200,520 Q300,500 400,490 T600,460 T800,480 T1000,450;M200,520 Q300,490 400,510 T600,480 T800,500 T1000,470" dur="8s" repeatCount="indefinite" />
          </path>
          
          {/* Building silhouettes with enhanced animations */}
          <rect x="300" y="500" width="50" height="100" fill="white" opacity="0.15">
            <animate attributeName="height" values="0;100" dur="1.5s" fill="freeze" />
            <animate attributeName="y" values="600;500" dur="1.5s" fill="freeze" />
          </rect>
          <rect x="370" y="520" width="40" height="80" fill="white" opacity="0.12">
            <animate attributeName="height" values="0;80" dur="1.2s" fill="freeze" begin="0.3s" />
            <animate attributeName="y" values="600;520" dur="1.2s" fill="freeze" begin="0.3s" />
          </rect>
          <rect x="430" y="540" width="60" height="60" fill="white" opacity="0.1">
            <animate attributeName="height" values="0;60" dur="1s" fill="freeze" begin="0.5s" />
            <animate attributeName="y" values="600;540" dur="1s" fill="freeze" begin="0.5s" />
          </rect>
          <rect x="510" y="480" width="45" height="120" fill="white" opacity="0.13">
            <animate attributeName="height" values="0;120" dur="1.7s" fill="freeze" begin="0.2s" />
            <animate attributeName="y" values="600;480" dur="1.7s" fill="freeze" begin="0.2s" />
          </rect>
          <rect x="575" y="510" width="55" height="90" fill="white" opacity="0.11">
            <animate attributeName="height" values="0;90" dur="1.4s" fill="freeze" begin="0.4s" />
            <animate attributeName="y" values="600;510" dur="1.4s" fill="freeze" begin="0.4s" />
          </rect>
          <rect x="650" y="490" width="70" height="110" fill="white" opacity="0.14">
            <animate attributeName="height" values="0;110" dur="1.6s" fill="freeze" begin="0.1s" />
            <animate attributeName="y" values="600;490" dur="1.6s" fill="freeze" begin="0.1s" />
          </rect>
          <rect x="740" y="530" width="50" height="70" fill="white" opacity="0.09">
            <animate attributeName="height" values="0;70" dur="1.1s" fill="freeze" begin="0.6s" />
            <animate attributeName="y" values="600;530" dur="1.1s" fill="freeze" begin="0.6s" />
          </rect>
          <rect x="810" y="500" width="60" height="100" fill="white" opacity="0.12">
            <animate attributeName="height" values="0;100" dur="1.5s" fill="freeze" begin="0.3s" />
            <animate attributeName="y" values="600;500" dur="1.5s" fill="freeze" begin="0.3s" />
          </rect>
          <rect x="890" y="520" width="40" height="80" fill="white" opacity="0.1">
            <animate attributeName="height" values="0;80" dur="1.3s" fill="freeze" begin="0.4s" />
            <animate attributeName="y" values="600;520" dur="1.3s" fill="freeze" begin="0.4s" />
          </rect>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
