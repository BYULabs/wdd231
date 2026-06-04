// Import API helper function to query upcoming anime data
import { fetchUpcomingAnime } from './api.mjs';

// Import text, security, and imagery parsing helper functions
import { escapeHTML, getAnimeImageUrl, getAnimeTitle, truncateString } from './utils.mjs';

// Module state management variables
let currentSliderIndex = 0; // Tracks which slide is currently active
let sliderAnimeData = [];   // Stores array slice of raw anime entries used in the slideshow
let sliderInterval = null;  // Reference pointer to the setInterval timer for cleaning cycles

/**
 * Component Entrypoint: Begins the asynchronous workflow to load the slider
 */
export function initHeroSlider() {
    loadUpcomingSliderData();
}

/**
 * Asynchronously pulls data from the endpoint and caches the first 5 records
 */
async function loadUpcomingSliderData() {
    try {
        const upcomingList = await fetchUpcomingAnime();

        // Ensure we actually received data before attempting to kick off a loop
        if (upcomingList.length > 0) {
            // Restrict size to a clean, lightweight top-5 pool
            sliderAnimeData = upcomingList.slice(0, 5);

            // Initialize rotation loop
            startSliderCycle();
        }
    } catch (error) {
        // Silently log retrieval errors without disrupting the visual thread layout
        console.error('Error fetching upcoming slider data:', error);
    }
}

/**
 * Controls timing orchestration for shifting slide states every 6 seconds
 */
function startSliderCycle() {
    // Guard clause: Cannot rotate through a completely empty list
    if (sliderAnimeData.length === 0) return;

    // Render the initial active index card immediately
    renderSlideContent(sliderAnimeData[currentSliderIndex]);

    // Reset previous interval if this function is triggered multiple times to prevent race loops
    if (sliderInterval) {
        clearInterval(sliderInterval);
    }

    // Set auto-rotation interval
    sliderInterval = setInterval(() => {
        // Advance index by 1; wrap back around to index 0 using remainder operator (%)
        currentSliderIndex = (currentSliderIndex + 1) % sliderAnimeData.length;
        renderSlideContent(sliderAnimeData[currentSliderIndex]);
    }, 6000); // 6000ms = 6 Seconds
}

/**
 * Updates DOM tree components for the Hero Banner with a slight crossfade transition
 * @param {Object} anime - The specialized anime object block to display
 */
function renderSlideContent(anime) {
    // Fetch relevant UI handles
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-image-wrapper img');
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButton = document.querySelector('.hero-section .cta-btn');

    // Abort out of rendering actions if essential nodes are missing
    if (!heroSection || !anime) return;

    const cleanHeroTitle = getAnimeTitle(anime);

    // Step 1: Temporarily lower opacity to initiate fade-out phase of transition
    heroSection.style.opacity = '0.85';

    // Step 2: Swap the background details mid-fade using a brief timeout delay
    setTimeout(() => {
        if (heroImage) {
            heroImage.src = getAnimeImageUrl(anime);
            heroImage.alt = cleanHeroTitle;
        }

        if (heroTitle) {
            // Apply XSS mitigation encoding safety checks before innerHTML injection
            heroTitle.innerHTML = escapeHTML(cleanHeroTitle);
        }

        if (heroDescription) {
            // Truncate summary lengths to protect text from breaking mobile layouts
            heroDescription.textContent = anime.synopsis
                ? truncateString(anime.synopsis, 220)
                : 'No preview summary description available for this upcoming release.';
        }

        // Clone and replace the button to strip any old event listeners from the previous slide, then attach the new redirect link for the current slide.
        if (heroButton) {
            const newButton = heroButton.cloneNode(true);
            heroButton.parentNode.replaceChild(newButton, heroButton);
            
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = `anime-details.html?id=${anime.mal_id}`;
            });
        }

        // Step 3: Restore full opacity to complete the visual transition sequence
        heroSection.style.opacity = '1';
    }, 200); // 200ms matches the quick fade timing window
}