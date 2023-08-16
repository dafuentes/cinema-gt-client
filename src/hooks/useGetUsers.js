import { useCallback, useEffect, useState } from "react";
import { baseAxios } from "../utils/config";
export const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const getUsers = useCallback(async () => {
    const user = localStorage.getItem("USER");
    const { token } = JSON.parse(user);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await baseAxios.get("/api/users", config);
    console.log(data);
    setUsers(data);
  }, []);
  useEffect(() => {
    getUsers();
  }, []);

  return { users, refetch: getUsers };
};
