import React, { useEffect, useState, useRef } from 'react';
import SearchHistory from '../SearchHistory/SearchHistory';
import styles from './SearchBar.module.css';

const SearchBar = ({ city, setCity, onSearch, loading }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(savedHistory);
  }, []);

  const addToHistory = (newCity) => {
    if (!newCity.trim()) return;
    const updatedHistory = [
      newCity,
      ...history.filter(c => c.toLowerCase() !== newCity.toLowerCase())
    ].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmeCity = city.trim()
    if (!trimmeCity) return;
    onSearch(trimmeCity);
    addToHistory(trimmeCity);
    setShowHistory(false);
  };
  const handleSelectHistory = (item) => {
    setCity(item); 
    onSearch(item);
    setShowHistory(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('searchHistory');
    setHistory([]);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowHistory(false); 
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef}>
      <form className={styles.searchContainer}>
        <input
          type="text"
          value={city}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSearch(e);
          }}
          onChange={(e) => setCity(e.target.value.trim())}
          placeholder="Введите город..."
          className={styles.searchInput}
          disabled={loading}
          onFocus={() => setShowHistory(true)}
        />
        <button
          onClick={handleSearch}
          className={styles.searchButton}
          disabled={loading || !city.trim()}
        >
          {loading ? 'Поиск...' : 'Найти'}
        </button>
      </form>

      {showHistory && (
        <SearchHistory
          history={history}
          onSelect={handleSelectHistory}
          clearHistory={clearHistory}
        />
      )}
    </div>
  );
};

export default SearchBar;
