import { useCallback, useState } from 'react'
const API_KEY = '7c8d74dd12eacced5a7f2232a83a8f76';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const useWeather = () => {
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = useCallback(async (city) => {
        if (!city.trim()) return;

        setLoading(true);
        setError('');
        try {
        console.log('Автоматически загружаем погоду в Минске');
        
        const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;
        console.log('URL:', url);
        
        const response = await fetch(url);
        
        console.log('Статус ответа:', response.status);
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('API ключ не активирован. Подожди 2-3 часа после регистрации.');
          }
          throw new Error(`Не удалось загрузить погоду ${city}`);
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
      }
    }, [])
  return {
    weatherData,
    loading,
    error,
    fetchWeather,
    setError
  }
}

export default useWeather;
