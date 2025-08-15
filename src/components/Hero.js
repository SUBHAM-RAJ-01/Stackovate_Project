import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-background"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          Discover Amazing <span className="gradient-text">Recipes</span>
        </h1>
        <p className="hero-subtitle">
          Find delicious meals with ingredients you have at home
        </p>
        <div className="hero-features">
          <div className="feature-item">
            <span>🍳</span>
            <span>Easy Cooking</span>
          </div>
          <div className="feature-item">
            <span>🥗</span>
            <span>Healthy Options</span>
          </div>
          <div className="feature-item">
            <span>⚡</span>
            <span>Quick Recipes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
