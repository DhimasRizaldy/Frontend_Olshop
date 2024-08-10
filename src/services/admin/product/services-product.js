import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

export const getProduct = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_PRODUCT);
    // console.log('API Get Product Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Product:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Product');
  }
};
