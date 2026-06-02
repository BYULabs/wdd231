export function truncateString(value, maxLength) {
    if (!value || value.length <= maxLength) return value || '';
    return `${value.slice(0, maxLength)}...`;
}

export function getAnimeTitle(anime) {
    return anime?.title_english || anime?.title || 'Untitled Anime';
}

export function getAnimeImageUrl(anime) {
    return anime?.images?.jpg?.image_url || '';
}

export function createGenreTagsHTML(genres = []) {
    if (!genres.length) {
        return '<span class="genre-tag">Anime</span>';
    }

    return genres
        .slice(0, 2)
        .map(genre => `<span class="genre-tag">${escapeHTML(genre.name)}</span>`)
        .join('');
}

export function escapeHTML(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}




