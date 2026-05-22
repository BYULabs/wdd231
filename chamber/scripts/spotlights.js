// Spotlights Script - Fetch and display random member spotlights
// Uses async/await to fetch members from JSON and displays 2-3 random gold or silver members

async function loadSpotlights() {
  try {
    // Fetch the members data using relative path
    const response = await fetch('https://byulabs.github.io/wdd231/chamber/data/members.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch members: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter for gold and silver members only
    const premiumMembers = data.businesses.filter(
      member => member.membership === 'gold' || member.membership === 'silver'
    );
    
    if (premiumMembers.length === 0) {
      console.warn('No gold or silver members found');
      return;
    }
    
    // Randomly select 2-3 members
    const randomCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
    const selectedMembers = getRandomMembers(premiumMembers, randomCount);
    
    // Display the spotlights
    displaySpotlights(selectedMembers);
    
  } catch (error) {
    console.error('Error loading spotlights:', error);
  }
}

function getRandomMembers(array, count) {
  // Ensure we don't request more items than available
  const limit = Math.min(count, array.length);
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}

function displaySpotlights(members) {
  const container = document.querySelector('.spotlights-container');
  
  if (!container) {
    console.error('Spotlights container not found');
    return;
  }
  
  // Clear existing content
  container.innerHTML = '';
  
  // Create and append spotlight cards for each member
  members.forEach(member => {
    const card = createSpotlightCard(member);
    container.appendChild(card);
  });
}

function createSpotlightCard(member) {
  const card = document.createElement('article');
  card.className = 'spotlight-card';
  
  // Determine membership badge style
  const membershipBadge = member.membership.charAt(0).toUpperCase() + member.membership.slice(1);
  const membershipClass = `membership-${member.membership}`;
  
  card.innerHTML = `
    <div class="spotlight-header">
      <div class="spotlight-image">${member.logo}</div>
      <span class="membership-badge ${membershipClass}">${membershipBadge}</span>
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

// Load spotlights when page loads
document.addEventListener('DOMContentLoaded', loadSpotlights);
