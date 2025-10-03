import React, { useEffect, useRef } from 'react';
import styles from './ModalForecast.module.css';
import useForecastModal from '../../hooks/useForecastModal';

const ModalForecast = ({ isOpen, onClose, dayData, forecastData }) => {
    const {
        getFullDayName,
        getDayForecasts,
        formatTime,
        getToday
    } = useForecastModal();

    const hourlyListRef = useRef(null);

    useEffect(() => {
        if (!isOpen || !dayData || !forecastData) return;

        const dayForecasts = getDayForecasts(dayData, forecastData);
        const today = getToday(dayData);

        const getCurrentHourIndex = () => {
            if (!today) return -1;
            const now = new Date();
            const currentTime = now.getHours();
            
            return dayForecasts.findIndex(forecast => {
                const forecastTime = new Date(forecast.dt * 1000).getHours();
                return forecastTime === currentTime;
            });
        };

        const currentHourIndex = getCurrentHourIndex();

        if (today && currentHourIndex !== -1 && hourlyListRef.current) {
            const scrollContainer = hourlyListRef.current;
            const hourlyItems = scrollContainer.querySelectorAll(`.${styles.hourlyItem}`);
            
            if (hourlyItems[currentHourIndex]) {
                const containerWidth = scrollContainer.offsetWidth;
                const itemWidth = hourlyItems[currentHourIndex].offsetWidth;
                const itemOffset = hourlyItems[currentHourIndex].offsetLeft;
                
                const scrollPosition = itemOffset - (containerWidth / 2) + (itemWidth / 2);
                
                setTimeout(() => {
                    scrollContainer.scrollTo({
                        left: scrollPosition,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        }
    }, [isOpen, dayData, forecastData, getDayForecasts, getToday]);

    if (!isOpen || !dayData || !forecastData) return null;

    const dayForecasts = getDayForecasts(dayData, forecastData);
    const today = getToday(dayData);

    const getCurrentHourIndex = () => {
        if (!today) return -1;
        const now = new Date();
        const currentTime = now.getHours();
        
        return dayForecasts.findIndex(forecast => {
            const forecastTime = new Date(forecast.dt * 1000).getHours();
            return forecastTime === currentTime;
        });
    };

    const currentHourIndex = getCurrentHourIndex();

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                
                {dayForecasts && dayForecasts.length > 0 && (
                    <div className={styles.hourlyForecast}>
                        <h2>{getFullDayName(dayData)}</h2>
                        <h3>Прогноз на весь день</h3>
                        <div 
                            className={styles.hourlyList} 
                            ref={hourlyListRef}
                        >
                            {dayForecasts.map((forecast, index) => {
                                const isPast = today && new Date(forecast.dt * 1000) < new Date();
                                const isCurrent = today && index === currentHourIndex;
                                
                                return (
                                    <div 
                                        key={index} 
                                        className={`${styles.hourlyItem} ${
                                            isCurrent ? styles.current : ''
                                        } ${isPast ? styles.past : ''}`}
                                    >
                                        <div className={styles.hourlyTime}>
                                            {formatTime(forecast.dt)}
                                            {isCurrent && <span className={styles.nowBadge}>Сейчас</span>}
                                        </div>
                                        <img 
                                            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                                            alt={forecast.weather[0].description}
                                            className={styles.hourlyIcon}
                                        />
                                        <div className={styles.hourlyTemp}>
                                            {Math.round(forecast.main.temp)}°C
                                        </div>
                                        {isPast && <div className={styles.pastOverlay}></div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalForecast;