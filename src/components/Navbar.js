import React from 'react';
import { FiSun, FiMoon, FiHeart, FiHome } from 'react-icons/fi';
import { GiForkKnifeSpoon } from 'react-icons/gi';
import '../styles/Navbar.css';

const Navbar = ({ darkMode, setDarkMode, showFavorites, setShowFavorites }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <GiForkKnifeSpoon className="logo-icon" aria-hidden="true" />
          <span className="logo-text" aria-label="AquaBite">AquaBite</span>
        </div>
        
        <div className="nav-menu">
          <button 
            className={`nav-item ${!showFavorites ? 'active' : ''}`}
            onClick={() => setShowFavorites(false)}
            aria-label="Go to Home"
          >
            <FiHome />
            <span>Home</span>
          </button>
          
          <button 
            className={`nav-item ${showFavorites ? 'active' : ''}`}
            onClick={() => setShowFavorites(true)}
            aria-label="View Favorites"
          >
            <FiHeart />
            <span>Favorites</span>
          </button>
          
          <button 
            className="nav-item theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
