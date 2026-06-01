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

export function escapeHTML(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}





