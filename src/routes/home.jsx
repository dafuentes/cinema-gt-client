import { useContext } from "react";
import { Link, Navigate, useLoaderData } from "react-router-dom";
import useMovies from "../hooks/useMovies";

export default function Home() {
  /*   const { movies } = useMovies(); */
  const { movies } = useLoaderData();
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-0 py-6">
      <div className="space-y-6">
        <div>
          <div className="text-4xl">Now Playing</div>
          <div className="flex flex-wrap mt-6 gap-6">
            {movies.map((item) => (
              <div key={item.id}>
                <Link to={`movie/${item.id}`}>
                  <img className="w-full md:h-62 md:w-64" src={item.image} />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-4xl">Now Playing</div>
          <div className="flex flex-wrap mt-6 gap-6">
            {movies.map((item) => (
              <div key={item.id}>
                <img className="w-full md:h-62 md:w-64" src={item.image} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
