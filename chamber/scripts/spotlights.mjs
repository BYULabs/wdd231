import { memberData } from '../data/members.mjs';

function getRandomMembers(array, count) {
    const limit = Math.min(count, array.length);
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
}

function createSpotlightCard(member) {
    const card = document.createElement('article');

    // Usamos las clases exactas de tu nuevo diseño limpio sin Tailwind
    card.className = 'card spotlight-card';
    
    // Mapeo e internacionalización de los niveles de membresía
    const badgeClass = member.membership === 'gold' ? 'badge-gold' : 'badge-silver';
    const badgeText = member.membership === 'gold' ? 'Membresía Oro' : 'Membresía Plata';
    
    card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
            <span class="badge ${badgeClass}">${badgeText}</span>
            <span style="font-size: 1.75rem; line-height: 1;">${member.logo}</span>
        </div>
        <h3 style="margin-bottom: 0.5rem;">${member.name}</h3>
        <p style="font-size: 0.85rem; color: var(--andean-400); font-weight: 500; margin-bottom: 1rem; text-transform: uppercase;">
            ${member.category}
        </p>
        <p style="font-size: 0.95rem; margin-bottom: 1rem; color: var(--navy-300);">
            <strong>Dirección:</strong> ${member.address}
        </p>
        <div style="font-size: 0.85rem; margin-top: auto; display: flex; flex-direction: column; gap: 0.25rem;">
            <p>📞 Tel: <a href="${member.phoneLink}" style="color: var(--navy-500); font-weight: 500;">${member.phone}</a></p>
            <p>🌐 <a href="${member.website}" target="_blank" rel="noreferrer" style="color: var(--gold-500); font-weight: 600;">Visitar sitio web →</a></p>
        </div>
    `;
    return card;
}

export function initSpotlights() {
    const container = document.querySelector('.spotlights-container');
    if (!container) return;

    try {
        // Filtrar afiliados con niveles Premium (oro y plata)
        const premiumMembers = memberData.businesses.filter(
            m => m.membership === 'gold' || m.membership === 'silver'
        );

        if (premiumMembers.length === 0) return;

        // Obtener aleatoriamente entre 2 y 3 miembros para rellenar la grilla
        const randomCount = Math.floor(Math.random() * 2) + 2;
        const selectedMembers = getRandomMembers(premiumMembers, randomCount);

        container.innerHTML = '';
        selectedMembers.forEach(member => {
            container.appendChild(createSpotlightCard(member));
        });
    } catch (error) {
        console.error('Error al cargar la sección de afiliados destacados:', error);
    }
}