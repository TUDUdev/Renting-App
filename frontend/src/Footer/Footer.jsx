import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>RentEase</h3>
            <p>Your trusted partner in finding the perfect rental space.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
          
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: info@rentease.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 RentEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;