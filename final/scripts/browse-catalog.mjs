import { fetchCurrentAnime } from "./api.mjs";
import { escapeHTML, getAnimeImageUrl, getAnimeTitle, createGenreTagsHTML } from "./utils.mjs";

export async function initBrowseCatalog() {
  const grid = document.getElementById('animeGrid');
  const filterSource = document.getElementById('filterSource'); // Track new DOM element
  const filterGenre = document.getElementById('filterGenre');
  const filterSort = document.getElementById('filterSort');

  if (!grid || !filterSource || !filterGenre || !filterSort) return;

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
                  <svg class="star-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
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