import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { useGetVentas } from "../../hooks/useGetVentas";

export default function Ventas() {
  const user = useContext(UserContext);
  const { ventas, refetch } = useGetVentas();

  const ItemTable = ({ item }) => {
    console.log(item);
    const priceMovie = item.price;
    const totalVenta = item.Horarios.reduce((total, currentHorario) => {
      const priceSala = currentHorario.Sala.price;
      const totalVentasByHorario = currentHorario.Venta.reduce(
        (totalByHorario, currentVenta) => {
          return (
            totalByHorario + (priceMovie + priceSala + currentHorario.price)
          );
        },
        0
      );
      return total + totalVentasByHorario;
    }, 0);

    return (
      <tr>
        <td className="px-6 py-4">
          <p className="text-sm text-gray-900">{item.title}</p>
        </td>
        <td className="px-6 py-4">
          <img className="w-20" src={item.image} />
        </td>
        <td className="px-6 py-4">
          <p className="text-sm text-gray-900">Q {totalVenta}</p>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Ventas
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
                  Ventas
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
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ventas.map((currentItem) => (
                      <ItemTable key={currentItem.id} item={currentItem} />
                    ))}
                    {ventas.length == 0 && (
                      <tr>
                        <td
                          className="border-t px-6 py-4 text-center text-2xl"
                          colSpan="3"
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
    </div>
  );
}
