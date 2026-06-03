// Import the base URL configuration
import { JIKAN_BASE_URL } from "./config.mjs";

/**
 * Helper function to handle boilerplate fetch operations and error responses.
 * @param {string} endpoint - The target API route (e.g., '/seasons/now').
 * @param {string} errorMessage - Custom message thrown if the network request fails.
 * @returns {Promise<Array>} Resolves to the 'data' array from Jikan API, or an empty fallback array.
 */
async function fetchJikanData(endpoint, errorMessage) {
    // Perform asynchronous HTTP fetch request
    const response = await fetch(`${JIKAN_BASE_URL}${endpoint}`);
    
    // Check if HTTP status code is in the 200-299 range; if not, crash gracefully to the catch block
    if (!response.ok) {
        throw new Error(errorMessage);
    }

    // Parse the JSON data stream
    const json = await response.json();
    
    // Safely return the 'data' field payload or a fallback empty list
    return json.data || [];
}

/**
 * Fetches upcoming anime data for the home page hero carousel slider.
 * Filters safe-for-work (?sfw=true) content.
 */
export function fetchUpcomingAnime() {
    return fetchJikanData('/seasons/upcoming?sfw=true', 'Failed to fetch upcoming slider data');
}

/**
 * Fetches currently airing/streaming anime data to populate the display grid.
 * Filters safe-for-work (?sfw=true) content.
 */
export function fetchCurrentAnime() {
    return fetchJikanData('/seasons/now?sfw=true', 'Failed to fetch streaming grid elements');
}