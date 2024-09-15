import axios from 'axios';
import { CookieKeys, CookieStorage } from '../../../utils/constants/cookies';
import { toast } from 'react-toastify';

// handle Google login action
export const loginWithGoogle = async (accessToken, navigate) => {
  try {
    // Konversi data menjadi JSON string
    const data = JSON.stringify({
      access_token: accessToken,
    });

    // Lakukan request dengan axios
    const response = await axios.post(
      'https://backend-olshop.vercel.app/api/v1/auth/google',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const { token } = response.data;

    // Simpan token di dalam Cookie
    CookieStorage.set(CookieKeys.AuthToken, token);

    toast.success('Login successful');
    navigate('/'); // Redirect setelah login sukses
  } catch (error) {
    // Cetak error ke console untuk debugging
    console.error('Login failed', error);

    // Pesan kesalahan untuk pengguna
    toast.error('Login failed');
  }
};
