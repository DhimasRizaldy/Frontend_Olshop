import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.authUser);

  useEffect(() => {
    if (!data.token) {
      navigate('/login');
    }
  }, [data, navigate]);

  return data.token ? children : null;
};

export default ProtectedRoute;
