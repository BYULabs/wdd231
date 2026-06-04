import { fetchAnimeById } from "./api.mjs";
import { escapeHTML, getAnimeImageUrl, getAnimeTitle } from "./utils.mjs";

// SVG icon database matching your explicit layout design
const svgIcons = {
    'book-open': `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-icon lucide-book-open"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>`,
    'calendar': `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-icon lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`,
    'clock': `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-icon lucide-clock"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    'timer': `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-timer-icon lucide-timer"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>`,
    'building': `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building-icon lucide-building"><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M12 6h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/><path d="M8 6h.01"/><path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/><rect x="4" y="2" width="16" height="20" rx="2"/></svg>`,
    'film': `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-film-icon lucide-film"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>`,
    'tv': `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tv-icon lucide-tv"><path d="m17 2-5 5-5-5"/><rect width="20" height="15" x="2" y="7" rx="2"/></svg>`,
    'star': `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>`
};

/**
 * Orchestrates fetching anime details based on URL parameters and parsing to UI
 */
export async function initAnimeDetails() {
    // Guard clause: Exit early if detail nodes don't exist on this particular page
    if (!document.getElementById('productionGrid')) return;

    // Parse URL parameter tracking token
    const params = new URLSearchParams(window.location.search);
    const animeId = params.get('id');

    // Fallback default: If no ID parameter is offered, fall back to an arbitrary valid item (e.g., ID 5114 = Fullmetal Alchemist)
    if (!animeId) {
        window.location.search = '?id=5114';
        return;
    }

    try {
        const anime = await fetchAnimeById(animeId);
        if (!anime) throw new Error("Anime structural payload empty.");

        renderDetails(anime);
    } catch (error) {
        console.error("Error loading anime details profile window:", error);
        document.getElementById('breadcrumbTitle').textContent = "Error Loading";
        document.getElementById('titleEn').textContent = "Unable to load data.";
    }
}

/**
 * Builds layout structures and pushes data cleanly to DOM target layouts
 */
function renderDetails(anime) {
    const cleanTitle = getAnimeTitle(anime);
    const imageUrl = getAnimeImageUrl(anime);
    const jpTitle = anime.title_japanese || '—';
    const studioName = anime.studios?.[0]?.name || 'Unknown Studio';

    // Update Global document metadata headers
    document.title = `${cleanTitle} — AniStream`;

    // Visual assets mapping
    document.getElementById('bannerImage').src = imageUrl;
    document.getElementById('bannerImage').alt = `${cleanTitle} Banner`;
    document.getElementById('posterImage').src = imageUrl;
    document.getElementById('posterImage').alt = `${cleanTitle} Poster`;

    // Dynamic text nodes injection
    document.getElementById('breadcrumbTitle').textContent = cleanTitle;
    document.getElementById('titleEn').textContent = cleanTitle;
    document.getElementById('titleJp').textContent = jpTitle;
    document.getElementById('synopsis').textContent = anime.synopsis || 'No preview summary description provided for this entry.';

    // Status evaluation and formatting parameters mapping
    const statusText = anime.status || 'Unknown';
    const isAiring = statusText.toLowerCase().includes('airing');
    const statusClass = isAiring ? 'badge-status-airing' : 'badge-status-completed';
    const statusDotClass = isAiring ? 'status-dot-green' : 'status-dot-blue';

    // Render operational sub-elements: Badges row
    const metaBadges = document.getElementById('metaBadges');
    metaBadges.innerHTML = `
        <div class="meta-badge-item text-yellow-badge">
            ${svgIcons['star']}
            <span>${anime.score ? anime.score.toFixed(2) : 'N/A'}</span>
        </div>
        <div class="meta-badge-item">
            ${svgIcons['tv']}
            <span>${anime.episodes || '?'} EP${anime.episodes !== 1 ? 's' : ''}</span>
        </div>
        <div class="meta-badge-item">
            ${svgIcons['building']}
            <span>${escapeHTML(studioName)}</span>
        </div>
        <div class="meta-badge-item">
            ${svgIcons['film']}
            <span>${escapeHTML(anime.type || 'TV')}</span>
        </div>
        <div class="meta-badge-status ${statusClass}">
            <span class="status-dot ${statusDotClass}"></span>
            ${escapeHTML(statusText)}
        </div>
    `;

    // Render category flags logic
    const genreTags = document.getElementById('genreTags');
    if (anime.genres && anime.genres.length > 0) {
        genreTags.innerHTML = anime.genres.map(g => 
            `<span class="genre-tag-item">${escapeHTML(g.name)}</span>`
        ).join('');
    } else {
        genreTags.innerHTML = '<span class="genre-tag-item">Anime</span>';
    }

    // Production spreadsheet dataset structural mapping
    const productionGrid = document.getElementById('productionGrid');
    const productionData = [
        { label: 'Source Material', value: anime.source || 'Unknown', icon: 'book-open' },
        { label: 'Premiered', value: (anime.season && anime.year) ? `${anime.season} ${anime.year}` : 'Unknown', icon: 'calendar' },
        { label: 'Broadcast', value: anime.broadcast?.string || 'Unknown', icon: 'clock' },
        { label: 'Duration', value: anime.duration || 'Unknown', icon: 'timer' },
        { label: 'Studio', value: studioName, icon: 'building' },
        { label: 'Type', value: anime.type || 'Unknown', icon: 'film' },
    ];

    productionGrid.innerHTML = productionData.map(item => `
        <div class="production-table-row">
          <div class="production-label-col">
            ${svgIcons[item.icon]}
            <span>${escapeHTML(item.label)}</span>
          </div>
          <div class="production-value-col">${escapeHTML(item.value)}</div>
        </div>
    `).join('');
}

