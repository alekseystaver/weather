import React, { useEffect, useState, useRef } from 'react';
import SearchHistory from '../SearchHistory/SearchHistory';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import useAutocomplete from '../../hooks/useAutocomplete';
import styles from './SearchBar.module.css';

const SearchBar = ({ city, setCity, onSearch, loading }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [history, setHistory] = useState([]);
  const containerRef = useRef(null);

  const { suggestions, loading: autoLoading, error } = useAutocomplete(city);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(saved);
  }, []);

  const addToHistory = (newCity) => {
    if (typeof newCity !== 'string' || !newCity.trim()) return;
    const updated = [
      newCity,
      ...history.filter((c) => c.toLowerCase() !== newCity.toLowerCase()),
    ].slice(0, 5);
    setHistory(updated);
    localStorage.setItem('searchHistory', JSON.stringify(updated));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) return;
    onSearch(trimmed);
    addToHistory(trimmed);
    setShowDropdown(false);
  };

  const handleSelect = (selectedCity) => {
    const name = typeof selectedCity === 'string' ? selectedCity : selectedCity.name;
    setCity(name);
    onSearch(name);
    addToHistory(name);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowDropdown(false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('searchHistory');
    setHistory([]);
  };
  

  return (
    <div ref={containerRef}>
      <form className={styles.searchContainer} onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value.trim())}
          placeholder="Введите город..."
          className={styles.searchInput}
          disabled={loading}
          onFocus={() => setShowDropdown(true)}
        />
        <button
          type="submit"
          className={styles.searchButton}
          disabled={loading || !city.trim()}
        >
          {loading ? 'Поиск...' : 'Найти'}
        </button>
      </form>

      {showDropdown && (
        <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
          {city.trim() ? (
            <>
              {autoLoading && <Loading message="Загружаем подсказки..." />}
              {error && (
                <Error
                  message={error}
                  onRetry={() => setCity(city)}
                />
              )}
              {!autoLoading && !error && suggestions.length > 0 && (
                <ul
                  style={{
                    listStyle: 'none',
                    background: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    padding: 0,
                    marginTop: '8px',
                    overflow: 'hidden',
                  }}
                >
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      onClick={() => handleSelect(s)}
                      style={{
                        padding: '10px 15px',
                        cursor: 'pointer',
                        borderBottom: '1px solid rgba(0,0,0,0.05)',
                      }}
                    >
                      {s.name}, {s.country}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <SearchHistory
              history={history}
              onSelect={handleSelect}
              clearHistory={clearHistory}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
