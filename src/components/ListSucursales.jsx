import { redirect, useNavigate } from "react-router-dom";

export default function ListSucursales({ movie, sucursales }) {
  const navigate = useNavigate();

  if (sucursales.length == 0) {
    return (
      <div className="mt-6 flex justify-center items-center text-2xl text-gray-600">
        No available functions
      </div>
    );
  }

  const onSelectHorario = (sucursal, sala, horario) => {
    const info = {
      sucursal: {
        id: sucursal.id,
        name: sucursal.name,
        sala: {
          id: sala.id,
          name: sala.name,
          seats: sala.seats,
          price: sala.price,
          horario: {
            ...horario,
          },
        },
      },
    };
    localStorage.setItem("movie_selected", JSON.stringify(info));
    console.log(info);
    navigate(`/movie/${movie}/asientos`);
  };

  return (
    <>
      {sucursales.map((itemSucursal) => (
        <div key={itemSucursal.id}>
          <p className="text-2xl font-bold">{itemSucursal.name}</p>
          {itemSucursal.Salas.map((itemSala) => (
            <div key={`sala-${itemSala.id}`} className="pl-2">
              <p className="text-xl">{itemSala.name}</p>
              <div className="space-y-2 mt-2 pl-4">
                {itemSala.Horarios.map((itemHorario) => (
                  <div
                    key={`horario-${itemHorario.id}`}
                    className="flex gap-4 items-center"
                  >
                    <div>
                      {itemHorario.startTime}-{itemHorario.endTime}
                    </div>
                    <button
                      onClick={() =>
                        onSelectHorario(itemSucursal, itemSala, itemHorario)
                      }
                    >
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
                          d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
