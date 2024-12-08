import { fetchAPI } from '../api-utils/apiService';
import { Movie } from '../models/Movie';

/**
 * Fetch movies for a given year and page and add editor information if available.
 *
 * @param year - Year of the movies to fetch
 * @param page - Page number for paginated results
 * @returns An array of Movie objects
 */
export const getMoviesByYear = async (year: string, page: number): Promise<Movie[]> => {
    try {
        const movieEndpoint = '/discover/movie';
        const queryParams = {
            language: 'en-US',
            page: page.toString(),
            primary_release_year: year,
            sort_by: 'popularity.desc',
        };

        const movieResponse = await fetchAPI(movieEndpoint, queryParams);

        const movies: Movie[] = await Promise.all(
            movieResponse.results.map(async (movie: any) => {
                let editors: string[] = [];
                try {
                    const creditsEndpoint = `/movie/${movie.id}/credits`;
                    const creditsResponse = await fetchAPI(creditsEndpoint);

                    editors = creditsResponse.crew
                        .filter((person: any) => person.known_for_department === 'Editing')
                        .map((editor: any) => editor.name);
                } catch (error) {
                    if (error instanceof Error) {
                        console.warn(`Failed to fetch credits for movie ID ${movie.id}: ${error.message}`);
                    } else {
                        console.warn(`Unexpected error while fetching credits for movie ID ${movie.id}:`, error);
                    }
                }

                return {
                    title: movie.title,
                    release_date: movie.release_date,
                    vote_average: movie.vote_average,
                    editors,
                };
            })
        );

        return movies;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error in getMoviesByYear: ${error.message}`);
        } else {
            console.error(`Unexpected error in getMoviesByYear:`, error);
        }
        throw new Error('Failed to fetch movies');
    }
};