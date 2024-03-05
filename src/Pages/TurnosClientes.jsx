import { useState, useEffect } from "react";
import Turno from '../Components/Turno';

const TurnosClientes = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await fetch("https://backendbarberia-513e27855d49.herokuapp.com/api/obtenerTurnosClientes");
        const resultado = await response.json();
        setData(resultado.obtener);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTurnos();
  }, []);

  const filteredData = searchTerm
    ? data.filter((turno) => turno.cliente.email.toLowerCase().includes(searchTerm.toLowerCase()))
    : data;

  return (
    <div className="mt-20 md:mt 18 lg:mt 18">
      <input
        type="text"
        placeholder="Buscar Cliente"
        className="mb-4 p-2 border rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-black dark:bg-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 text-center">Nombre</th>
              <th scope="col" className="py-3 px-6 text-center">Apellido</th>
              <th scope="col" className="py-3 px-6 text-center">Email</th>
              <th scope="col" className="py-3 px-6 text-center">Telefono</th>
              <th scope="col" className="py-3 px-6 text-center">Fecha</th>
              <th scope="col" className="py-3 px-6 text-center">Pago</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((turnos) => (
              <Turno key={turnos._id} turno={turnos.cliente} horario={turnos.horareserva} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TurnosClientes;
