import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">NSW Property Insights</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/methodology">Methodology</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search suburbs..." />
        <button>Search</button>
      </div>
    </nav>
  );
};

export default Navbar;
