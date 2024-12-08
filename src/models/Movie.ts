/**
 * Movie Interface:
 * Represents the structure of a Movie object
 * 
 * @property title - The title of the movie
 * @property release_date - The release date of the movie
 * @property vote_average - Average user rating for the movie
 * @property editors - Optional list of editor names associated with the movie
 */
export interface Movie {
    title: string;
    release_date: string;
    vote_average: number;
    editors?: string[];
}
