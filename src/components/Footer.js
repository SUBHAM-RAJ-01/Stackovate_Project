import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiGithub } from 'react-icons/fi';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="footer-title gradient-text">About</h4>
            <p className="footer-text">AquaBite helps you discover tasty meals quickly. Search by ingredients or dish names and save your favorites with a clean, modern UI.</p>
          </div>
          <div className="footer-col">
            <h4 className="footer-title gradient-text">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#search">Search</a></li>
              <li><a href="#favorites">Favorites</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-title gradient-text">Contact</h4>
            <ul className="footer-links">
              <li>Email: hello@aquabite.app</li>
              <li>Support: support@aquabite.app</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-title gradient-text">Follow Us</h4>
            <div className="social-row">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FiFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FiTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p> {new Date().getFullYear()} AquaBite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
