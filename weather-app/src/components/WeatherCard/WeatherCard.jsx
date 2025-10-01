import React from 'react';
import styles from './WeatherCard.module.css';

const WeatherCard = ({ city, country, temperature, description, weatherIcon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.weatherCard}>
        <h2>{city}, {country}</h2>
        <div className={styles.weatherMain}>
          <div className={styles.temperature}>{temperature}°C</div>
          {weatherIcon && (
            <img
              src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
              alt={description}
              className={styles.weatherIcon}
            />
          )}
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
