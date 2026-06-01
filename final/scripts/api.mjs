import { JIKAN_BASE_URL } from "./config.mjs";

async function fetchJikanData(endpoint, errorMessage) {
    const response = await fetch(`${JIKAN_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
        throw new Error(errorMessage);
    }

    const json = await response.json();
    return json.data || [];
}

export function fetchUpcomingAnime() {
    return fetchJikanData('/seasons/upcoming?sfw=true', 'Failed to fetch upcoming slider data');
}