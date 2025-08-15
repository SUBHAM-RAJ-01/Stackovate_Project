import React from 'react';
import '../styles/LoadingSkeleton.css';

const LoadingSkeleton = () => {
  return (
    <section className="loading-section">
      <div className="loading-container">
        <div className="loading-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton-image shimmer"></div>
              <div className="skeleton-content">
                <div className="skeleton-title shimmer"></div>
                <div className="skeleton-meta">
                  <div className="skeleton-meta-item shimmer"></div>
                  <div className="skeleton-meta-item shimmer"></div>
                </div>
                <div className="skeleton-category shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoadingSkeleton;
