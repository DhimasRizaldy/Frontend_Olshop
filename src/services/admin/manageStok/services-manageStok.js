import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

export const getManageStok = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_MANAGE_STOK);
    // console.log('API Get manage Stok Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Manage Stok:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(
      error.response?.data?.message || 'Error fetching Manage Stok',
    );
  }
};
