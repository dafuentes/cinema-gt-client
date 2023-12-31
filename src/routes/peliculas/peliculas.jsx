import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { useGetMovies } from "../../hooks/useGetMovies";
import Edit from "./edit";
import Delete from "./delete";
import Add from "./add";

export default function Peliculas() {
  const user = useContext(UserContext);
  const { movies, refetch } = useGetMovies();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: null,
    movieId: null,
    title: null,
    image: null,
    price: null,
    startDate: null,
    endDate: null,
  });

  const closeAddModal = (refresh) => {
    setShowAddModal(false);
    if (refresh) {
      refetch();
    }
  };

  const closeModal = (refresh) => {
    setShowEditModal(false);
    if (refresh) {
      refetch();
    }
  };

  const closeDeleteModal = (refresh) => {
    setShowDeleteModal(false);
    if (refresh) {
      refetch();
    }
  };

  const openModal = (type, currentItem) => {
    if (type == "edit") {
      setShowEditModal(true);
    } else {
      setShowDeleteModal(true);
    }
    setSelectedItem({ ...currentItem });
  };

  const ItemTable = ({ item }) => {
    return (
      <tr>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-900">{item.id}</div>
        </td>
        <td className="px-6 py-4">
          <p className="text-sm text-gray-900">{item.movieId}</p>
        </td>
        <td className="px-6 py-4">
          <p className="text-sm text-gray-900">{item.title}</p>
        </td>
        <td className="px-6 py-4">
          <img className="w-20" src={item.image} />
        </td>
        <td className="px-6 py-4">
          <p className="text-sm text-gray-900">Q {item.price}</p>
        </td>
        <td className="px-6 py-4">
          <p className="text-sm text-gray-900">
            {item.startDate} / {item.endDate}
          </p>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Movies
          </h2>
        </div>
      </header>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-2 overflow-x-auto sm:-mx-6">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-gray-800 rounded-md hover:bg-gray-700 text-white px-4 py-2"
                >
                  Add Movie
                </button>
              </div>
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        MovieId
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {movies.map((currentItem) => (
                      <ItemTable key={currentItem.id} item={currentItem} />
                    ))}
                    {movies.length == 0 && (
                      <tr>
                        <td
                          className="border-t px-6 py-4 text-center text-2xl"
                          colSpan="7"
                        >
                          No hay información disponible.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Add show={showAddModal} onClose={closeAddModal} />
      <Edit show={showEditModal} onClose={closeModal} item={selectedItem} />
      <Delete
        show={showDeleteModal}
        onClose={closeDeleteModal}
        item={selectedItem}
      />
    </div>
  );
}
