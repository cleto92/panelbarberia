import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../Context/Authcontext"; // Asegúrate de que la ruta es correcta
import { useState } from "react";
import Spinner from "../Animations/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (usuario, contraseña) => {
    setLoading(true); // Activa el spinner antes de la solicitud
    try {
      const respuesta = await fetch("https://backendbarberia-513e27855d49.herokuapp.com/api/IniciarSesion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, contraseña }),
      });

      if (!respuesta.ok) {
        throw new Error("Error al loguear");
      }

      const { token } = await respuesta.json();
      login(token);

      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  const formik = useFormik({
    initialValues: {
      usuario: "",
      contraseña: "",
    },
    validationSchema: Yup.object({
      usuario: Yup.string().required("Requerido"),
      contraseña: Yup.string().required("Requerido"),
    }),
    onSubmit: (values) => {
      handleLogin(values.usuario, values.contraseña);
    },
  });

  return loading ? (
    <Spinner />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar sesión con tu cuenta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="usuario" className="sr-only">
                Usuario
              </label>
              <input
                id="usuario"
                name="usuario"
                type="text"
                autoComplete="usuario"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Usuario"
                onChange={formik.handleChange}
                value={formik.values.usuario}
              />
            </div>
            <div>
              <label htmlFor="contraseña" className="sr-only">
                Contraseña
              </label>
              <input
                id="contraseña"
                name="contraseña"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                onChange={formik.handleChange}
                value={formik.values.contraseña}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
