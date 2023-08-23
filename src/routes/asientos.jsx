import { useEffect, useState } from "react";
import InputNumber from "../components/InputNumber";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function Asientos() {
  const navigate = useNavigate();
  const { ocupados } = useLoaderData();
  const { movieId } = useParams();
  const infoSelected = JSON.parse(localStorage.getItem("movie_selected"));
  const infoAsientos = JSON.parse(localStorage.getItem("info_asientos"));
  const initAsientos = infoAsientos ? infoAsientos.totalAsientos : 1;
  const initSelectedAsientos = infoAsientos ? infoAsientos.asientos : [];
  console.log(infoSelected);
  console.log(infoAsientos);
  console.log(ocupados);
  const [asientos, setAsientos] = useState(initAsientos);
  const [info, setInfo] = useState(infoSelected);
  const [selectedAsientos, setSelectedAsientos] =
    useState(initSelectedAsientos);
  const maxAsientos = infoSelected
    ? infoSelected.sucursal.sala.seats - ocupados.length
    : 0;

  const onSelectedSeat = (index) => {
    if (selectedAsientos.includes(index)) {
      const filterSeats = selectedAsientos.filter((item) => item != index);
      setSelectedAsientos(filterSeats);
    } else {
      if (selectedAsientos.length + 1 <= asientos) {
        const listSeats = [...selectedAsientos, index];
        setSelectedAsientos(listSeats);
      } else if (asientos == 0) {
        toast.error(`Debes ingresar la cantidad de tickets`);
      } else {
        const pluralAsientos = asientos > 1 ? "asientos" : "asiento";
        toast.error(`Solo puedes seleccionar ${asientos} ${pluralAsientos}`);
      }
    }
  };

  const ItemSeat = ({ index }) => {
    const isSelected = selectedAsientos.includes(index);
    const isOcupado = ocupados.includes(index);
    return (
      <button
        key={index}
        disabled={isOcupado}
        onClick={() => onSelectedSeat(index)}
        className={`w-14 h-14 flex justify-center items-center ${
          isSelected
            ? "bg-green-200 scale-90"
            : isOcupado
            ? "bg-red-200"
            : "bg-gray-300 "
        }`}
      >
        {index + 1}
      </button>
    );
  };

  const onNavigateCompra = () => {
    if (asientos == 0) {
      toast.error(`Debes ingresar la cantidad de tickets`);
      return;
    }
    if (selectedAsientos.length == 0) {
      toast.error(`Debes seleccionar un asiento`);
      return;
    }
    if (selectedAsientos.length != asientos) {
      toast.error(`Valida tus asientos`);
      return;
    }
    const infoAsientos = {
      totalAsientos: asientos,
      asientos: selectedAsientos,
    };
    localStorage.setItem("info_asientos", JSON.stringify(infoAsientos));

    navigate(`/movie/${movieId}/compra`);
  };

  const handleChangeTickets = (e) => {
    if (e < asientos) {
      setSelectedAsientos([]);
    }
    setAsientos(e);
  };

  return (
    <div>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          Cantidad de tickets
        </h1>
        <InputNumber
          initValue={asientos}
          min={1}
          max={maxAsientos}
          change={handleChangeTickets}
        >
          <p>Tickets {asientos}</p>
        </InputNumber>
      </div>
      <div className="mt-12 space-y-12">
        <h2 className="text-2xl font-semibold text-center">
          Selecciona tu asiento
        </h2>
        <div className="max-w-3xl mx-auto flex justify-center">
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200"></div>
              <div>Disponible</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-200"></div>
              <div>No disponible</div>
            </div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto flex justify-center flex-wrap gap-4">
          {Array(info.sucursal.sala.seats)
            .fill(1)
            .map((_, index) => (
              <ItemSeat key={index} index={index} />
            ))}
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <button
          onClick={onNavigateCompra}
          className="bg-gray-300 hover:bg-slate-800 hover:text-white w-1/2 lg:w-1/4 py-3 rounded-2xl"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
