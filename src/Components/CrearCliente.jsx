/* eslint-disable no-empty */
import Swal from "sweetalert2";
import { useFormik } from "formik";

const CrearCliente = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          "https://backendbarberia-513e27855d49.herokuapp.com/api/AgregarCliente",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre: values.nombre,
              apellido: values.apellido,
              email: values.email,
              telefono: values.telefono,
            }),
          }
        );
        if (!response.ok) throw new Error("Error al procesar la solicitud");
        const result = await response.json();
        Swal.fire({
          title: "Cliente cargado con Exito!",
          text: result.mensaje,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        formik.resetForm();
      } catch (error) {
        Swal.fire({
          title: Error,
          text: error.message,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    },
  });

  return (
    <div className="flex justify-center min-h-64 bg-gray-100">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Agregar Cliente</h2>
        <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.nombre}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                <label htmlFor="apellido" className="block text-gray-700 text-sm font-bold mb-2">Apellido</label>
                    <input
                      id="apellido"
                      name="apellido"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.apellido}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                <label htmlFor="telefono" className="block text-gray-700 text-sm font-bold mb-2">Telefono</label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.telefono}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Agregar Cliente
                    </button>
                  </div>
        </form>
      </div>
    </div>
  );
};

export default CrearCliente;
