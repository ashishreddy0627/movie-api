import { Request, Response, NextFunction } from 'express';
import { getMoviesByYear } from '../services/movieService';

/**
 * Controller to handle requests for fetching movies by year.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { year, page } = req.query;

        if (!year || isNaN(Number(page))) {
            return res.status(400).json({ message: 'Year and page are required query parameters' });
        }

        const movies = await getMoviesByYear(year as string, parseInt(page as string, 10));
        res.status(200).json(movies);
    } catch (error) {
        next(error); // Pass error to Express error handler
    }
};