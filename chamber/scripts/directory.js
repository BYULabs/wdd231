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
        directoryContainer.textContent = '';
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Error loading business directory. Please try again later.';
        directoryContainer.appendChild(errorMsg);
    }
}

function createBusinessCard(business) {
    const card = document.createElement('article');
    card.classList.add('business-card');

    const logoDiv = document.createElement('div');
    logoDiv.classList.add('business-logo');
    logoDiv.textContent = business.logo;

    const contentDiv = document.createElement('div');

    const name = document.createElement('h3');
    name.classList.add('business-name');
    name.textContent = business.name;

    const category = document.createElement('p');
    category.classList.add('business-category');
    category.textContent = business.category;

    const address = document.createElement('p');
    address.classList.add('business-address');
    address.textContent = business.address;

    const phonePara = document.createElement('p');
    phonePara.classList.add('business-phone');
    const phoneLink = document.createElement('a');
    phoneLink.setAttribute('href', business.phoneLink);
    phoneLink.textContent = business.phone;
    phonePara.appendChild(phoneLink);

    const websiteDiv = document.createElement('div');
    websiteDiv.classList.add('business-website');
    const webLink = document.createElement('a');
    webLink.setAttribute('href', business.website);
    webLink.setAttribute('target', '_blank');
    webLink.setAttribute('rel', 'noreferrer');
    webLink.textContent = 'Visit Website →';
    websiteDiv.appendChild(webLink);

    contentDiv.appendChild(name);
    contentDiv.appendChild(category);
    contentDiv.appendChild(address);
    contentDiv.appendChild(phonePara);
    contentDiv.appendChild(websiteDiv);

    card.appendChild(logoDiv);
    card.appendChild(contentDiv);

    return card;
}

function renderDirectory() {
    directoryContainer.textContent = '';

    businesses.forEach((business) => {
        const cardElement = createBusinessCard(business);
        directoryContainer.appendChild(cardElement);
    });
}

function setGridView() {
    currentView = 'grid';
    directoryContainer.classList.remove('list-view');
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
}

function setListView() {
    currentView = 'list';
    directoryContainer.classList.add('list-view');
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
}

// Event listeners
gridViewBtn.addEventListener('click', setGridView);
listViewBtn.addEventListener('click', setListView);

loadBusinesses();