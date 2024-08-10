import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

export const getSupplier = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_SUPPLIER);
    // console.log('API Get Supplier Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching supplier:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching supplier');
  }
};
