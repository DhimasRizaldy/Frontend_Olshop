import axios from 'axios';
import { CookieKeys, CookieStorage } from '../../../utils/constants/cookies';

// handle Google login action
export const loginWithGoogleAction = async (accessToken) => {
  try {
    const response = await axios.post(
      'https://backend-olshop.vercel.app/api/v1/auth/google',
      { access_token: accessToken },
    );

    // Assuming the response contains the token
    const { token } = response.data;

    // Simpan token di dalam Cookie
    CookieStorage.set(CookieKeys.AuthToken, token);

    toast.success('Login successful');
    navigate('/'); // Redirect setelah login sukses
  } catch (error) {
    toast.error('Login failed');
  }
};
