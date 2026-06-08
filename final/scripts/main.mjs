// Central import orchestrator linking distinct sub-component initialization files
import { initMobileMenu } from './mobile-menu.mjs';
import { initHeroSlider } from './hero-slider.mjs';
import { initAnimeGrid } from './anime-grid.mjs';
import { initAnimeDetails } from './anime-details.mjs';

/**
 * Drives subtle background parallax translation dynamics during user scroll operations.
 */
function initHeroParallax() {
    // Exit tracking if execution occurs on low-spec/mobile form factors under 768px wide
    if (window.innerWidth < 768) {
        return;
    }

    const heroImg = document.querySelector('.hero-image-wrapper');

    // Track frame adjustments on window scrolling
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Cap calculations to standard page ranges (0px to 900px vertical) to optimize computing performance
        if (scrollY < 900 && heroImg) {
            // Apply scale and minor translation shifts
            heroImg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.05)`;
        }
    }, { passive: true }); // '{ passive: true }' signals the browser that this listener won't cancel scroll actions, optimizing rendering thread performance
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();   
    initHeroParallax(); 
    initHeroSlider();   // Load this first (above the fold)

    // Defer the grid slightly to prevent simultaneous API requests
    setTimeout(() => {
        initAnimeGrid();   
    }, 200);

    initAnimeDetails();   
});