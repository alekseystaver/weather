import React from 'react';
import styles from './ModalForecast.module.css';
import useForecastModal from '../../hooks/useForecastModal';

const ModalForecast = ({ isOpen, onClose, dayData, forecastData }) => {
    const {
        getFullDayName,
        getDayForecasts,
        formatTime
    } = useForecastModal();

    if (!isOpen || !dayData || !forecastData) return null;

    const dayForecasts = getDayForecasts(dayData, forecastData);

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {dayForecasts && dayForecasts.length > 0 && (
                    <div className={styles.hourlyForecast}>
                    <h2>{getFullDayName(dayData)}</h2>
                        <h3>Прогноз на весь день</h3>
                        <div className={styles.hourlyList}>
                            {dayForecasts.map((forecast, index) => (
                                <div key={index} className={styles.hourlyItem}>
                                    <div className={styles.hourlyTime}>{formatTime(forecast.dt)}</div>
                                    <img 
                                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                                        alt={forecast.weather[0].description}
                                        className={styles.hourlyIcon}
                                    />
                                    <div className={styles.hourlyTemp}>
                                        {Math.round(forecast.main.temp)}°C
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalForecast;