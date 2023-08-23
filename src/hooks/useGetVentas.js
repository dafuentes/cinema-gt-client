import { useCallback, useEffect, useState } from "react";
import { baseAxios } from "../utils/config";
export const useGetVentas = () => {
  const [ventas, setVentas] = useState([]);
  const getVentas = useCallback(async () => {
    const user = localStorage.getItem("USER");
    const { token } = JSON.parse(user);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await baseAxios.get("/api/ventas/", config);
    setVentas(data);
  }, []);
  useEffect(() => {
    getVentas();
  }, []);

  return { ventas, refetch: getVentas };
};
