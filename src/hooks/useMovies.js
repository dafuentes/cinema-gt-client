import { baseAxios } from "../utils/config";
import { useEffect, useState } from "react";

const useMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await baseAxios.get("/api/movies");
      setMovies(data);
    };
    fetchMovies();
  }, []);

  return { movies };
};

export default useMovies;
