import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const IsLogInProtected = ({ children }) => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.authUser);

  useEffect(() => {
    if (data.token === undefined || data.token === '') {
      navigate('/login');
    }
  }, [data, navigate]);

  return children;
};

export default IsLogInProtected;
