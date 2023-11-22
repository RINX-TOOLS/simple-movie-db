import { db } from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl
    const page = searchParams.get("page") || 1
    const itemsPerPage = searchParams.get("itemsPerPage") || 2

    const offset = (Number(page) - 1) * Number(itemsPerPage);
    const totalMovies = await db.movie.count()
    const totalPages = Math.ceil(totalMovies / Number(itemsPerPage));

    const movies = await db.movie.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            releaseDate: true,
            poster: true,
            title: true
        },
        skip: offset,
        take: Number(itemsPerPage)
    })
    return NextResponse.json({ movies, totalPages, page: Number(page) })
}