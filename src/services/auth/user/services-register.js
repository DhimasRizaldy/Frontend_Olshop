import { toast } from 'react-toastify';
import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

// handle register
export const register = async (userData, setIsLoading) => {
  if (
    !userData.username ||
    !userData.email ||
    !userData.password ||
    !userData.confirmPassword
  ) {
    toast.error('Please fill in all fields');
    return;
  }

  if (userData.password !== userData.confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  setIsLoading(true);

  try {
    const response = await http.post(API_ENDPOINT.USER_REGISTER, userData);
    toast.success('Registration successful!');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error adding User';
    console.error('Error adding User:', error.response?.data || errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage);
  } finally {
    setIsLoading(false);
  }
};
