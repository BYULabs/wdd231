const directoryContainer = document.getElementById('directory-container');
const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');

let currentView = 'grid';
let businesses = [];

async function loadBusinesses() {
    try {
        const response = await fetch('https://byulabs.github.io/wdd231/chamber/data/members.json');
        const data = await response.json();
        businesses = data.businesses;
        renderDirectory();
    } catch (error) {
        console.error('Error loading business data:', error);
        directoryContainer.innerHTML = '<p>Error loading business directory. Please try again later.</p>';
    }
}

function createBusinessCard(business) {
    return `
        <article class="business-card">
            <div class="business-logo">${business.logo}</div>
            <div>
                <h3 class="business-name">${business.name}</h3>
                <p class="business-category">${business.category}</p>
                <p class="business-address">${business.address}</p>
                <p class="business-phone">
                    <a href="${business.phoneLink}">${business.phone}</a>
                </p>
                <div class="business-website">
                    <a href="${business.website}" target="_blank" rel="noreferrer">Visit Website →</a>
                </div>
            </div>
        </article>
    `;
}

function renderDirectory() {
    directoryContainer.innerHTML = businesses.map(createBusinessCard).join('');
}

loadBusinesses();