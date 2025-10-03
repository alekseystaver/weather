import React from 'react'
import styles from './Forecast.module.css'
import ModalForecast from '../ModalForecast/ModalForecast'
import useForecastModal from '../../hooks/useForecastModal'

const Forecast = ({ forecastData }) => {
    const {
        selectDay,
        isModalOpen,
        openModal,
        closeModal,
        getDailyForecast,
        getDayName
    } = useForecastModal();

    if (!forecastData || !forecastData.list) return null;
    
    const dailyForecast = getDailyForecast(forecastData);

    return (
        <div className={styles.forecast}>
            <h3>Прогноз погоды на 5 дней</h3>
            <div className={styles.forecastList}>
                {dailyForecast.map((day, index) => (
                    <div 
                        key={index} 
                        className={styles.forecastItem}
                        onClick={() => openModal(day)}
                    >
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

            {selectDay && (
                <ModalForecast 
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    dayData={selectDay}
                    forecastData={forecastData}
                />
            )}
        </div>
    )
}

export default Forecast