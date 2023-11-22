"use server";

import { cookies } from "next/headers";

export async function setIdToCookie(formData: FormData) {
    const id = formData.get("id") as string
    cookies().set("movie_id", id);
}