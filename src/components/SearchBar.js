import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import '../styles/SearchBar.css';
import { searchRecipes } from '../utils/api';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const containerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim()); // Call API search function
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (!val) {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  // Debounced suggestion fetch
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) { setSuggestions([]); setShowDropdown(false); return; }
    const t = setTimeout(async () => {
      try {
        const res = await searchRecipes(q); // API call for suggestions
        const names = (res || []).map(r => r.strMeal);
        const uniq = Array.from(new Set(names)).slice(0, 6);
        setSuggestions(uniq);
        setShowDropdown(uniq.length > 0);
        setHighlightIdx(-1);
      } catch (_) {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 280);
    return () => clearTimeout(t);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const onPickSuggestion = (text) => {
    setQuery(text);
    onSearch(text);
    setShowDropdown(false);
  };

  return (
    <section id="search" className="search-section">
      <div className="search-container" ref={containerRef}>
        <form onSubmit={handleSubmit} className="search-form" role="search" aria-label="Search recipes">
          <div className="search-wrapper">
            <div className="search-input-container" aria-expanded={showDropdown} aria-haspopup="listbox">
              <input
                type="text"
                placeholder="Search for recipes or ingredients..."
                value={query}
                onChange={handleInputChange}
                onFocus={() => suggestions.length && setShowDropdown(true)}
                onKeyDown={(e) => {
                  if (!showDropdown) return;
                  if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightIdx(i => Math.min(i + 1, suggestions.length - 1)); }
                  if (e.key === 'ArrowUp') { e.preventDefault(); setHighlightIdx(i => Math.max(i - 1, 0)); }
                  if (e.key === 'Enter' && highlightIdx >= 0) { e.preventDefault(); onPickSuggestion(suggestions[highlightIdx]); }
                  if (e.key === 'Escape') { setShowDropdown(false); }
                }}
                className="search-input"
              />
              {showDropdown && (
                <ul className="suggestions-dropdown" role="listbox">
                  {suggestions.map((s, idx) => (
                    <li
                      key={s}
                      role="option"
                      aria-selected={idx === highlightIdx}
                      className={`suggestion-row ${idx === highlightIdx ? 'active' : ''}`}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => onPickSuggestion(s)}
                      onMouseEnter={() => setHighlightIdx(idx)}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button type="submit" className="search-button">
              <FiSearch className="search-icon" />
            </button>
          </div>
        </form>
        <div className="search-suggestions">
          <span>Try: </span>
          {['Chicken', 'Pasta', 'Vegetarian', 'Dessert'].map(suggestion => (
            <button
              key={suggestion}
              className="suggestion-chip"
              onClick={() => {
                setQuery(suggestion);
                onSearch(suggestion);
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
