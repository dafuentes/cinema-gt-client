import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  defer,
  redirect,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Login from "./routes/login";
import Register from "./routes/register";
import Users from "./routes/users/users";
import Home from "./routes/home";
import Dashboard from "./routes/dashboard";
import Welcome from "./routes/welcome";
import { ProtectedLayout } from "./screens/layouts/ProtectedLayout";
import { loaderDetailMovie, loaderHome } from "./utils/loaders";
import Movie from "./routes/movie";

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("USER");
      resolve(user);
    }, 500)
  );

const loader = async () => {
  const user = await getUserData();
  if (!user) {
    return redirect("/login");
  }
  return null;
};

const isAutenticated = async () => {
  const user = await getUserData();
  if (user) {
    return redirect("/dashboard/welcome");
  }
  return null;
};

const checkUser = async () => {
  const user = await getUserData();
  return JSON.parse(user);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: checkUser,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
            loader: loaderHome,
          },
          {
            path: "movie/:movieId",
            element: <Movie />,
            loader: loaderDetailMovie,
          },
          {
            path: "/login",
            element: <Login />,
            errorElement: <ErrorPage />,
            loader: isAutenticated,
          },
          {
            path: "/register",
            element: <Register />,
            errorElement: <ErrorPage />,
            loader: isAutenticated,
          },
          {
            path: "/dashboard",
            element: <ProtectedLayout />,
            errorElement: <ErrorPage />,
            children: [
              { path: "/dashboard/welcome", element: <Welcome /> },
              { path: "/dashboard/users", element: <Users /> },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
