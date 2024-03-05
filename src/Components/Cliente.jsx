/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
import Swal from "sweetalert2";

const Cliente = ({ cliente }) => {
  const { nombre, apellido, email, telefono, _id } = cliente;

  const eliminarCliente = async () => {
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
        const url = `https://backendbarberia-513e27855d49.herokuapp.com/api/eliminarCliente/${_id}`;
        const respuesta = await fetch(url, {
          method: "DELETE",
        });
        if (!respuesta.ok) {
          throw new Error("Error al eliminar al cliente");
        }
        await Swal.fire(
          "Eliminando",
          "El Cliente se elimino con exito",
          "success"
        );
        window.location.reload();
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el cliente", error);
      }
    }
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
      <td className="py-4 px-6">{nombre}</td>
      <td className="py-4 px-6">{apellido}</td>
      <td className="py-4 px-6">{email}</td>
      <td className="py-4 px-6">{telefono}</td>
      <td className="py-4 px-6">
        <button
          onClick={eliminarCliente}
          className="py-2 rounded-sm text-red-700"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
