// Central import orchestrator linking distinct sub-component initialization files
import { initMobileMenu } from './mobile-menu.mjs';
import { initHeroSlider } from './hero-slider.mjs';
import { initAnimeGrid } from './anime-grid.mjs';
import { initAnimeDetails } from './anime-details.mjs';
import { initBrowseCatalog } from './browse-catalog.mjs';

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();   
    initHeroSlider();
    initBrowseCatalog();

    // Defer the grid slightly to prevent simultaneous API requests
    setTimeout(() => {
        initAnimeGrid();   
    }, 200);

    initAnimeDetails();   
});