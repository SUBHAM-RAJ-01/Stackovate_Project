const API_KEY = process.env.REACT_APP_MEAL_API_KEY ; // '1' is TheMealDB demo key
const API_BASE_URL = (process.env.REACT_APP_MEAL_API_BASE?.replace(/\/$/, '') || `https://www.themealdb.com/api/json/v1/${API_KEY}`);

const DEFAULT_TIMEOUT_MS = 12000;

async function fetchJson(url, { timeout = DEFAULT_TIMEOUT_MS, ...options } = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status} ${res.statusText} - ${text?.slice(0, 200)}`);
    }
    return await res.json();
  } catch (err) {
    // Normalize AbortError message
    if (err?.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection and try again.');
    }
    throw err;
  } finally {
    clearTimeout(id);
  }
}

function buildFallbackUrls(fullUrl) {
  const urls = [];
  // 1) Direct URL first
  urls.push(fullUrl);
  // 2) cors.isomorphic-git.org proxy
  urls.push(`https://cors.isomorphic-git.org/${fullUrl}`);
  // 3) allorigins (raw)
  urls.push(`https://api.allorigins.win/raw?url=${encodeURIComponent(fullUrl)}`);
  return urls;
}

async function fetchWithFallback(fullUrl) {
  const candidates = buildFallbackUrls(fullUrl);
  let lastErr;
  for (const u of candidates) {
    try {
      return await fetchJson(u);
    } catch (e) {
      lastErr = e;
      // continue to next candidate
    }
  }
  throw lastErr || new Error('Request failed');
}

// Search recipes by ingredient or name
export const searchRecipes = async (query) => {
  if (!query || !String(query).trim()) return [];
  try {
    const data = await fetchWithFallback(`${API_BASE_URL}/search.php?s=${encodeURIComponent(query.trim())}`);
    return data?.meals || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

// Get recipe details by ID
export const getRecipeDetails = async (id) => {
  if (!id) return null;
  try {
    const data = await fetchWithFallback(`${API_BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
    return data?.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

// Search recipes by ingredient
export const searchByIngredient = async (ingredient) => {
  if (!ingredient || !String(ingredient).trim()) return [];
  try {
    const data = await fetchWithFallback(`${API_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient.trim())}`);
    return data?.meals || [];
  } catch (error) {
    console.error('Error searching by ingredient:', error);
    throw error;
  }
};

// Get random recipes (TheMealDB returns 1 per call). We'll call multiple times.
export const fetchRandomRecipes = async (count = 6) => {
  const results = [];
  for (let i = 0; i < count; i++) {
    try {
      const data = await fetchWithFallback(`${API_BASE_URL}/random.php`);
      if (data?.meals?.[0]) results.push(data.meals[0]);
    } catch (e) {
      // skip this one, continue
    }
  }
  return results;
};
