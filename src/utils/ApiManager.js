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
