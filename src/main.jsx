import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './Components/Layout';
import Clientes from './Pages/Clientes';
import TurnosClientes from './Pages/TurnosClientes';
import Horarios from './Pages/Horarios';
import CrearHorarios from './Components/CrearHorarios';
import CrearCliente from './Components/CrearCliente';
import AltaUsuario from './Pages/AltaUsuario';
import Login from './Pages/Login';
import ProtectedRoute from './Components/ProtectedRoute'; // Importa el componente de ruta protegida
import { AuthProvider } from './Context/Authcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Clientes />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="turnos-clientes" element={<TurnosClientes />} />
            <Route path="horarios" element={<Horarios />} />
            <Route path="crearhorarios" element={<CrearHorarios />} />
            <Route path="agregarCliente" element={<CrearCliente />} />
            <Route path="agregarUsuario" element={<AltaUsuario />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
