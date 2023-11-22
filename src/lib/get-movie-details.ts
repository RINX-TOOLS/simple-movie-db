import { tmdbConfig } from "@/config/tmdb";

type MovieDetails = {
    title: string;
    id: number;
    release_date: string;
    poster_path: string;
};

export const getMovieDetails = async (id: string | number): Promise<MovieDetails> => {
    const movie = await fetch(`${tmdbConfig.baseUrl}/movie/${id}`, {
        headers: tmdbConfig.headers,
    });
    return await movie.json();
};
