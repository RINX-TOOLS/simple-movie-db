export const tmdbConfig = {
    headers: {
        "Authorization": `Bearer ${process.env.TMDB_API_KEY}`,
        "Accept": "application/json"
    },
    baseUrl: process.env.TMDB_BASE_URL,
}