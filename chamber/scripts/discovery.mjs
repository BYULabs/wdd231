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

export function initVisitorMessage() {
    const toastElement = document.getElementById('visitor-toast');
    const messageElement = document.getElementById('visitor-message');
    const closeBtn = document.getElementById('close-bubble');
    
    if (!messageElement || !toastElement) return;

    const currentTimestamp = Date.now();
    const lastVisit = localStorage.getItem('last-visit-date');

    // Determine correct message logic
    if (!lastVisit) {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastTimestamp = parseInt(lastVisit, 10);
        const timeDifferenceMs = currentTimestamp - lastTimestamp;
        const msPerDay = 24 * 60 * 60 * 1000; 

        if (timeDifferenceMs < msPerDay) {
            messageElement.textContent = "Back so soon! Awesome!";
        } else {
            const daysPassed = Math.floor(timeDifferenceMs / msPerDay);
            if (daysPassed === 1) {
                messageElement.textContent = `You last visited 1 day ago.`;
            } else {
                messageElement.textContent = `You last visited ${daysPassed} days ago.`;
            }
        }
    }

    // Reveal the bubble by stripping the hidden styling
    toastElement.classList.remove('hidden');

    // Setup the dismissal event trigger
    closeBtn?.addEventListener('click', () => {
        toastElement.classList.add('hidden');
    });

    // Save the current timestamp to local storage for their next visit
    localStorage.setItem('last-visit-date', currentTimestamp);
}