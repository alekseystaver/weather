import React from 'react'
import styles from './Forecast.module.css'

const Forecast = ({forecastData}) => {
    if (!forecastData || !forecastData.list) return null;
    const dailyForecast = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5);

    const getDayName = (day) => {
    const date = new Date(day.dt * 1000);
        const today = new Date();

        const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const compareToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        if (compareDate.getTime() === compareToday.getTime()) {
            return 'Сегодня';
        } 
        const tomorrow = new Date(compareToday);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if(compareDate.getTime() === tomorrow.getTime()) {
            return  'Завтра';
        }

        return date.toLocaleDateString('ru-RU', {weekday: 'long'})
    }
  return (
    <div className={styles.forecast}>
      <h3>Прогноз погоды на 5 дней</h3>
      <div className={styles.forecastList}>
        {dailyForecast.map((day, index) => (
            <div key={index} className={styles.forecastItem}>
                <div className={styles.day}>
                    {getDayName(day)}
                </div>
                <img 
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              className={styles.weatherIcon}
            />
            <div className={styles.temp}>
              <span className={styles.maxTemp}>{Math.round(day.main.temp_max)}°</span>
            </div>
            <div className={styles.description}>{day.weather[0].description}</div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Forecast
