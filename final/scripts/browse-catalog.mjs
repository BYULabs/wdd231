import { fetchCurrentAnime } from "./api.mjs";
import { escapeHTML, getAnimeImageUrl, getAnimeTitle, createGenreTagsHTML, getCurrentSeasonTitle } from "./utils.mjs";

export async function initBrowseCatalog() {
  const grid = document.getElementById('animeGrid');
  const filterSource = document.getElementById('filterSource'); // Track new DOM element
  const filterGenre = document.getElementById('filterGenre');
  const filterSort = document.getElementById('filterSort');
  const mainTitle = document.querySelector('.browse-main-title');

  if (!grid || !filterSource || !filterGenre || !filterSort) return;

  if (mainTitle) {
    mainTitle.textContent = getCurrentSeasonTitle();
  }

  let liveAnimeData = [];

  try {
    const rawAnimeData = await fetchCurrentAnime();

    if (!rawAnimeData || !rawAnimeData.length) {
        throw new Error("No live seasonal catalog data was retrieved.");
    }

    const seenIds = new Set();
    liveAnimeData = rawAnimeData.filter(anime => {
        if (seenIds.has(anime.mal_id)) {
            return false;
        }
        seenIds.add(anime.mal_id);
        return true;
    });

    // Bind events to the updated source selector element
    filterSource.addEventListener('change', applyFilters);
    filterGenre.addEventListener('change', applyFilters);
    filterSort.addEventListener('change', applyFilters);

    renderCards(liveAnimeData);

  } catch (error) {
     console.error("Failed to load browse catalog components from API:", error);
     grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: rgba(255,255,255,0.4); padding: 40px 0;">Unable to render current season. Please reload the page.</p>';
  }

  function renderCards(data) {
    grid.innerHTML = '';
    
    data.forEach((anime) => {
      const title = getAnimeTitle(anime);
      const imageUrl = getAnimeImageUrl(anime);
      const rating = anime.score ? anime.score.toFixed(2) : "N/A";
      
      // Dynamically display the Source property on the badge instead of format!
      const sourceMaterial = anime.source || "Original";
      const studio = anime.studios && anime.studios.length > 0 ? anime.studios[0].name : "Unknown Studio";
      const genreBadgesHTML = createGenreTagsHTML(anime.genres);

      const card = document.createElement('div');
      card.className = 'anime-card';
      
      card.innerHTML = `
        <a href="anime-details.html?id=${anime.mal_id}" class="anime-card-link-wrapper">
          <div class="anime-card-image-wrapper">
            <img
              src="${imageUrl}"
              alt="${escapeHTML(title)}"
              class="card-image"
              loading="lazy"
            >
            <span class="browse-format-badge">${escapeHTML(sourceMaterial)}</span>
            <div class="card-overlay">
              <div class="genre-tags">
                ${genreBadgesHTML}
              </div>
              <div class="browse-overlay-meta">
                <span class="browse-studio-text">${escapeHTML(studio)}</span>
                <div class="browse-rating-row">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="star-icon"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
                  <span>${rating}</span>
                </div>
              </div>
            </div>
          </div>
        </a>
        <h3 class="browse-card-title">${escapeHTML(title)}</h3>
      `;

      localStorage.setItem(`anime_detail_${anime.mal_id}`, JSON.stringify({ data: anime, timestamp: Date.now() }));
      grid.appendChild(card);
    });
  }

  function applyFilters() {
    let filtered = [...liveAnimeData];

    // Source Material filtering logic
    const sourceValue = filterSource.value;
    if (sourceValue !== 'all') {
      if (sourceValue === 'other') {
        // Group niche properties like Web Manga, Card Games, Visual Novels together
        const standardSources = ['manga', 'light novel', 'original'];
        filtered = filtered.filter(a => !standardSources.includes((a.source || '').toLowerCase()));
      } else {
        // Match standard choices directly (manga, light novel, original)
        filtered = filtered.filter(a => (a.source || '').toLowerCase() === sourceValue);
      }
    }

    const genre = filterGenre.value;
    if (genre !== 'all') {
      filtered = filtered.filter(a => {
        if (!a.genres) return false;
        return a.genres.some(g => g.name.toLowerCase() === genre.toLowerCase());
      });
    }

    const sort = filterSort.value;
    if (sort === 'az') {
      filtered.sort((a, b) => getAnimeTitle(a).localeCompare(getAnimeTitle(b)));
    } else if (sort === 'rated') {
      filtered.sort((a, b) => (b.score || 0) - (a.score || 0));
    } else if (sort === 'popular') {
      filtered.sort((a, b) => (a.popularity || 9999) - (b.popularity || 9999));
    }

    renderCards(filtered);
  }
}