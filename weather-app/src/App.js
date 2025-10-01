import React, { useState } from 'react'
import styles from './App.module.css'
import SearchBar from './components/SearchBar/SearchBar';
import WeatherCard from './components/WeatherCard/WeatherCard';

const App = () => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSearch = () => {
    if (!city.trim()) return;
    setLoading(true);

    setTimeout(() => {
      alert(`Нашли погоду для: ${city}`);
      setLoading(false); 
    }, 1000);
  }
  return (
    <div className={styles.app}>
        <h1>Погодное Приложение</h1>
        <SearchBar 
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          loading={loading}
        />
        {loading && (
          <div className={styles.loading}>Загружаем данные о погоде...</div>
        )}
        {!loading && (<WeatherCard/>)}
    </div>
  )
}

export default App
