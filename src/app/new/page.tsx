import RecentlyAddedMovies from "@/components/RecentlyAddedMovies";
import { Suspense } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { createMovie } from "./new-movie-action";
import { cookies } from "next/headers";
import { searchMovies } from "./seearch-movie-action";
import { setIdToCookie } from "./set-id-cookie-action";
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";

type Results = {
  id: number;
  title: string;
  poster: string;
  date: string;
};

export default function New() {
  const movieId = cookies().get("movie_id")?.value || "";
  const search_results = cookies().get("search_results")?.value;

  return (
    <main className="h-screen max-w-5xl mx-auto p-6 space-y-3">
      <div>
        <h1 className="text-4xl font-semibold">Server Actions + Cookies 😎</h1>
      </div>
      <form action={searchMovies} className="inline-flex items-center">
        <input
          className="px-3 py-1 rounded mr-2"
          type="text"
          placeholder="Search"
          name="query"
        />
        <SubmitButton>{""}</SubmitButton>
      </form>
      {search_results && (
        <div>
          {JSON.parse(search_results).map((result: Results) => (
            <form action={setIdToCookie} key={result.id}>
              <input
                type="text"
                className="sr-only"
                name="id"
                value={result.id}
              />
              <SubmitButton>
                {movieId === String(result.id) ? (
                  <span className="text-green-500">
                    <IoIosCheckmarkCircle />
                  </span>
                ) : (
                  <IoIosCheckmarkCircleOutline />
                )}
                ({result.date && result.date?.slice(0, 4)}) {result.title} [
                {result.id}]
              </SubmitButton>
            </form>
          ))}
        </div>
      )}
      <form className="grid gap-3" action={createMovie}>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            className="px-3 py-1 rounded"
            type="text"
            placeholder="TMDB ID"
            name="id"
            required
            value={movieId}
          />
          <input
            className="px-3 py-1 rounded"
            type="url"
            placeholder="https://hls.com/playlist.m3u8"
            name="url"
            required
          />
        </div>
        <div className="border px-3 py-1 rounded w-fit hover:bg-slate-500/10">
          <SubmitButton>Submit</SubmitButton>
        </div>
      </form>
      <Suspense fallback={<div>Loading...</div>}>
        <RecentlyAddedMovies />
      </Suspense>
    </main>
  );
}
