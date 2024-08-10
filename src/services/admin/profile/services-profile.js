import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

export const getProfile = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_PROFILE);
    // console.log('API Get Profile Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Profile:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Profile');
  }
};
