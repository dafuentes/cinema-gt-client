import { useCallback, useEffect, useState } from "react";
import { baseAxios } from "../utils/config";
export const useGetMovies = () => {
  const [movies, setMovies] = useState([]);
  const getMovies = useCallback(async () => {
    const user = localStorage.getItem("USER");
    const { token } = JSON.parse(user);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await baseAxios.get("/api/movies/", config);
    setMovies(data);
  }, []);
  useEffect(() => {
    getMovies();
  }, []);

  return { movies, refetch: getMovies };
};
