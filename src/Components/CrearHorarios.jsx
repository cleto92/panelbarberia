/* eslint-disable no-empty */
import Swal from 'sweetalert2'
import {useFormik} from 'formik'

const CrearHorarios = () => {

        const formik = useFormik({
            initialValues:{
                diaDeLaSemana: '',
                fecha: '',
                horario: ''
            },
            onSubmit: async (values) => {
                try {
                    const response = await fetch('https://backendbarberia-513e27855d49.herokuapp.com/api/crearHorarios', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            diaDeLaSemana: values.diaDeLaSemana,
                            fecha: values.fecha,
                            horario: values.horario
                        })
                    });
                    if (!response.ok) throw new Error('Algo salió mal en la solicitud');
                    const result = await response.json(); 
                
                    Swal.fire({
                        title: 'Éxito!',
                        text: result.mensaje,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    formik.resetForm();
                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            }
        })



        return (
            <div className="flex justify-center min-h-64 bg-gray-100">
              <div className="w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Crear Horarios</h2>
                <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label htmlFor="diaDeLaSemana" className="block text-gray-700 text-sm font-bold mb-2">Día de la Semana</label>
                    <input
                      id="diaDeLaSemana"
                      name="diaDeLaSemana"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.diaDeLaSemana}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
          
                  <div className="mb-4">
                    <label htmlFor="fecha" className="block text-gray-700 text-sm font-bold mb-2">Fecha</label>
                    <input
                      id="fecha"
                      name="fecha"
                      type="date"
                      onChange={formik.handleChange}
                      value={formik.values.fecha}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
          
                  <div className="mb-6">
                    <label htmlFor="horario" className="block text-gray-700 text-sm font-bold mb-2">Horarios</label>
                    <textarea
                      id="horario"
                      name="horario"
                      onChange={formik.handleChange}
                      value={formik.values.horario}
                      placeholder="Ejemplo: 08:00-09:00, 10:00-11:00"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                    ></textarea>
                  </div>
          
                  <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Crear Horarios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          );
}

export default CrearHorarios