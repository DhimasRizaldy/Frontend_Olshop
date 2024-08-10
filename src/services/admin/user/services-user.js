import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

export const getUser = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_ALL_USER);
    // console.log('API Get Users Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Users:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Users');
  }
};
