import axios from 'axios';
import { CookieKeys, CookieStorage } from '../../../utils/constants/cookies';
import { toast } from 'react-toastify';

// handle Google login action
export const loginWithGoogle = async (accessToken, navigate) => {
  try {
    const data = JSON.stringify({
      access_token: accessToken,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://backend-olshop.vercel.app/api/v1/auth/google',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    const response = await axios.request(config);
    const { token } = response.data;

    // Simpan token di dalam Cookie
    CookieStorage.set(CookieKeys.AuthToken, token);

    toast.success('Login successful');
    navigate('/'); // Redirect setelah login sukses
  } catch (error) {
    toast.error('Login failed');
  }
};
