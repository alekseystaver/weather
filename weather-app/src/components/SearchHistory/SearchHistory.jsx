import React from 'react';
import styles from './SearchHistory.module.css';

const SearchHistory = ({ history, onSelect, clearHistory }) => {
  return (
    <div className={styles.historyContainer}>
      {history.length > 0 && (
        <>
          <ul className={styles.historyList}>
            {history.map((item, index) => (
              <li
                key={index}
                onClick={() => onSelect(item)}
                className={styles.historyItem}
              >
                {item}
              </li>
            ))}
          </ul>
          <button onClick={clearHistory} className={styles.clearButton}>
            Очистить историю
          </button>
        </>
      )}
    </div>
  );
};

export default SearchHistory;
