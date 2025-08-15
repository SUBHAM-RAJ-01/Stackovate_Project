import React, { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import '../styles/BackToTop.css';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button className="back-to-top" aria-label="Back to top" onClick={scrollTop}>
      <FiArrowUp />
    </button>
  );
};

export default BackToTop;
