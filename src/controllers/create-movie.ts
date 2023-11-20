import { Request, Response } from "express";
import { db } from "../db/prisma";

type MovieDetails = {
    title: string,
    id: number,
    release_date: string,
    poster_path: string,
}

type Body = {
    id?: string
    url?: string
}

const getMovieDetails = async (id: string | number): Promise<MovieDetails> => {
    const url = new URL(`https://api.themoviedb.org/3/movie/${id}`)
    const headers = {
        "Authorization": `Bearer ${process.env.TMDB_API_KEY}`,
        "Accept": "application/json"
    }
    const result = await fetch(url, { headers })
    return await result.json()
}

export default async function createMovie(req: Request, res: Response) {
    const { id, url } = req.body as Body

    const isExisted = await db.movie.findUnique({
        where: {
            id: Number(id)
        }
    })

    if (!isExisted) {
        try {
            const movieDetails = await getMovieDetails(id)
            const movie = await db.movie.create({
                data: {
                    id: movieDetails.id,
                    title: movieDetails.title,
                    releaseDate: new Date(movieDetails.release_date),
                    poster: movieDetails.poster_path,
                    plays: {
                        create: {
                            url
                        }
                    }
                },
                include: {
                    plays: true
                }
            })
            res.status(201).json({ message: "Movie created successfully", movie });
        } catch (error) {
            res.status(500).json({
                error: "Internal Server Error",
                message: "An error occurred while processing your request. Please try again later."
            })
        }
    } else {
        return res.status(409).json({
            error: "Conflict",
            message: "The resource already exists."
        })
    }
};
