import React, { useState, useRef, useEffect } from 'react';
import { FiFilter, FiChevronDown } from 'react-icons/fi';
import '../styles/FilterDropdown.css';

const FilterDropdown = ({ activeFilter, setActiveFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filters = ['All', 'Breakfast', 'Lunch', 'Dinner'];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterSelect = (filter) => {
    setActiveFilter(filter);
    setIsOpen(false);
  };

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button 
        className="filter-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <FiFilter className="filter-icon" />
        <span>Filter: {activeFilter}</span>
        <FiChevronDown className={`chevron-icon ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="filter-menu">
          {filters.map(filter => (
            <button
              key={filter}
              className={`filter-option ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => handleFilterSelect(filter)}
              role="option"
              aria-selected={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
