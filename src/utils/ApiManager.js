import { baseAxios } from "../utils/config";
export const getMovies = async () => {
  const { data } = await baseAxios.get("/api/movies");
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

export const finishSale = async (id, horario_id, seats) => {
  const { data } = await baseAxios.post(`/api/movies/${id}/compra`, {
    horario_id,
    seats,
  });
  return data;
};

export const resetLocalStorate = () => {
  localStorage.removeItem("movie_selected");
  localStorage.removeItem("info_asientos");
};
