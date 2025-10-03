import React, { useState, useEffect } from 'react'
import styles from './App.module.css'
import SearchBar from './components/SearchBar/SearchBar';
import WeatherCard from './components/WeatherCard/WeatherCard';
import Loading from './components/Loading/Loading';
import Error from './components/Error/Error.jsx';
import Forecast from './components/Forecast/Forecast.jsx';
import useWeather from './hooks/useWeather.js';

// const API_KEY = '7c8d74dd12eacced5a7f2232a83a8f76';
// const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const backgroundMap = {
  '01d': 'https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg', // Солнечно день
  '01n': 'https://stihi.ru/pics/2012/11/03/526.jpg', // Солнечно ночь
  '02d': 'https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg', //небольшая облачность 
  '03d': 'https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=1200', // Облачно
  '04d': 'https://media.istockphoto.com/id/1503488794/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0-%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D1%8B%D1%85-%D0%BE%D0%B1%D0%BB%D0%B0%D0%BA%D0%BE%D0%B2-%D1%84%D0%BE%D0%BD-%D1%81%D0%B5%D1%80%D0%BE%D0%B3%D0%BE-%D0%BD%D0%B5%D0%B1%D0%B0-%D0%B8-%D0%BE%D0%B1%D0%BB%D0%B0%D0%BA%D0%BE%D0%B2.jpg?s=612x612&w=0&k=20&c=8WnEY_fiAe5-Owqx0XUxR2SQ3npfrRcPwuyx9YDHl0s=', // Пасмурно
  '09d': 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1200', // Дождь 
  '10d': 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1200', // Ливень 
  '11d': 'https://avatars.mds.yandex.net/get-weather/10145165/LpQwePltbOfgneXgnRRH/orig', // Гроза
  '13d': 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1200', // Снег
  '50d': 'https://zastavok.net/ts/priroda/159397788465.jpg', // Туман
};
const App = () => {
  const [city, setCity] = useState('Минск');
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const {weatherData, forecastData, loading, error, fetchWeather, setError} = useWeather();

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
  const backgroundImage = weatherData?.weather[0]?.icon 
    ? backgroundMap[weatherData.weather[0].icon] || backgroundMap['01d']
    : '';
  return (
    <div className={styles.app}
    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${backgroundImage})` }}>
        <h1>Прогноз погоды</h1>
        <SearchBar 
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          loading={loading}
        />

        {(loading || showLoadingMessage) && (
          <Loading message={'Загружаем данные о погоде'}/>
        )}

        {!error && !loading && weatherData && (
          <div>
          <WeatherCard
            city={weatherData.name}
            country={weatherData.sys.country}
            temperature={Math.round(weatherData.main.temp)}
            description={weatherData.weather[0].description}
            weatherIcon={weatherData.weather[0].icon}
            feelsLike={Math.round(weatherData.main.feels_like)}
            humidity={weatherData.main.humidity}
            windSpeed={weatherData.wind.speed}
            pressure={weatherData.main.pressure}
          />

          {forecastData && (
              <Forecast forecastData={forecastData} />
            )}
          </div>
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