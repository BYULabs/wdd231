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

/**
 * Controla el mensaje de bienvenida dinámico basado en la última visita del usuario usando LocalStorage.
 */
export function initVisitorMessage() {
    const toastElement = document.getElementById('visitor-toast');
    const messageElement = document.getElementById('visitor-message');
    const closeBtn = document.getElementById('close-bubble');
    
    if (!messageElement || !toastElement) return; // Salida segura

    const currentTimestamp = Date.now();
    const lastVisit = localStorage.getItem('last-visit-date');

    // Lógica dinámica de mensajes según la rúbrica de BYU
    if (!lastVisit) {
        messageElement.textContent = "¡Bienvenido! Descubre todo lo que nuestra comunidad tiene para ofrecerte.";
    } else {
        const lastTimestamp = parseInt(lastVisit, 10);
        const timeDifferenceMs = currentTimestamp - lastTimestamp;
        const msPerDay = 24 * 60 * 60 * 1000; 

        if (timeDifferenceMs < msPerDay) {
            messageElement.textContent = "¡Qué bueno verte de regreso tan pronto!";
        } else {
            const daysPassed = Math.floor(timeDifferenceMs / msPerDay);
            if (daysPassed === 1) {
                messageElement.textContent = "Tu última visita fue hace 1 día.";
            } else {
                messageElement.textContent = `Tu última visita fue hace ${daysPassed} días.`;
            }
        }
    }

    // Remueve la clase 'hidden' para mostrar la notificación flotante
    toastElement.classList.remove('hidden');

    // Evento para cerrar la notificación
    closeBtn?.addEventListener('click', () => {
        toastElement.classList.add('hidden');
    });

    // Guarda el timestamp actual para la próxima sesión
    localStorage.setItem('last-visit-date', currentTimestamp);
}