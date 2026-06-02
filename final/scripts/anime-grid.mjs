import { fetchCurrentAnime } from "./api.mjs";
import { createGenreTagsHTML, escapeHTML, getAnimeImageUrl, getAnimeTitle, truncateString } from "./utils.mjs";

export async function initAnimeGrid() {
    const grid = document.getElementById('animeGrid');

    if (!grid) return;

    try {
        const animeList = await fetchCurrentAnime();

        if (!animeList.length) {
            throw new Error('No streaming data found');
        }

        const topStreamingAnime = animeList.slice(0, 12);

        grid.innerHTML = '';

        topStreamingAnime.forEach(anime => {
            const cleanDisplayTitle = getAnimeTitle(anime);
            const currentStatusBadge = anime.episodes ? `EP ${anime.episodes}` : 'AIRING';
            const genreTagsHTML = createGenreTagsHTML(anime.genres);
            const imageUrl = getAnimeImageUrl(anime);

            const card = document.createElement('div');
            card.className = 'anime-card';
            card.setAttribute('data-mal-id', anime.mal_id);

            card.innerHTML = `
            <div class="anime-card-image-wrapper">
                <img 
                    src="${escapeHTML(imageUrl)}" 
                    alt="${escapeHTML(cleanDisplayTitle)}" 
                    class="card-image"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='https://placehold.co/400x600/16161f/ffffff?text=AniStream';"
                >
                
                <div class="ep-badge">
                    ${escapeHTML(currentStatusBadge)}
                </div>

                <div class="card-overlay">
                    <div class="genre-tags">
                        ${genreTagsHTML}
                    </div>
                    <p class="card-description">
                        ${escapeHTML(anime.synopsis ? truncateString(anime.synopsis, 120) : 'No plot synopsis description provided for this stream.')}
                    </p>
                </div>
            </div>
            <h3 class="card-title">${escapeHTML(cleanDisplayTitle)}</h3>
            `;

            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading top streaming grid components:', error);
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: rgba(255,255,255,0.4); padding: 40px 0;">Unable to display streaming anime right now. Please try again later.</p>';
    }
}