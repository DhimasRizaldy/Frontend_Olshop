import { toast } from 'react-toastify';
import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';
import Swal from 'sweetalert2';
// handle register
export const register = async (userData, setIsLoading) => {
  if (
    !userData.username ||
    !userData.email ||
    !userData.password ||
    !userData.confirmPassword
  ) {
    toast.error('Harap isi semua kolom dengan lengkap');
    return;
  }

  if (userData.password !== userData.confirmPassword) {
    toast.error('Kata sandi tidak cocok');
    return;
  }

  setIsLoading(true);

  try {
    const response = await http.post(API_ENDPOINT.USER_REGISTER, userData);
    Swal.fire({
      icon: 'success',
      title: 'Registration successful!',
      text: 'Please check your email for the verification link.',
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.err || 'Error adding User';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  } finally {
    setIsLoading(false);
  }
};
