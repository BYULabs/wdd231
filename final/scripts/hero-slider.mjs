import { fetchUpcomingAnime } from './api.mjs';
import { escapeHTML, getAnimeImageUrl, getAnimeTitle, truncateString } from './utils.mjs';

let currentSliderIndex = 0;
let sliderAnimeData = [];
let sliderInterval = null;

export function initHeroSlider() {
    loadUpcomingSliderData();
}

async function loadUpcomingSliderData() {
    try {
        const upcomingList = await fetchUpcomingAnime();

        if (upcomingList.length > 0) {
            sliderAnimeData = upcomingList.slice(0, 5);

            startSliderCycle();
        }
    } catch (error) {
        console.error('Error fetching upcoming slider data:', error);
    }
}

function startSliderCycle() {
    if (sliderAnimeData.length === 0) return;

    renderSlideContent(sliderAnimeData[currentSliderIndex]);

    if (sliderInterval) {
        clearInterval(sliderInterval);
    }

    sliderInterval = setInterval(() => {
        currentSliderIndex = (currentSliderIndex + 1) % sliderAnimeData.length;
        renderSlideContent(sliderAnimeData[currentSliderIndex]);
    }, 6000);
}

function renderSlideContent(anime) {
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-image-wrapper img');
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');

    if (!heroSection || !anime) return;

    const cleanHeroTitle = getAnimeTitle(anime);

    heroSection.style.opacity = '0.85';

    setTimeout(() => {
        if (heroImage) {
            heroImage.src = getAnimeImageUrl(anime);
            heroImage.alt = cleanHeroTitle;
        }

        if (heroTitle) {
            heroTitle.innerHTML = escapeHTML(cleanHeroTitle);
        }

        if (heroDescription) {
            heroDescription.textContent = anime.synopsis
                ? truncateString(anime.synopsis, 220)
                : 'No preview summary description available for this upcoming release.';
        }

        heroSection.style.opacity = '1';
    }, 200);
}