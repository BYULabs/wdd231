// Global Configuration Settings
export const OPENWEATHER_API_KEY = "__OPENWEATHER_API_KEY__";
export const CUMBAYA_COORDS = {
    lat: "-0.2065082",
    lon: "-78.4355379"
};

export const ENDPOINTS = {
    weather: `https://api.openweathermap.org/data/2.5/weather?lat=${CUMBAYA_COORDS.lat}&lon=${CUMBAYA_COORDS.lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`,
    forecast: `https://api.openweathermap.org/data/2.5/forecast?lat=${CUMBAYA_COORDS.lat}&lon=${CUMBAYA_COORDS.lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`
};