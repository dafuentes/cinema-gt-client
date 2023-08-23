import { baseAxios } from "../utils/config";
export const getMovies = async () => {
  const { data } = await baseAxios.get("/api/movies");
  return data;
};

export const getMoviesTBD = async () => {
  const { data } = await baseAxios.get("/api/movies/get-movies");
  return data;
};

export const getMovie = async (id) => {
  const { data } = await baseAxios.get(`/api/movies/${id}`);
  return data;
};

export const getSucursales = async (id, selected_date) => {
  const { data } = await baseAxios.get(`/api/movies/${id}/${selected_date}`);
  return data;
};

export const getAsientosOcupados = async (
  movieId,
  horarioId,
  selected_date
) => {
  const { data } = await baseAxios.get(
    `/api/movies/${movieId}/asientos-ocupados/${selected_date}/horario/${horarioId}`
  );
  return data;
};

export const finishSale = async (id, horario_id, seats, date_movie) => {
  const { data } = await baseAxios.post(`/api/movies/${id}/compra`, {
    horario_id,
    seats,
    date_movie,
  });
  return data;
};

export const resetLocalStorate = () => {
  localStorage.removeItem("movie_selected");
  localStorage.removeItem("info_asientos");
};
