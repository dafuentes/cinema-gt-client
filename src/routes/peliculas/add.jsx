import { useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { baseAxios } from "../../utils/config";
import UserContext from "../../context/UserContext";
import { getMoviesTBD } from "../../utils/ApiManager";
import ListMovies from "./listMovies";

export default function Add({ show, onClose }) {
  const user = useContext(UserContext);
  const baseUrlImage = "https://image.tmdb.org/t/p/w400";
  const [showListMovies, setShowListMovies] = useState(false);
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await baseAxios.post(
        "/api/movies/",
        {
          movieId,
          title,
          image,
          price,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.status == "success") {
        onClose(true);
        resetForm();
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const resetForm = () => {
    setMovieId("");
    setTitle("");
    setImage("");
    setPrice("");
    setStartDate("");
    setEndDate("");
  };

  const onGetMovies = async () => {
    const { results } = await getMoviesTBD();
    console.log(results);
    setMovies(results);
    setShowListMovies(true);
  };

  const onCloseListMovies = (infoSelected) => {
    if (infoSelected) {
      setMovieId(infoSelected.id);
      setTitle(infoSelected.title);
      setImage(baseUrlImage + infoSelected.poster_path);
    }
    setShowListMovies(false);
  };

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={onSubmit}>
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <div className="flex justify-between">
            <div className="text-2xl">Add Movie</div>
            <div>
              <button type="button" onClick={onGetMovies}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="space-y-4 mt-6">
            <div>
              <label
                htmlFor="movieId"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                MovieId
              </label>
              <div className="mt-2">
                <input
                  id="movieId"
                  name="movieId"
                  type="text"
                  required
                  value={movieId}
                  onChange={(e) => setMovieId(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="text"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Start Date
              </label>
              <div className="mt-2">
                <input
                  id="startDate"
                  name="startDate"
                  type="text"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                End Date
              </label>
              <div className="mt-2">
                <input
                  id="endDate"
                  name="endDate"
                  type="text"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
            Save
          </button>
          <button
            type="button"
            onClick={() => onClose()}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
      <ListMovies
        show={showListMovies}
        onClose={onCloseListMovies}
        movies={movies}
      />
    </Modal>
  );
}
