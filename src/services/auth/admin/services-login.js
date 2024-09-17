import { toast } from 'react-toastify';
import { CookieKeys, CookieStorage } from '../../../utils/constants/cookies';
import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';
import { getWHOAMI } from '../../auth/admin/getDataUser';

export const handleLogin = async (email, password, navigate, setIsLoading) => {
  if (!email || !password) {
    console.error('Email and password are required');
    return;
  }

  setIsLoading(true);
  try {
    const response = await http.post(API_ENDPOINT.USER_LOGIN, {
      email,
      password,
    });

    await new Promise((resolve) => setTimeout(resolve, 3000)); // Delay 3 detik

    const token = response.data.data.token;
    CookieStorage.set(CookieKeys.AuthToken, token);

    toast.success('Login successful!');

    // Panggil getWHOAMI setelah token tersimpan untuk mendapatkan data pengguna
    const userResponse = await getWHOAMI();
    // console.log('User Response:', userResponse);

    const userRole = userResponse.data.user.role; // Pastikan path ini sesuai dengan struktur respons WHOAMI

    // Arahkan pengguna berdasarkan peran mereka
    if (userRole === 'ADMIN') {
      navigate('/dashboard', { state: { fromLogin: true } });
    } else if (userRole === 'USER') {
      navigate('/', { state: { fromLogin: true } });
    } else {
      console.error('Unknown user role:', userRole);
      toast.error('Unknown user role');
    }
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Delay 3 detik
    toast.error('Email and password do not match');
  } finally {
    setIsLoading(false);
  }
};

export const handleGoogleLogin = async (tokenId, navigate, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await http.post(API_ENDPOINT.LOGIN_GOOGLE, {
      access_token: tokenId,
    });

    const token = response.data.data.token;
    CookieStorage.set(CookieKeys.AuthToken, token);

    toast.success('Login successful!');

    // Panggil getWHOAMI setelah token tersimpan untuk mendapatkan data pengguna
    const userResponse = await getWHOAMI();
    const userRole = userResponse.data.user.role;

    // Arahkan pengguna berdasarkan peran mereka
    if (userRole === 'ADMIN') {
      navigate('/dashboard', { state: { fromLogin: true } });
    } else if (userRole === 'USER') {
      navigate('/', { state: { fromLogin: true } });
    } else {
      console.error('Unknown user role:', userRole);
      toast.error('Unknown user role');
    }
  } catch (error) {
    console.error(
      'Google login failed:',
      error.response?.data || error.message,
    );
    toast.error('Google login failed');
  } finally {
    setIsLoading(false);
  }
};
