"use server";
import { db } from "@/lib/db";
import { getMovieDetails } from "@/lib/get-movie-details";
import { revalidatePath } from "next/cache";

export const createMovie = async (formData: FormData) => {
    const id = formData.get("id") as string;
    const url = formData.get("url") as string;

    const isExisted = await db.movie.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (isExisted) return;

    const movieDetails = await getMovieDetails(id);

    await db.movie.create({
        data: {
            id: movieDetails.id,
            title: movieDetails.title,
            poster: movieDetails.poster_path,
            releaseDate: new Date(movieDetails.release_date),
            plays: {
                create: {
                    label: "Default",
                    url: url.replace(/\s/g, ''),
                },
            },
        },
    });

    revalidatePath("/new")
};