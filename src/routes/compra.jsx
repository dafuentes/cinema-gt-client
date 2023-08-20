export default function Compra() {
  const infoSelected = JSON.parse(localStorage.getItem("movie_selected"));
  console.log(infoSelected);
  const infoAsientos = JSON.parse(localStorage.getItem("info_asientos"));

  const startTime = infoSelected.sucursal.sala.horario.startTime;
  const endTime = infoSelected.sucursal.sala.horario.endTime;

  const subTotal =
    infoSelected.sucursal.sala.horario.Pelicula.price +
    infoSelected.sucursal.sala.horario.price +
    infoSelected.sucursal.sala.price;

  const total = subTotal * infoAsientos.totalAsientos;

  const onFinalizarCompra = () => {
    console.log("finalizarcompra");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-24">
        <h1 className="text-4xl font-semibold text-center">Finalizar Compra</h1>
        <div className="flex">
          <div className="w-14 lg:w-1/4 flex justify-center items-start">
            <div className="text-2xl lg:text-4xl font-bold">
              {infoAsientos.totalAsientos}
            </div>
          </div>
          <div className="w-full lg:w-9/12">
            <h1 className="text-2xl lg:text-4xl font-bold">
              {infoSelected.sucursal.sala.horario.Pelicula.title}
            </h1>
            <div className="lg:pl-12 mt-6">
              <div className="text-xl lg:text-3xl font-semibold">
                {infoSelected.sucursal.name}
              </div>
              <div className="text-xl lg:text-2xl font-semibold">
                <span className="text-gray-500 pr-2">Sala:</span>
                {infoSelected.sucursal.sala.name}
              </div>
              <div className="text-xl lg:text-2xl font-semibold">
                <span className="text-gray-500 pr-2">Función:</span>
                {startTime} - {endTime}
              </div>
              <div className="text-xl lg:text-2xl font-semibold">
                <span className="text-gray-500 pr-2">Asientos:</span>
                {infoAsientos.asientos.map((item, index) => (
                  <span key={item}>{(index ? ", " : "") + (item + 1)}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/4 flex justify-center items-start">
            <div className="text-4xl font-bold">Total</div>
          </div>
          <div className="w-9/12 text-right">
            <div className="text-4xl font-bold">Q{total}</div>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <button
            onClick={onFinalizarCompra}
            className="bg-gray-300 hover:bg-slate-800 hover:text-white w-1/2 lg:w-1/4 py-3 rounded-2xl"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}
