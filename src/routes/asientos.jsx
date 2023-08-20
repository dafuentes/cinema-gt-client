import { useEffect, useState } from "react";
import InputNumber from "../components/InputNumber";
import { useNavigate, useParams } from "react-router-dom";

export default function Asientos() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const infoSelected = JSON.parse(localStorage.getItem("movie_selected"));
  console.log(infoSelected);
  const [asientos, setAsientos] = useState(1);
  const [info, setInfo] = useState(infoSelected);
  const [selectedAsientos, setSelectedAsientos] = useState([]);

  useEffect(() => {
    console.log(infoSelected.sucursal.sala.seats);
  }, []);

  useEffect(() => {
    if (asientos > info.sucursal.sala.seats) {
      console.log("No hay asientos disponibles");
    }
  }, [asientos]);

  const onSelectedSeat = (index) => {
    if (selectedAsientos.includes(index)) {
      const filterSeats = selectedAsientos.filter((item) => item != index);
      setSelectedAsientos(filterSeats);
    } else {
      if (selectedAsientos.length + 1 <= asientos) {
        const listSeats = [...selectedAsientos, index];
        setSelectedAsientos(listSeats);
      } else {
        alert(`Solo puedes seleccionar ${asientos} asientos`);
      }
    }
  };

  const ItemSeat = ({ index }) => {
    const isSelected = selectedAsientos.includes(index);
    return (
      <button
        key={index}
        onClick={() => onSelectedSeat(index)}
        className={`w-14 h-14 flex justify-center items-center ${
          isSelected ? "bg-green-200 scale-90" : "bg-gray-300 "
        }`}
      >
        {index + 1}
      </button>
    );
  };

  const onNavigateCompra = () => {
    navigate(`/movie/${movieId}/compra`);
  };

  return (
    <div>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          Cantidad de tickets
        </h1>
        <InputNumber
          min={1}
          max={info.sucursal.sala.seats}
          change={(e) => setAsientos(e)}
        >
          <p>Tickets {asientos}</p>
        </InputNumber>
      </div>
      <div className="mt-12 space-y-12">
        <h2 className="text-2xl font-semibold text-center">
          Selecciona tu asiento
        </h2>
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
