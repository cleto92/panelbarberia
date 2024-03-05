/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Autenticacion = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return token ? children : null;
};

Autenticacion.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default Autenticacion