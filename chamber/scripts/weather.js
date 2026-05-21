// Weather API Implementation for Cumbayá Chamber
// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const currentCondition = document.querySelector('#current-condition');
const tempHigh = document.querySelector('#temp-high');
const tempLow = document.querySelector('#temp-low');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const weatherIcon = document.querySelector('.weather-icon');

// API Configuration - Cumbayá, Ecuador coordinates
const myKey = "__OPENWEATHER_API_KEY__";
const myLat = "-0.2065082";
const myLon = "-78.4355379";

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;

function convertTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function getWeatherEmoji(iconCode) {
    const iconMap = {
        '01d': '☀️', '01n': '🌙',
        '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️',
        '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️',
        '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️',
        '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
}

function displayResults(data) {
    // Current weather
    currentTemp.innerHTML = `${Math.round(data.main.temp)}`;
    currentCondition.textContent = data.weather[0].main;
    tempHigh.innerHTML = `${Math.round(data.main.temp_max)}`;
    tempLow.innerHTML = `${Math.round(data.main.temp_min)}`;
    humidity.innerHTML = `${data.main.humidity}`;
    sunrise.textContent = convertTime(data.sys.sunrise);
    sunset.textContent = convertTime(data.sys.sunset);
    
    // Weather emoji
    const weatherEmoji = getWeatherEmoji(data.weather[0].icon);
    weatherIcon.textContent = weatherEmoji;
}

async function apiFetch() {
    try {
        // Fetch current weather
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }

        // Fetch forecast data
        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            console.log(forecastData);
            displayForecast(forecastData);
        } else {
            throw Error(await forecastResponse.text());
        }
    } catch (error) {
        console.log('Weather API Error:', error);
    }
}

// Fetch weather when page loads
apiFetch();