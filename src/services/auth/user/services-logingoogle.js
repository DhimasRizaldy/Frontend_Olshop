import axios from 'axios';
import { CookieKeys, CookieStorage } from '../../../utils/constants/cookies';
import { toast } from 'react-toastify';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

// handle Google login action
export const loginWithGoogle = async (accessToken, navigate) => {
  try {
    // Ambil informasi pengguna dari Google
    const userInfoResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
    );

    const userInfo = userInfoResponse.data;

    // Kirim informasi pengguna ke backend untuk login atau registrasi
    let data = JSON.stringify({
      access_token: accessToken,
      user_info: userInfo,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_SERVER}${API_ENDPOINT.USER_LOGIN_GOOGLE}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    const response = await axios.request(config);
    const { token } = response.data.data;
    CookieStorage.set(CookieKeys.AuthToken, token);
    toast.success('Login successful!');
    navigate('/');
    return response.data;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  }
};
