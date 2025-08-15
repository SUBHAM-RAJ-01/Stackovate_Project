// Minimal page wrapper (not strictly required). Kept for structure clarity.
import React from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';

const Home = ({ onSearch }) => {
  return (
    <>
      <Hero />
      <SearchBar onSearch={onSearch} />
    </>
  );
};

export default Home;
