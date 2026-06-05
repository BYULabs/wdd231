import { memberData } from '../data/members.mjs';

let businesses = [];
const directoryContainer = document.getElementById('directory-container');

function createBusinessCard(business) {
    const card = document.createElement('article');
    card.classList.add('business-card');

    card.innerHTML = `
        <div class="business-logo">${business.logo}</div>
        <div>
            <h2 class="business-name">${business.name}</h2>
            <p class="business-category">${business.category}</p>
            <p class="business-address">${business.address}</p>
            <p class="business-phone"><a href="${business.phoneLink}">${business.phone}</a></p>
            <div class="business-website">
                <a href="${business.website}" target="_blank" rel="noreferrer">Visit Website →</a>
            </div>
        </div>
    `;
    return card;
}

function renderDirectory() {
    if (!directoryContainer) return;
    directoryContainer.innerHTML = '';
    businesses.forEach((business) => {
        directoryContainer.appendChild(createBusinessCard(business));
    });
}

// Notice: "async" is removed because the data is now instantly available
export function initDirectory() {
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');

    if (!directoryContainer) return; 

    gridViewBtn?.addEventListener('click', () => {
        directoryContainer.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn?.classList.remove('active');
    });

    listViewBtn?.addEventListener('click', () => {
        directoryContainer.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn?.classList.remove('active');
    });

    try {
        businesses = memberData.businesses;
        renderDirectory();
    } catch (error) {
        console.error('Error loading business directory:', error);
        directoryContainer.innerHTML = '<p>Error loading business directory. Please try again later.</p>';
    }
}