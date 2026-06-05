import { initializeFooterDates } from './utils.mjs';
import { initNavigation } from './navigation.mjs';
import { initDirectory } from './directory.mjs';
import { initSpotlights } from './spotlights.mjs';
import { initWeather } from './weather.mjs';
import { initFormTimestamp, initThankYouResults } from './forms.mjs';

// Central setup function executed when DOM is parsed and ready
function initApp() {
    // 1. Fire global structures common to all site views
    initializeFooterDates();
    initNavigation();

    // 2. Fire conditional view features (only execute if elements exist)
    initDirectory();
    initSpotlights();
    initWeather();
    initFormTimestamp();
    initThankYouResults();
}

// Kickstart execution
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}