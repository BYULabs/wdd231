// Central import orchestrator linking distinct sub-component initialization files
import { initMobileMenu } from './mobile-menu.mjs';
import { initHeroSlider } from './hero-slider.mjs';
import { initAnimeGrid } from './anime-grid.mjs';
import { initAnimeDetails } from './anime-details.mjs';
import { initBrowseCatalog } from './browse-catalog.mjs';
import { initAnimeSchedule } from './schedule.mjs';
import { initHeaderSearch } from './header-search.mjs';

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHeaderSearch();  
    initHeroSlider();
    initAnimeGrid();   
    initBrowseCatalog();
    initAnimeDetails();   
    initAnimeSchedule();
});