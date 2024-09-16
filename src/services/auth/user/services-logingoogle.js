import axios from 'axios';
import { CookieKeys, CookieStorage } from '../../../utils/constants/cookies';
import { toast } from 'react-toastify';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';
import { useNavigate } from 'react-router-dom';

// handle Google login action
export const loginWithGoogle = async (accessToken) => {
  const navigate = useNavigate();

  try {
    let data = JSON.stringify({ access_token: accessToken });

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
