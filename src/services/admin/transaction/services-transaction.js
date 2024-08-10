import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

export const getTransaction = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_TRANSACTION);
    // console.log('API Get Transaction Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Transaction:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(
      error.response?.data?.message || 'Error fetching Transaction',
    );
  }
};
