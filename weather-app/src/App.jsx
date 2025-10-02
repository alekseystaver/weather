import React, { useState, useEffect } from 'react'
import styles from './App.module.css'
import SearchBar from './components/SearchBar/SearchBar';
import WeatherCard from './components/WeatherCard/WeatherCard';
import Loading from './components/Loading/Loading';
import Error from './components/Error/Error.jsx';
import useWeather from './hooks/useWeather.jsx';

// const API_KEY = '7c8d74dd12eacced5a7f2232a83a8f76';
// const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const App = () => {
  const [city, setCity] = useState('Минск');
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const {weatherData, loading, error, fetchWeather, setError} = useWeather();

  useEffect(() => {
    const loadMinskWeather = async () => {
      try {
        await fetchWeather('Minsk');
        } catch (error) {
          console.error('ошибка при загрузке минска', error)
        }
    };

    loadMinskWeather();
  }, [fetchWeather]);

  const handleSearch = async () => {
    if (!city.trim()) return;

    try {
      await fetchWeather(city);
    } finally {
      setShowLoadingMessage(false);
    }
  }
  const handleRetry = () => {
    setError('');
    handleSearch();
  };
  return (
    <div className={styles.app}>
        <h1>Погодное Приложение</h1>
        <SearchBar 
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          loading={loading}
        />

        {(loading || showLoadingMessage) && (
          <Loading message={'Загружаем данные о погоде'}/>
        )}

        {!loading && weatherData && (
          <WeatherCard
            city={weatherData.name}
            country={weatherData.sys.country}
            temperature={Math.round(weatherData.main.temp)}
            description={weatherData.weather[0].description}
            weatherIcon={weatherData.weather[0].icon}
          />
        )}

        {error && (
        <Error 
          message={error} 
          onRetry={handleRetry}
        />
      )}
    </div>
  )
}

export default App