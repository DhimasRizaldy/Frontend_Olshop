import { toast } from 'react-toastify';
import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

// handle login with google
export const loginWithGoogle = async (userData, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await http.post(API_ENDPOINT.USER_LOGIN_GOOGLE, userData);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Error login with Google';
    console.error(
      'Error login with Google:',
      error.response?.data || errorMessage,
    );
    toast.error(errorMessage);
    throw new Error(errorMessage);
  } finally {
    setIsLoading(false);
  }
};

export default loginWithGoogle;
