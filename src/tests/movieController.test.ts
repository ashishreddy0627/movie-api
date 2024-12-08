import request from 'supertest';
import app from '../src/app';
import dotenv from 'dotenv';

dotenv.config();

describe('Movie API Tests', () => {
    // Base URL for testing
    const baseURL = '/api/movies';

    // Mock valid year and page
    const validYear = '2019';
    const validPage = '1';

    // Test 1: Successful API call
    it('should return a list of movies for the given year and page', async () => {
        const response = await request(app).get(`${baseURL}?year=${validYear}&page=${validPage}`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('title');
        expect(response.body[0]).toHaveProperty('release_date');
        expect(response.body[0]).toHaveProperty('vote_average');
    });

    // Test 2: Missing Query Parameters
    it('should return 400 when year or page is missing', async () => {
        const response = await request(app).get(baseURL);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Year and page are required query parameters');
    });

    // Test 3: Invalid Query Parameters
    it('should return 400 when year or page is invalid', async () => {
        const response = await request(app).get(`${baseURL}?year=abcd&page=1`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
    });

    // Test 4: TMDB API Failure Simulation
    it('should handle TMDB API failure gracefully', async () => {
        process.env.TMDB_BEARER_TOKEN = 'invalid_token';
        const response = await request(app).get(`${baseURL}?year=${validYear}&page=${validPage}`);
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error');
        process.env.TMDB_BEARER_TOKEN = 'your_actual_token'; // Reset valid token
    });

    // Test 5: Page Number Edge Case
    it('should return 200 with an empty array for an out-of-range page', async () => {
        const response = await request(app).get(`${baseURL}?year=${validYear}&page=9999`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(0);
    });

    // Test 6: Editors Property Optional
    it('should return movies with an optional editors property', async () => {
        const response = await request(app).get(`${baseURL}?year=${validYear}&page=${validPage}`);
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('editors');
        expect(Array.isArray(response.body[0].editors)).toBe(true);
    });
});
