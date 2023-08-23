import { useLoaderData } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { getSucursales } from "../utils/ApiManager";
import ListSucursales from "../components/ListSucursales";

export default function Movie() {
  const { movie } = useLoaderData();
  const [sucursales, setSucursales] = useState([]);
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [formatSelectedDate, setFormatSelectedDate] = useState(null);

  const getListSucursales = async (date_selected) => {
    const dateParam = date_selected ? date_selected : today;
    const { data } = await getSucursales(movie.id, dateParam);
    setSucursales(data);
  };

  useEffect(() => {
    getListSucursales();
  }, []);

  const onSelectedDate = async (currentDate) => {
    if (currentDate) {
      const formatDate = format(currentDate, "dd/MM/yyyy");
      setFormatSelectedDate(formatDate);
    }
    setSelectedDate(currentDate);
    getListSucursales(currentDate);
  };

  return (
    <div className="grid md:grid-cols-2 gap-14">
      <div className="flex flex-col gap-4">
        <div className="self-center">
          <img className="w-full md:h-62 md:w-64" src={movie.image} />
        </div>
        <h1 className="text-2xl font-bold text-center">{movie.title}</h1>
        <h3 className="text-xl font-bold text-center">
          Release date {movie.release_date}
        </h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {movie.genres.map((genre) => (
            <div
              key={`genre-${genre.id}`}
              className="text-sm font-semibold bg-gray-300 px-4 py-2 rounded-full"
            >
              {genre.name}
            </div>
          ))}
        </div>
        <p className="text-base text-justify text-gray-800">{movie.overview}</p>
      </div>
      <div className="flex flex-col items-start">
        <div className="w-full flex flex-col items-center">
          <p className="text-2xl font-semibold text-center">
            Selecciona una fecha
          </p>
          <DayPicker
            locale={es}
            mode="single"
            defaultMonth={today}
            fromMonth={today}
            selected={selectedDate}
            onSelect={onSelectedDate}
            disabled={{ before: today }}
          />
        </div>
        <div className="w-full space-y-4">
          {selectedDate && (
            <ListSucursales
              movie={movie.id}
              sucursales={sucursales}
              selectedDate={selectedDate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
