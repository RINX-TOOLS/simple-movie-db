import RecentlyAddedMovies from "@/components/RecentlyAddedMovies";
import { Suspense } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { createMovie } from "./new-movie-action";
import { cookies } from "next/headers";
import { searchMovies } from "./seearch-movie-action";
import { setIdToCookie } from "./set-id-cookie-action";

type Results = {
  id: number;
  title: string;
  poster_path: string;
};

export default function New() {
  const movieId = cookies().get("movie_id")?.value || "";
  const search_results = cookies().get("search_results")?.value;

  return (
    <main className="h-screen max-w-5xl mx-auto p-6">
      <form action={searchMovies}>
        <input type="text" placeholder="Search" name="query" />
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
              <SubmitButton
                label={`${movieId === String(result.id) ? "✅" : "➡️"} ${
                  result.title
                }`}
              />
            </form>
          ))}
        </div>
      )}
      <form className="flex gap-3" action={createMovie}>
        <input
          className="px-3 py-1 rounded"
          type="text"
          placeholder="id"
          name="id"
          required
          defaultValue={movieId}
        />
        <input
          className="px-3 py-1 rounded"
          type="url"
          placeholder="url"
          name="url"
          required
        />
        <SubmitButton label="Submit" />
      </form>
      <Suspense fallback={<div>Loading...</div>}>
        <RecentlyAddedMovies />
      </Suspense>
    </main>
  );
}
