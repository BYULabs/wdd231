const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2'); 
        let birthDate = document.createElement('p');
        let birthPlace = document.createElement('p');
        let deathDate = document.createElement('p');
        let lengthOfService = document.createElement('p');
        let numChildren = document.createElement('p');
        let portrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.innerHTML = `<strong>Born:</strong> ${prophet.birthdate}`;
        birthPlace.innerHTML = `<strong>Birthplace:</strong> ${prophet.birthplace}`;
        deathDate.innerHTML = `<strong>Passed:</strong> ${prophet.death}`;
        lengthOfService.innerHTML = `<strong>Service:</strong> ${prophet.length} years`;
        numChildren.innerHTML = `<strong>Children:</strong> ${prophet.numofchildren}`;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(deathDate);
        card.appendChild(lengthOfService);
        card.appendChild(numChildren);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
}

getProphetData();