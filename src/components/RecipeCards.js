import React from 'react';
import { FiHeart, FiClock, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';
import '../styles/RecipeCards.css';

const RecipeCards = ({ recipes, onRecipeClick, onToggleFavorite, isFavorite }) => {
  return (
    <section className="recipes-section">
      <div className="recipes-container">
        <div className="recipes-grid">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.idMeal}
              className="recipe-card"
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
                  className={`favorite-btn ${isFavorite(recipe.idMeal) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    onToggleFavorite(recipe);
                  }}
                >
                  <FiHeart />
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

export default RecipeCards;
