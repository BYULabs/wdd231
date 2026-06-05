import { fetchCurrentWeather, fetchForecast } from './api.mjs';
import { convertUnixTime, getWeatherEmoji } from './utils.mjs';

function displayResults(data) {
    const currentTemp = document.querySelector('#current-temp');
    if (!currentTemp) return; // Exit if weather card UI elements don't exist

    currentTemp.innerHTML = `${Math.round(data.main.temp)}`;
    document.querySelector('#current-condition').textContent = data.weather[0].main;
    document.querySelector('#temp-high').innerHTML = `${Math.round(data.main.temp_max)}`;
    document.querySelector('#temp-low').innerHTML = `${Math.round(data.main.temp_min)}`;
    document.querySelector('#humidity').innerHTML = `${data.main.humidity}`;
    document.querySelector('#sunrise').textContent = convertUnixTime(data.sys.sunrise);
    document.querySelector('#sunset').textContent = convertUnixTime(data.sys.sunset);
    document.querySelector('.weather-icon').textContent = getWeatherEmoji(data.weather[0].icon);
}

function displayForecast(forecastData) {
    const dailyData = {};
    forecastData.list.forEach(forecast => {
        const dateKey = new Date(forecast.dt * 1000).toDateString();
        if (!dailyData[dateKey] || forecast.main.temp_max > dailyData[dateKey].high) {
            dailyData[dateKey] = {
                high: forecast.main.temp_max,
                icon: forecast.weather[0].icon,
                condition: forecast.weather[0].main
            };
        }
    });

    const forecasts = Object.values(dailyData).slice(0, 3);
    const elements = [
        { high: '#forecast-today-high', icon: '#forecast-today-icon', cond: '#forecast-today-condition' },
        { high: '#forecast-tomorrow-high', icon: '#forecast-tomorrow-icon', cond: '#forecast-tomorrow-condition' },
        { high: '#forecast-next-high', icon: '#forecast-next-icon', cond: '#forecast-next-condition' }
    ];

    elements.forEach((selectors, index) => {
        const targetData = forecasts[index];
        if (targetData) {
            const highEl = document.querySelector(selectors.high);
            if (highEl) highEl.innerHTML = `${Math.round(targetData.high)}`;
            
            const iconEl = document.querySelector(selectors.icon);
            if (iconEl) iconEl.textContent = getWeatherEmoji(targetData.icon);
            
            const condEl = document.querySelector(selectors.cond);
            if (condEl) condEl.textContent = targetData.condition;
        }
    });
}

export async function initWeather() {
    if (!document.querySelector('#current-temp')) return;

    try {
        const [weatherData, forecastData] = await Promise.all([
            fetchCurrentWeather(),
            fetchForecast()
        ]);
        displayResults(weatherData);
        displayForecast(forecastData);
    } catch (error) {
        console.error('Weather module initialization error:', error);
    }
}