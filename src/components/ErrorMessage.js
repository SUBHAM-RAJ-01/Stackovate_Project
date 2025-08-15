import React from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import '../styles/ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <section className="error-section">
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">
            <FiAlertCircle />
          </div>
          <h3 className="error-title">Oops! Something went wrong</h3>
          <p className="error-message">{message}</p>
          {onRetry && (
            <button className="retry-button" onClick={onRetry}>
              <FiRefreshCw />
              Try Again
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ErrorMessage;
