import { db } from "@/lib/db";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function RecentlyAddedMovies() {
  const movies = await db.movie.findMany({
    select: {
      id: true,
      title: true,
    },
    take: 12,
    orderBy: {
      createdAt: "desc",
    },
  });

  const movieCount = await db.movie.count();

  if (!movieCount) {
    return <div>No Movies Founded</div>;
  }

  return (
    <div data-headers={headers()}>
      <div>
        <h2 className="text-xl">Recently Added ({movieCount})</h2>
      </div>
      <ol>
        {movies.map((movie: any) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
          </li>
        ))}
      </ol>
    </div>
  );
}
