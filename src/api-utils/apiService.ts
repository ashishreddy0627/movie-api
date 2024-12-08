import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.TMDB_API_BASE;
const BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

/**
 * Fetch data from a TMDB API endpoint with query parameters.
 *
 * @param endpoint - API endpoint relative to the base URL
 * @param queryParams - Query parameters for the API call
 * @returns The response data or throws an error
 */
export const fetchAPI = async (endpoint: string, queryParams: Record<string, any> = {}) => {
    try {
        const url = `${BASE_URL}${endpoint}`;
        const headers = { Authorization: `Bearer ${BEARER_TOKEN}` };

        const response = await axios.get(url, { params: queryParams, headers });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error in fetchAPI - ${endpoint}: ${error.message}`);
        } else {
            console.error(`Unexpected error in fetchAPI - ${endpoint}:`, error);
        }
        throw new Error(`API Error: Unable to fetch data from ${endpoint}`);
    }
};
