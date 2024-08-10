import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

export const getAddress = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_ADDRESS);
    // console.log('API Get Address Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Address:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Address');
  }
};
