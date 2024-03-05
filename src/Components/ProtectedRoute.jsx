/* eslint-disable react/prop-types */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext'; // Asegúrate de que la ruta es correcta

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;