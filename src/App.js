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
import BackToTop from './components/BackToTop';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorMessage from './components/ErrorMessage';
import './styles/DietPills.css';
import { searchRecipes, getRecipeDetails } from './utils/api';
import Pagination from './components/Pagination';
import { FiShuffle } from 'react-icons/fi';

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
  const [sortBy, setSortBy] = useState('none'); // none | name_asc | name_desc | cat_asc | cat_desc
  const [isPaging, setIsPaging] = useState(false);

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
      // Restore last page for this query if available
      try {
        const saved = JSON.parse(localStorage.getItem('pageByQuery') || '{}');
        const total = results.length;
        const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
        const savedPage = Math.min(totalPages, Math.max(1, saved[query] || 1));
        setPage(savedPage);
      } catch { setPage(1); }
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
    // Sorting
    const by = (v) => (v || '').toString().toLowerCase();
    if (sortBy === 'name_asc') base = [...base].sort((a,b) => by(a.strMeal).localeCompare(by(b.strMeal)));
    if (sortBy === 'name_desc') base = [...base].sort((a,b) => by(b.strMeal).localeCompare(by(a.strMeal)));
    if (sortBy === 'cat_asc') base = [...base].sort((a,b) => by(a.strCategory).localeCompare(by(b.strCategory)));
    if (sortBy === 'cat_desc') base = [...base].sort((a,b) => by(b.strCategory).localeCompare(by(a.strCategory)));
    return base;
  })();

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [activeFilter, activeDiet]);

  // Derived pagination values for recipes
  const totalRecipes = filteredRecipes.length;
  const pagedRecipes = filteredRecipes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Persist page for current query
  useEffect(() => {
    if (!lastQuery) return;
    try {
      const saved = JSON.parse(localStorage.getItem('pageByQuery') || '{}');
      saved[lastQuery] = page;
      localStorage.setItem('pageByQuery', JSON.stringify(saved));
    } catch {}
  }, [page, lastQuery]);

  // Paging shimmer on page change
  useEffect(() => {
    if (loading) return;
    setIsPaging(true);
    const t = setTimeout(() => setIsPaging(false), 180);
    return () => clearTimeout(t);
  }, [page]);

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

          {/* Sort controls: only show after search/suggestion results */}
          {!loading && !error && recipes.length > 0 && (
            <div className="sort-row" style={{ width: 'min(1200px, 94%)', margin: '6px auto 0', display: 'flex', justifyContent: 'flex-end' }}>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--muted)', fontSize: 14 }}>Sort</span>
                <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setPage(1); }} style={{ borderRadius: 10, padding: '6px 10px', border: '1px solid var(--border)', background: 'white' }}>
                  <option value="none">Relevance</option>
                  <option value="name_asc">Name A–Z</option>
                  <option value="name_desc">Name Z–A</option>
                  <option value="cat_asc">Category A–Z</option>
                  <option value="cat_desc">Category Z–A</option>
                </select>
              </label>
            </div>
          )}

          
          {loading && <LoadingSkeleton />}
          {isPaging && !loading && totalRecipes > 0 && <LoadingSkeleton />}
          {error && <ErrorMessage message={error} onRetry={() => lastQuery && handleSearch(lastQuery)} />}
          {!loading && !error && totalRecipes > 0 && (
            <RecipeCards 
              recipes={pagedRecipes}
              onRecipeClick={handleRecipeClick}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          )}
          {/* Empty state with only Random button (round, theme-styled) */}
          {!loading && !error && recipes.length === 0 && (
            <div style={{ width: 'min(1200px, 94%)', margin: '14px auto', display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={async () => {
                  setLoading(true);
                  try {
                    const { fetchRandomRecipes } = await import('./utils/api');
                    const randoms = await fetchRandomRecipes(6);
                    setRecipes(randoms);
                    setLastQuery('Random');
                    setPage(1);
                  } finally { setLoading(false); }
                }}
                className="primary-button"
              >
                <FiShuffle />
                Suggest me a recipe
              </button>
            </div>
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

      <BackToTop />
      <Footer />
    </div>
  );
}

export default App;
