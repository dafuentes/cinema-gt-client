import { getMovie, getMovies } from "./ApiManager";

export async function loaderHome() {
  const movies = await getMovies();
  return { movies };
}

export async function loaderDetailMovie({ params }) {
  const movie = await getMovie(params.movieId);
  return { movie };
}
