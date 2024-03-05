/* eslint-disable react/prop-types */

import Swal from "sweetalert2";

const Horario = ({ horarios }) => {
  const { dia, fecha, hora, _id } = horarios;

  const eliminarHorario = async () => {
    const confirmacion = await Swal.fire({
      title: "¿Estás Seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        const url = `https://backendbarberia-513e27855d49.herokuapp.com/api/eliminarHorario/${_id}`;
        const respuesta = await fetch(url, {
          method: "DELETE",
        });
        if (!respuesta.ok) {
          throw new Error("Error al eliminar el horario");
        }
        await Swal.fire(
          "Eliminando",
          "El Horario se elimino con exito",
          "success"
        );
        window.location.reload();
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el horario", error);
      }
    }
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
      <td className="py-4 px-6">{dia}</td>
      <td className="py-4 px-6">{fecha}</td>
      <td className="py-4 px-6">{hora}</td>
      <td className="py-4 px-6">
          <button onClick={eliminarHorario} className="py-2 rounded-sm text-red-700">Eliminar</button>
        </td>
    </tr>
  );
};

export default Horario;
