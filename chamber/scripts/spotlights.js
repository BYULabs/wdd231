// Spotlights Script - Fetch and display random member spotlights

async function loadSpotlights() {
  try {
    const response = await fetch('https://byulabs.github.io/wdd231/chamber/data/members.json');
    
    const data = await response.json();
    
    // Filter for gold and silver members only
    const premiumMembers = data.businesses.filter(
      member => member.membership === 'gold' || member.membership === 'silver'
    );
    
    // Randomly select 2-3 members
    const randomCount = Math.floor(Math.random() * 2) + 2;
    const selectedMembers = getRandomMembers(premiumMembers, randomCount);
    
    // Display the spotlights
    displaySpotlights(selectedMembers);
    
  } catch (error) {
    console.error('Error loading spotlights:', error);
  }
}

