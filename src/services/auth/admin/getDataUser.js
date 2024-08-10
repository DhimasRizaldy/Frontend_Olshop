import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';
import { jwtDecode } from 'jwt-decode'; // Pastikan impor jwt-decode benar
import { useState, useEffect } from 'react';

const getWHOAMI = async () => {
  try {
    const response = await http.get(API_ENDPOINT.USER_WHOAMI);
    // console.log('API WHOAMI Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching user data:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(
      error.response?.data?.message || 'Error fetching user data',
    );
  }
};

const useUserGetData = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWHOAMI();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { userData, error, isLoading };
};

const getUserData = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
      imageProfile: decoded.imageProfile,
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export { useUserGetData, getUserData, getWHOAMI };
