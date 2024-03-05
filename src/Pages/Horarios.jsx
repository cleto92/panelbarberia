import { useState, useEffect } from "react";
import Horario from "../Components/Horario";
import { Link } from "react-router-dom";

const CrearHorarios = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const obtenerHorarios = async () => {
      try {
        const response = await fetch(
          "https://backendbarberia-513e27855d49.herokuapp.com/api/obtenerHorarios"
        );
        const resultado = await response.json();
        const horariosOrdenados = resultado.obtener.sort((a, b) => Date.parse(a.fecha) - Date.parse(b.fecha));
        setData(horariosOrdenados);
        console.log(resultado);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerHorarios();
  }, []);

  return (
    <div className="mt-20 md:mt-18 lg:mt-18">
      <Link to="/crearhorarios" className="p-3 text-sm rounded-lg uppercase font-bold text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
        Agregar Horarios
      </Link>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6 text-center">
                Día
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Hora
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Fecha
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Editar
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((horario) => (
              <Horario key={horario._id} horarios={horario} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrearHorarios;
