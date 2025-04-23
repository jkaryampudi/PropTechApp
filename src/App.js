import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FilterSection from './components/FilterSection';
import SuburbList from './components/SuburbList';
import SuburbProfile from './components/SuburbProfile';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <FilterSection />
              <div className="container">
                <SuburbList />
              </div>
            </>
          } />
          <Route path="/suburb/:suburbId" element={
            <div className="container">
              <SuburbProfile />
            </div>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
