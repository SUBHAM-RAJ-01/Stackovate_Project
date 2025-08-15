import React from 'react';
import { FiHeart, FiClock, FiUsers } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../styles/Favorites.css';

const Favorites = ({ favorites, onRecipeClick, onToggleFavorite, isFavorite }) => {
  if (favorites.length === 0) {
    return (
      <section id="favorites" className="favorites-section">
        <div className="favorites-container">
          <div className="empty-favorites">
            <div className="empty-icon">
              <FiHeart />
            </div>
            <h2>No Favorites Yet</h2>
            <p>Start exploring recipes and add your favorites here!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="favorites" className="favorites-section">
      <div className="favorites-container">
        <div className="favorites-header">
          <h2 className="favorites-title">
            <FiHeart className="title-icon" />
            Your Favorite Recipes
          </h2>
          <p className="favorites-count">{favorites.length} saved recipes</p>
        </div>
        
        <div className="favorites-grid">
          {favorites.map((recipe, index) => (
            <motion.div
              key={recipe.idMeal}
              className="favorite-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => onRecipeClick(recipe.idMeal)}
            >
              <div className="card-image-wrapper">
                <img 
                  src={recipe.strMealThumb} 
                  alt={recipe.strMeal}
                  className="card-image"
                />
                <button
                  className="remove-favorite-btn active"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(recipe);
                  }}
                >
                  <FaHeart />
                </button>
              </div>
              
              <div className="card-content">
                <h3 className="card-title">{recipe.strMeal}</h3>
                <div className="card-meta">
                  <div className="meta-item">
                    <FiClock />
                    <span>30 min</span>
                  </div>
                  <div className="meta-item">
                    <FiUsers />
                    <span>4 servings</span>
                  </div>
                </div>
                <p className="card-category">{recipe.strCategory}</p>
              </div>
              
              <div className="card-overlay">
                <span>View Recipe</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
