import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

export const getRating = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_RATINGS);
    // console.log('API Get Rating Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Rating:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Rating');
  }
};
