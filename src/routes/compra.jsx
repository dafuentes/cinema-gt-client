import { redirect, useNavigate, useParams } from "react-router-dom";
import { finishSale, resetLocalStorate } from "../utils/ApiManager";
import toast from "react-hot-toast";

export default function Compra() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const infoSelected = JSON.parse(localStorage.getItem("movie_selected"));
  const infoAsientos = JSON.parse(localStorage.getItem("info_asientos"));

  if (!infoSelected) {
    return <div>Loading</div>;
  }

  const startTime = infoSelected.sucursal.sala.horario.startTime;
  const endTime = infoSelected.sucursal.sala.horario.endTime;

  const subTotal =
    infoSelected.sucursal.sala.horario.Pelicula.price +
    infoSelected.sucursal.sala.horario.price +
    infoSelected.sucursal.sala.price;

  const total = subTotal * infoAsientos.totalAsientos;

  const onFinalizarCompra = async () => {
    const horario = infoSelected.sucursal.sala.horario.id;
    const seats = infoAsientos.asientos;
    /* const result = await finishSale(movieId, horario, seats); */
    toast
      .promise(finishSale(movieId, horario, seats), {
        loading: "Loading...",
        success: <b>Compra finalizada!</b>,
        error: <b>Ocurrió un problema, intenta más tarde.</b>,
      })
      .then((data) => {
        const { status } = data;
        if (status == "success") {
          navigate("/", { replace: true });
        }
      })
      .catch((error) => console.log("error", error));
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
            <div className="flex flex-wrap gap-4 mt-6">
              <div>
                <img
                  className="w-20"
                  src={infoSelected.sucursal.sala.horario.Pelicula.image}
                />
              </div>
              <div className="flex-1">
                <div className="text-xl lg:text-2xl font-semibold">
                  <span className="text-gray-500 pr-2">Sucursal:</span>
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
