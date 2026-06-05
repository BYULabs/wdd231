import { memberData } from '../data/members.mjs'; // Direct static import

function getRandomMembers(array, count) {
    const limit = Math.min(count, array.length);
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
}

function createSpotlightCard(member) {
    const card = document.createElement('article');
    card.className = 'spotlight-card';
    const membershipBadge = member.membership.charAt(0).toUpperCase() + member.membership.slice(1);
    
    card.innerHTML = `
        <div class="spotlight-header">
            <div class="spotlight-image">${member.logo}</div>
            <span class="membership-badge membership-${member.membership}">${membershipBadge}</span>
        </div>
        <h3>${member.name}</h3>
        <p class="spotlight-category">${member.category}</p>
        <div class="spotlight-info">
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> <a href="${member.phoneLink}">${member.phone}</a></p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noreferrer">${member.website}</a></p>
        </div>
        <a href="${member.website}" target="_blank" rel="noreferrer" class="spotlight-link">Visit Website →</a>
    `;
    return card;
}

// Notice: "async" is removed here as well
export function initSpotlights() {
    const container = document.querySelector('.spotlights-container');
    if (!container) return;

    try {
        // Filter directly from the imported object
        const premiumMembers = memberData.businesses.filter(
            m => m.membership === 'gold' || m.membership === 'silver'
        );

        if (premiumMembers.length === 0) return;

        const randomCount = Math.floor(Math.random() * 2) + 2; 
        const selectedMembers = getRandomMembers(premiumMembers, randomCount);

        container.innerHTML = '';
        selectedMembers.forEach(member => {
            container.appendChild(createSpotlightCard(member));
        });
    } catch (error) {
        console.error('Error loading spotlights:', error);
    }
}