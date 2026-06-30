import { initializeFooterDates, initVisitorMessage } from './utils.mjs'; 
import { initNavigation } from './navigation.mjs';
import { initDirectory } from './directory.mjs';
import { initSpotlights } from './spotlights.mjs';
import { initWeather } from './weather.mjs';
import { initFormTimestamp, initThankYouResults } from './forms.mjs';
import { initDiscoverPage } from './discovery.mjs';

function initApp() {
    // 1. Estructuras globales comunes
    initializeFooterDates();
    initNavigation();
    initVisitorMessage();

    // 2. Vistas condicionales
    initDirectory();
    initSpotlights();
    initWeather();
    initFormTimestamp();
    initThankYouResults();
    initDiscoverPage();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}