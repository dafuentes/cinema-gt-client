import { redirect } from "react-router-dom";
import { getMovie, getMovies, resetLocalStorate } from "./ApiManager";

export async function loaderHome() {
  resetLocalStorate();
  const movies = await getMovies();
  return { movies };
}

export async function loaderDetailMovie({ params }) {
  resetLocalStorate();
  const movie = await getMovie(params.movieId);
  return { movie };
}

export async function loaderAsientos() {
  if (localStorage.getItem("movie_selected")) {
    return null;
  } else {
    return redirect("/");
  }
}
export async function loaderCompra() {
  if (
    localStorage.getItem("movie_selected") &&
    localStorage.getItem("info_asientos")
  ) {
    return null;
  } else {
    return redirect("/");
  }
}
