import { initMobileMenu } from './mobile-menu.mjs';
import { initHeroSlider } from './hero-slider.mjs';

function initHeroParallax() {
    if (window.innerWidth < 768) {
        return;
    }

    const heroImg = document.querySelector('.hero-image-wrapper');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY < 900 && heroImg) {
            heroImg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.05)`;
        }
    }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHeroParallax();
    initHeroSlider();
});