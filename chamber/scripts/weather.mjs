import { fetchCurrentWeather, fetchForecast } from './api.mjs';
import { convertUnixTime, getWeatherEmoji } from './utils.mjs';

function displayResults(data) {
    const currentTemp = document.querySelector('#current-temp');
    if (!currentTemp) return; // Termina la ejecución si los elementos de la interfaz no existen

    // Inyección de datos actuales en el nuevo diseño
    currentTemp.textContent = Math.round(data.main.temp);
    document.querySelector('#current-condition').textContent = data.weather[0].description || data.weather[0].main;
    document.querySelector('#humidity').textContent = data.main.humidity;
    document.querySelector('#feels-like').textContent = Math.round(data.main.feels_like);
    document.querySelector('#sunrise').textContent = convertUnixTime(data.sys.sunrise);
    document.querySelector('#sunset').textContent = convertUnixTime(data.sys.sunset);
    document.querySelector('#current-icon').textContent = getWeatherEmoji(data.weather[0].icon);
}

function displayForecast(forecastData) {
    const forecastGrid = document.querySelector('#forecast-container');
    if (!forecastGrid) return;

    const dailyData = {};
    
    // Agrupar pronósticos por día
    forecastData.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dateKey = date.toDateString(); // Llave única por día
        
        if (!dailyData[dateKey] || forecast.main.temp_max > dailyData[dateKey].high) {
            dailyData[dateKey] = {
                timestamp: forecast.dt * 1000,
                high: forecast.main.temp_max,
                icon: forecast.weather[0].icon
            };
        }
    });

    // Tomar los primeros 3 días del mapa de resultados
    const forecasts = Object.values(dailyData).slice(0, 3);
    
    // Limpiar el mensaje de "Cargando..." del HTML
    forecastGrid.innerHTML = '';

    // Renderizar dinámicamente las tarjetas respetando tus clases CSS personalizadas
    forecasts.forEach(targetData => {
        const dayDate = new Date(targetData.timestamp);
        // Obtener el nombre del día condensado en español (ej: "mar", "mié")
        const dayName = dayDate.toLocaleDateString('es-EC', { weekday: 'short' });
        
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <h4 style="text-transform: capitalize;">${dayName}.</h4>
            <div style="font-size: 1.5rem; margin: 0.25rem 0;">${getWeatherEmoji(targetData.icon)}</div>
            <p class="forecast-temp">${Math.round(targetData.high)}°C</p>
        `;
        
        forecastGrid.appendChild(forecastCard);
    });
}

export async function initWeather() {
    if (!document.querySelector('#current-temp')) return; //

    try {
        const [weatherData, forecastData] = await Promise.all([
            fetchCurrentWeather(),
            fetchForecast()
        ]); //
        displayResults(weatherData); //
        displayForecast(forecastData); //
    } catch (error) {
        console.error('Error al inicializar el módulo del clima:', error); //
    }
}