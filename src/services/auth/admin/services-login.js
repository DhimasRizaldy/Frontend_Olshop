import { toast } from 'react-toastify';
import { CookieKeys, CookieStorage } from '../../../utils/constants/cookies';
import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

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
    navigate('/dashboard', { state: { fromLogin: true } });
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Delay 3 detik
    toast.error('Email and password do not match');
  } finally {
    setIsLoading(false);
  }
};
