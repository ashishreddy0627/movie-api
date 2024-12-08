import { Router } from 'express';
import { getMovies } from '../controllers/movieController';

const router = Router();

/**
 * Utility to handle async route handlers and catch errors.
 */
const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * @route GET /movies
 * @query year - The year to fetch movies for (YYYY format)
 * @query page - Page number for pagination
 * @description Fetch movies by year sorted by popularity.
 */
router.get('/movies', asyncHandler(getMovies));

export default router;
