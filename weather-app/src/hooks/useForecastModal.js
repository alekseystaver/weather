import { useState } from 'react';

const useForecastModal = () => {
    const [selectDay, setSelectDay] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (dayData) => {
        setSelectDay(dayData);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectDay(null);
        setIsModalOpen(false);
    };

    const getDailyForecast = (forecastData) => {
        if (!forecastData || !forecastData.list) return [];
        return forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5);
    };

    const getDayName = (day) => {
        if (!day) return '';
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
            return 'Завтра';
        }

        return date.toLocaleDateString('ru-RU', {weekday: 'long'});
    };

    const getFullDayName = (day) => {
        if (!day) return '';
        const date = new Date(day.dt * 1000);
        return date.toLocaleDateString('ru-RU', { 
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        });
    };

    const getDayForecasts = (dayData, forecastData) => {
        if (!dayData || !forecastData || !forecastData.list) return [];
        const selectedDate = new Date(dayData.dt * 1000).toDateString();
        return forecastData.list.filter((item) => {
            const itemDay = new Date(item.dt * 1000).toDateString();
            return itemDay === selectedDate;
        });
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    return {
        selectDay,
        isModalOpen,
        openModal,
        closeModal,
        getDailyForecast,
        getDayForecasts,
        getDayName,
        getFullDayName,
        formatTime
    };
};

export default useForecastModal;