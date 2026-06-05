import { places } from '../data/places.mjs';

const container = document.getElementById('places-container');

/**
 * Creates the HTML structure for an individual place card
 */
function createPlaceCard(place) {
    const card = document.createElement('article');
    card.classList.add('place-card');
    card.setAttribute('data-category', place.category);

    card.innerHTML = `
        <div>
            <img src="images/${place.photo_url}" alt="${place.name}" loading="lazy">
            <h3>${place.name}</h3>
            <address>📍 <em>${place.address}</em></address>
            <p>${place.description}</p>
        </div>
    `;
    return card;
}

/**
 * Renders all cards into the main container
 */
function renderPlaces() {
    if (!container) return;
    
    container.innerHTML = ''; // Clear previous contents

    if (places.length === 0) {
        container.innerHTML = `<p class="no-results">No destinations found.</p>`;
        return;
    }

    places.forEach(place => {
        container.appendChild(createPlaceCard(place));
    });
}

/**
 * Initializer function called by main.mjs
 */
export function initDiscoverPage() {
    if (!container) return;

    renderPlaces();
}