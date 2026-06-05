// Utility Functions

/**
 * Converts a Unix timestamp to a human-readable local time string.
 */
export function convertUnixTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Maps OpenWeather API icon codes to explicit Emoji characters.
 */
export function getWeatherEmoji(iconCode) {
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

/**
 * Informs the footer element of copyright year and document version tracking.
 */
export function initializeFooterDates() {
    const yearEl = document.getElementById('current-year');
    const modEl = document.getElementById('last-modified');
    
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (modEl) modEl.textContent = document.lastModified;
}