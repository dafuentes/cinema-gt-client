import { baseAxios } from "../../utils/config";
import Modal from "../../components/Modal";
import UserContext from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Delete({ show, onClose, item }) {
  const user = useContext(UserContext);

  const navigate = useNavigate();
  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await baseAxios.delete(`/api/users/delete/${item.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (data.status == "success") {
        onClose(true);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
        <div className="max-w-xl">
          <h3
            className="text-lg leading-6 font-medium text-gray-900"
            id="modal-title"
          >
            Eliminar Usuario
          </h3>
          <div className="mt-2">
            <p className="text-base text-gray-500">
              ¿Quieres eliminar el usuario? {item.firstName} {item.lastName}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          onClick={onSubmit}
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        >
          Delete
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
