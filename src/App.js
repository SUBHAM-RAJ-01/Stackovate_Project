import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import DietPills from './components/DietPills';
import RecipeCards from './components/RecipeCards';
import RecipeModal from './components/RecipeModal';
import Favorites from './components/Favorites';
import Footer from './components/Footer';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorMessage from './components/ErrorMessage';
import './styles/DietPills.css';
import { searchRecipes, getRecipeDetails } from './utils/api';
import Pagination from './components/Pagination';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All'); // meal type
  const [activeDiet, setActiveDiet] = useState('All'); // Veg / Non-Veg
  const [showFavorites, setShowFavorites] = useState(false);
  const [lastQuery, setLastQuery] = useState('');
  const [page, setPage] = useState(1);
  const [favPage, setFavPage] = useState(1);
  const PAGE_SIZE = 6;

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('recipeFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    try {
      setLastQuery(query); // remember last query for retry
      const results = await searchRecipes(query);
      setRecipes(results);
      setPage(1);
      if (results.length === 0) {
        setError('No recipes found. Try different ingredients!');
      }
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = async (recipeId) => {
    try {
      const recipeDetails = await getRecipeDetails(recipeId);
      setSelectedRecipe(recipeDetails);
    } catch (err) {
      setError('Failed to load recipe details.');
    }
  };

  const toggleFavorite = (recipe) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.idMeal === recipe.idMeal);
      if (exists) {
        return prev.filter(fav => fav.idMeal !== recipe.idMeal);
      } else {
        return [...prev, recipe];
      }
    });
  };

  const isFavorite = (recipeId) => {
    return favorites.some(fav => fav.idMeal === recipeId);
  };

  // Heuristic Veg classifier
  const isVeg = (r) => {
    const nonVegWords = ['chicken','beef','pork','lamb','goat','fish','tuna','salmon','prawn','shrimp','crab','mutton','bacon','ham','sausage','anchovy'];
    const cats = (r.strCategory || '').toLowerCase();
    if (['dessert','vegetarian','vegan'].includes(cats)) return true;
    // Scan ingredients
    for (let i = 1; i <= 20; i++) {
      const ing = (r[`strIngredient${i}`] || '').toLowerCase();
      if (!ing) continue;
      if (nonVegWords.some(w => ing.includes(w))) return false;
    }
    // If no meat found and not an explicit meat category, treat as veg
    const meatCats = ['beef','chicken','lamb','pork','seafood','goat'];
    if (meatCats.includes(cats)) return false;
    return true;
  };

  // Derive filtered list by meal type + diet (Veg/Non-Veg)
  const filteredRecipes = (() => {
    let base = recipes;
    // Meal type mapping
    if (activeFilter === 'Breakfast') {
      base = base.filter(r => (r.strCategory || '').toLowerCase() === 'breakfast');
    } else if (activeFilter === 'Dinner') {
      const dinnerCats = new Set(['beef','chicken','lamb','pork','seafood','goat']);
      base = base.filter(r => dinnerCats.has((r.strCategory || '').toLowerCase()));
    } else if (activeFilter === 'Lunch') {
      const exclude = new Set(['breakfast','dessert']);
      base = base.filter(r => !exclude.has((r.strCategory || '').toLowerCase()));
    } // 'All' leaves base unchanged

    // Diet filter
    if (activeDiet === 'Veg') {
      base = base.filter(r => isVeg(r));
    } else if (activeDiet === 'Non-Veg') {
      base = base.filter(r => !isVeg(r));
    }
    return base;
  })();

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [activeFilter, activeDiet]);

  // Derived pagination values for recipes
  const totalRecipes = filteredRecipes.length;
  const pagedRecipes = filteredRecipes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Favorites pagination
  const totalFavorites = favorites.length;
  const pagedFavorites = favorites.slice((favPage - 1) * PAGE_SIZE, favPage * PAGE_SIZE);
  useEffect(() => { setFavPage(1); }, [showFavorites]);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />
      
      {!showFavorites ? (
        <>
          <Hero />
          
          <div className="search-filter-section">
            <FilterDropdown activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            <DietPills activeDiet={activeDiet} setActiveDiet={setActiveDiet} />
            <SearchBar onSearch={handleSearch} />
          </div>

          
          {loading && <LoadingSkeleton />}
          {error && <ErrorMessage message={error} onRetry={() => lastQuery && handleSearch(lastQuery)} />}
          {!loading && !error && totalRecipes > 0 && (
            <RecipeCards 
              recipes={pagedRecipes}
              onRecipeClick={handleRecipeClick}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          )}
          {!loading && !error && totalRecipes > 0 && (
            <Pagination
              total={totalRecipes}
              page={page}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          )}
          {!loading && !error && recipes.length > 0 && filteredRecipes.length === 0 && (
            <ErrorMessage message={"No matching recipes with selected filters."} onRetry={() => setActiveDiet('All')} />
          )}
        </>
      ) : (
        <Favorites 
          favorites={pagedFavorites}
          onRecipeClick={handleRecipeClick}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}

      {showFavorites && totalFavorites > 0 && (
        <Pagination
          total={totalFavorites}
          page={favPage}
          pageSize={PAGE_SIZE}
          onPageChange={setFavPage}
        />
      )}

      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite(selectedRecipe.idMeal)}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
