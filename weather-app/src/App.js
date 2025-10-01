import React, { useState, useEffect } from 'react'
import styles from './App.module.css'
import SearchBar from './components/SearchBar/SearchBar';
import WeatherCard from './components/WeatherCard/WeatherCard';

const API_KEY = '7c8d74dd12eacced5a7f2232a83a8f76';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const App = () => {
  const [city, setCity] = useState('Минск');
  const [loading, setLoading] = useState(true);
  const [showLoadingMessage, setShowLoadingMessage] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  // Автоматически загружаем погоду в Минске при загрузке приложения
  useEffect(() => {
    const loadMinskWeather = async () => {
      try {
        console.log('Автоматически загружаем погоду в Минске');
        
        const url = `${API_URL}?q=Minsk&appid=${API_KEY}&units=metric&lang=ru`;
        console.log('URL:', url);
        
        const response = await fetch(url);
        
        console.log('Статус ответа:', response.status);
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('API ключ не активирован. Подожди 2-3 часа после регистрации.');
          }
          throw new Error('Не удалось загрузить погоду Минска');
        }
        
        const data = await response.json();
        console.log('Данные Минска получены:', data);
        
        setWeatherData(data);
        setError('');
        
      } catch(error) {
        console.error('Ошибка загрузки Минска:', error);
        setError(error.message);
      } finally {
        setLoading(false);
        setShowLoadingMessage(false);
      }
    };

    loadMinskWeather();
  }, []);

  const handleSearch = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError('');

    const loadingTimer = setTimeout(() => {
      setShowLoadingMessage(true);
    }, 300);

    try {
      console.log('Делаем запрос для:', city);
      
      const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;
      console.log('URL:', url);
      
      const response = await fetch(url);
      
      console.log('Статус ответа:', response.status);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Город не найден. Попробуйте на английском: Moscow, London');
        }
        throw new Error(`API ошибка: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Данные получены:', data);
      
      setWeatherData(data);
      
    } catch(error) {
      console.error('Ошибка:', error);
      setError(error.message);
    } finally {
      clearTimeout(loadingTimer);
      setLoading(false);
      setShowLoadingMessage(false);
    }
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

        {showLoadingMessage && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            Загружаем данные о погоде...
          </div>
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
          <div className={styles.error}>{error}</div>
        )}
    </div>
  )
}

export default App