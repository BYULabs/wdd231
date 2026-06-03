/**
 * Truncates string values exceeding length limitations to keep text displays clean.
 * @param {string} value - The input phrase string.
 * @param {number} maxLength - Character threshold boundary.
 */
export function truncateString(value, maxLength) {
    if (!value || value.length <= maxLength) return value || '';
    return `${value.slice(0, maxLength)}...`; // Slice and stitch trailing ellipsis
}

/**
 * Resolves localized English title variants or basic fallback properties.
 */
export function getAnimeTitle(anime) {
    return anime?.title_english || anime?.title || 'Untitled Anime';
}

/**
 * Safely digs deep into structural nested Jikan API imagery arrays to extract target paths.
 */
export function getAnimeImageUrl(anime) {
    return anime?.images?.jpg?.image_url || '';
}

/**
 * Generates badge item labels for categories. Maxes out configuration displays at 2 badges.
 * @param {Array} genres - Raw list arrays of category genres.
 */
export function createGenreTagsHTML(genres = []) {
    // If the data has no assigned genres, append a default placeholder badge
    if (!genres.length) {
        return '<span class="genre-tag">Anime</span>';
    }

    // Limit display tags up to 2 items, escape values to prevent injection, and combine into a template string
    return genres
        .slice(0, 2)
        .map(genre => `<span class="genre-tag">${escapeHTML(genre.name)}</span>`)
        .join('');
}

/**
 * String sanitization logic processing engine to combat and defuse malicious XSS injection scripts.
 * Replaces critical code characters with their corresponding encoded HTML entities.
 */
export function escapeHTML(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}