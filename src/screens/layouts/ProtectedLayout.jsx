import { useContext } from "react";
import { Link, Navigate, useOutlet } from "react-router-dom";
import UserContext from "../../context/UserContext";

export const ProtectedLayout = () => {
  const outlet = useOutlet();
  const user = useContext(UserContext);
  console.log("user ProtectedLayout", user);

  if (!user) {
    return <Navigate to="/" />;
  }

  return <div>{outlet}</div>;
};
