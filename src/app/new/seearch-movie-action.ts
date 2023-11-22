"use server";
import { tmdbConfig } from "@/config/tmdb"
import { cookies } from "next/headers"

type Search = {
    results: Results[]
}

type Results = {
    id: number,
    title: string,
    poster_path: string
    release_date: string
}

export async function searchMovies(formData: FormData): Promise<void> {
    const query = formData.get("query") as string
    const url = new URL(`${tmdbConfig.baseUrl}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
    const res = await fetch(url, { headers: tmdbConfig.headers })
    const search = await res.json() as Search
    const results = search.results.slice(0, 6).map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        date: movie.release_date
    }))
    cookies().set("search_results", JSON.stringify(results))
}