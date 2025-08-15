import React from 'react';
import { FiX, FiHeart, FiClock, FiUsers } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/RecipeModal.css';

const RecipeModal = ({ recipe, onClose, onToggleFavorite, isFavorite }) => {
  if (!recipe) return null;

  // Parse ingredients from recipe object
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`);
    }
  }

  // Build a short friendly description from available fields
  const shortDesc = (() => {
    const firstSentence = (recipe.strInstructions || '').split('.').map(s => s.trim()).filter(Boolean)[0] || '';
    const tags = (recipe.strTags || '').split(',').filter(Boolean).slice(0, 3).join(' • ');
    const bits = [firstSentence];
    if (tags) bits.push(`Tags: ${tags}`);
    return bits.filter(Boolean).join('  ·  ');
  })();

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="modal-content"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
          {/* Header grid: image + info */}
          <div className="modal-header">
            <img 
              src={recipe.strMealThumb} 
              alt={recipe.strMeal}
              className="modal-image"
            />
            <div className="modal-info">
            <div className="modal-header-row">
              <h2 className="modal-title">{recipe.strMeal}</h2>
              <button className={`favorite-btn-modal ${isFavorite ? 'active' : ''}`} onClick={() => onToggleFavorite(recipe)} aria-label="Toggle favorite">
                <FiHeart />
              </button>
            </div>
            <div className="modal-meta">
              <span className="category-badge">{recipe.strCategory}</span>
              <span className="area-badge">{recipe.strArea}</span>
              {recipe.strTags && (
                <span className="tag-badge">{recipe.strTags.split(',').slice(0,3).join(' • ')}</span>
              )}
            </div>
            <div className="modal-stats">
              <div className="stat-item">
                <FiClock />
                <span>30 min</span>
              </div>
              <div className="stat-item">
                <FiUsers />
                <span>4 servings</span>
              </div>
            </div>
            </div>
          </div>
          
          <div className="modal-body">
            <div className="about-section">
              <h3>About this dish</h3>
              <p className="about-text">{shortDesc || 'A delightful dish loved by many. Perfect for sharing and easy to cook at home.'}</p>
              <div className="divider" />
            </div>
            <div className="ingredients-section">
              <h3>Ingredients</h3>
              <ul className="ingredients-list">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="ingredient-item">
                    <span className="ingredient-bullet">•</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="instructions-section">
              <h3>Steps</h3>
              <div className="instructions-content">
                {recipe.strInstructions.split('\n').map((step, index) => (
                  step.trim() && (
                    <p key={index} className="instruction-step">{step.trim()}</p>
                  )
                ))}
              </div>
            </div>
            
            {recipe.strYoutube && (
              <div className="links-section">
                <a className="link-btn" href={recipe.strYoutube} target="_blank" rel="noreferrer">Watch Tutorial</a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RecipeModal;
