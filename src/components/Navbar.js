import React from 'react';
import './Navbar.css';
import { FaHome, FaInfoCircle, FaEnvelope, FaSearch, FaBuilding } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand animate-fade-in">
        <div className="brand-logo">
          <FaBuilding className="brand-icon" />
          <h1>J<span className="superscript">2</span> Prop Insights</h1>
        </div>
      </div>
      <div className="navbar-links">
        <a href="#home" className="navbar-link animate-fade-in hover-lift">
          <FaHome className="animate-float" />
        </a>
        <a href="#info" className="navbar-link animate-fade-in delay-100 hover-lift">
          <FaInfoCircle className="animate-float" />
        </a>
        <a href="#contact" className="navbar-link animate-fade-in delay-200 hover-lift">
          <FaEnvelope className="animate-float" />
        </a>
        <a href="#search" className="navbar-link animate-fade-in delay-300 hover-lift">
          <FaSearch className="animate-float" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
