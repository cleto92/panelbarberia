/* eslint-disable no-empty */
import Swal from "sweetalert2";
import { useFormik } from "formik";

const AltaUsuario = () => {
    const formik = useFormik({
      initialValues: {
        usuario: "",
        contraseña: "",
      },
      onSubmit: async (values) => {
        try {

          const response = await fetch('https://backendbarberia-513e27855d49.herokuapp.com/api/crearUsuarios', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              usuario: values.usuario,
              contraseña: values.contraseña,
            }),
          });
          if (!response.ok) throw new Error('Error al procesar la solicitud');
          const resultado = await response.json(); 
          Swal.fire({
            title: 'Usuario creado con Éxito!',
            text: resultado.mensaje, 
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          formik.resetForm();
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
    });

  return (
    <div className="flex justify-center min-h-64 bg-gray-100">
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Agregar Usuario</h2>
      <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
              <label htmlFor="usuario" className="block text-gray-700 text-sm font-bold mb-2">Usuario</label>
                  <input
                    id="usuario"
                    name="usuario"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.usuario}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
              </div>
              <div className="mb-4">
              <label htmlFor="contraseña" className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                  <input
                    id="contraseña"
                    name="contraseña"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.contraseña}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
              </div>
              <div className="flex items-center justify-between">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Agregar Usuario
                  </button>
                </div>
      </form>
    </div>
  </div>

  )
};

export default AltaUsuario;
