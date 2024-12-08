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
            const error = new Error('Year and page query parameters are required.');
            (error as any).status = 400; // Bad Request
            throw error;
        }

        const movies = await getMoviesByYear(year as string, parseInt(page as string, 10));
        res.status(200).json({
            success: true,
            data: movies,
        });
    } catch (error) {
        next(error); // Forward error to the global error handler
    }
};
