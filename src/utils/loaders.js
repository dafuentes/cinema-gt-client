import { redirect } from "react-router-dom";
import {
  getAsientosOcupados,
  getMovie,
  getMovies,
  resetLocalStorate,
} from "./ApiManager";

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

export async function loaderAsientos({ params }) {
  if (
    localStorage.getItem("movie_selected") &&
    localStorage.getItem("selected_date")
  ) {
    const selected_date = localStorage.getItem("selected_date");
    const { ocupados } = await getAsientosOcupados(
      params.movieId,
      params.horarioId,
      selected_date
    );
    return { ocupados };
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
