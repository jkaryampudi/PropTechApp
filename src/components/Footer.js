import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          This website is for informational purposes only and does not constitute financial advice. 
          All investment decisions should be made in consultation with qualified financial professionals.
        </p>
        <p className="copyright">© 2025 NSW Property Insights. All rights reserved.</p>
      </div>
      <div className="footer-attribution">
        <a href="https://manus.im/invitation?from=space" target="_blank" rel="noopener noreferrer">
          Made with Manus
        </a>
      </div>
    </footer>
  );
};

export default Footer;
