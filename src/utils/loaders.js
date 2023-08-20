import { getMovie, getMovies } from "./ApiManager";

export async function loaderHome() {
  const movies = await getMovies();
  return { movies };
}

export async function loaderDetailMovie({ params }) {
  localStorage.removeItem("movie_selected");
  localStorage.removeItem("info_asientos");
  const movie = await getMovie(params.movieId);
  return { movie };
}
