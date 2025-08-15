const API_KEY = process.env.REACT_APP_MEAL_API_KEY || '1'; // '1' is TheMealDB demo key
const API_BASE_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}`;

// Search recipes by ingredient or name
export const searchRecipes = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

// Get recipe details by ID
export const getRecipeDetails = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

// Search recipes by ingredient
export const searchByIngredient = async (ingredient) => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching by ingredient:', error);
    throw error;
  }
};
