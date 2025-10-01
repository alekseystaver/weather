import React from 'react'
import styles from './SearchBar.module.css';

const SearchBar = ({city,setCity, onSearch, loading}) => {
    const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };
  return (
    <form className={styles.searchContainer}>
      <input
        type='text'
        value = {city}
        onKeyPress={handleKeyPress}
        onChange={(e) => setCity(e.target.value)}
        placeholder='Введите город...' 
        className={styles.searchInput}
        disabled={loading}
      />
      <button 
        onClick={onSearch}
        className={styles.searchButton}
        disabled={loading || !city.trim()}
      >
        {loading ? 'Поиск...' : 'Найти'}
      </button>
    </form>
  )
}

export default SearchBar
