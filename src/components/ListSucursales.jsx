export default function ListSucursales({ sucursales }) {
  if (sucursales.length == 0) {
    return (
      <div className="mt-6 flex justify-center items-center text-2xl text-gray-600">
        No available functions
      </div>
    );
  }
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
                  <div key={`horario-${itemHorario.id}`}>
                    {itemHorario.startTime}-{itemHorario.endTime}
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
