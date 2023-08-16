import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { useGetUsers } from "../../hooks/useGetUsers";
import Edit from "./edit";
import Delete from "./delete";

export default function Users() {
  const user = useContext(UserContext);
  const { users, refetch } = useGetUsers();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  });

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
          <p className="text-sm text-gray-900">
            {item.firstName} {item.lastName}
          </p>
        </td>
        <td className="px-6 py-4">
          <p className="text-sm text-gray-900">{item.email}</p>
        </td>
        <td className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-center px-6 py-4 md:space-x-4">
          <button
            onClick={() => openModal("edit", item)}
            className="inline-flex items-center px-4 py-2 border rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
          <button
            onClick={() => openModal("delete", item)}
            className="inline-flex items-center px-4 py-2 border border-red-600 rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-red-200 focus:bg-red-200 active:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Listado de Usuarios
          </h2>
        </div>
      </header>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-2 overflow-x-auto sm:-mx-6">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Opciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((currentItem) => (
                      <ItemTable key={currentItem.id} item={currentItem} />
                    ))}
                    {users.length == 0 && (
                      <tr>
                        <td
                          className="border-t px-6 py-4 text-center text-2xl"
                          colSpan="4"
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
      <Edit show={showEditModal} onClose={closeModal} item={selectedItem} />
      <Delete
        show={showDeleteModal}
        onClose={closeDeleteModal}
        item={selectedItem}
      />
    </div>
  );
}
