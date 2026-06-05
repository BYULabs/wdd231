import { ENDPOINTS } from './config.mjs';

/**
 * Generic HTTP Fetch Wrapper
 */
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP network error! Status: ${response.status}`);
    }
    return await response.json();
}

export async function fetchCurrentWeather() {
    return await fetchData(ENDPOINTS.weather);
}

export async function fetchForecast() {
    return await fetchData(ENDPOINTS.forecast);
}