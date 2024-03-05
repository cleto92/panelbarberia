import { useState, useEffect } from "react";
import Cliente from "../Components/Cliente";
import { Link } from "react-router-dom";

const Clientes = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("https://backendbarberia-513e27855d49.herokuapp.com/api/obtenerClientes");
        const resultado = await response.json();
        setData(resultado.clientes);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };

    fetchClientes();
  }, []);
  const filteredData = searchTerm
    ? data.filter((cliente) => cliente.email.toLowerCase().includes(searchTerm.toLowerCase()))
    : data;

  return (
    <div className="mt-20 md:mt-18 lg:mt-18">
      <div className="flex justify-between mb-4">
        <Link to="/agregarCliente" className="p-3 text-sm rounded-lg uppercase font-bold text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
          Agregar Cliente
        </Link>
        <input
          type="text"
          placeholder="Buscar Cliente por Email"
          className="p-2 border rounded"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6 text-center">Nombre</th>
              <th scope="col" className="py-3 px-6 text-center">Apellido</th>
              <th scope="col" className="py-3 px-6 text-center">Email</th>
              <th scope="col" className="py-3 px-6 text-center">Telefono</th>
              <th scope="col" className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((cliente) => (
              <Cliente key={cliente._id} cliente={cliente} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
