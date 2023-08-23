import { useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal";

export default function ListMovies({ show, onClose, movies }) {
  const baseUrlImage = "https://image.tmdb.org/t/p/w400";
  const [selected, setSelected] = useState(null);

  const ItemMovie = ({ movie }) => {
    const isSelected = selected?.id == movie.id ? "bg-blue-100" : "bg-white";
    return (
      <button
        key={movie.id}
        onClick={() => setSelected(movie)}
        className={`flex gap-6 ${isSelected}`}
      >
        <div className="w-20">
          <img className="w-20" src={baseUrlImage + movie.poster_path} />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="font-semibold">{movie.title}</div>
          <div className="text-xs">{movie.overview}</div>
        </div>
      </button>
    );
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        <div className="flex justify-between">
          <div className="text-2xl">List Movies</div>
        </div>
        <div className="max-h-80 overflow-y-scroll mt-10">
          <div className="flex flex-col gap-6">
            {movies.map((itemMovie) => (
              <ItemMovie key={itemMovie.id} movie={itemMovie} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          onClick={() => onClose(selected)}
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
        >
          Select
        </button>
        <button
          type="button"
          onClick={() => onClose()}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
