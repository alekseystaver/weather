import React from 'react';
import styles from './WeatherCard.module.css';

const WeatherCard = ({ 
  city, 
  country, 
  temperature, 
  description, 
  weatherIcon, 
  feelsLike, 
  humidity, 
  windSpeed,
  pressure
}) => {
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
        <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.weatherDetails}>
          <div className={styles.detailRow}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Ощущается как </span>
              <span className={styles.detailValue}>{feelsLike}°C</span>            
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Влажность </span>
              <span className={styles.detailValue}>{humidity}%</span>
            </div>
          </div>
          <div className={styles.detailRow}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Ветер </span>
              <span className={styles.detailValue}>{windSpeed} м/с</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Давление </span>
              <span className={styles.detailValue}>{pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
