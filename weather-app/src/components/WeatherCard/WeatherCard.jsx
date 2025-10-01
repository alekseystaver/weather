import React from 'react'
import styles from './WeatherCard.module.css'

const WeatherCard = () => {
  return (
    <div className={styles.container}>
    <div className={styles.weatherCard}>
        <h2>Москва, RU</h2>
            <div className={styles.weatherMain}>
              <div className={styles.temperature}>18°C</div>
              <div className={styles.weatherIcon}>☀️</div>
            </div>
        <p>Солнечно</p>
    </div>
    </div>
  )
}

export default WeatherCard
