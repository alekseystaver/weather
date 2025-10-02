import React from 'react';
import styles from './Error.module.css';

const Error = ({ message, onRetry }) => {
  return (
    <div className={styles.error}>
      <div className={styles.errorMessage}>{message}</div>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          Попробовать снова
        </button>
      )}
    </div>
  );
};

export default Error;