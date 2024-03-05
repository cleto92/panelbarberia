/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import  { createContext, useContext, useState, useEffect } from 'react';

// Paso 1: Crear un Contexto
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem('authToken');
    if (token) {

      setUser({ token });
    }
  }, []);


  const login = (token) => {
    localStorage.setItem('authToken', token);
    setUser({ token });
  };


  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };


  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};