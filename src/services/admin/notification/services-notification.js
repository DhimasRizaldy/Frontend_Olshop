import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

export const getNotification = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_NOTIFICATION);
    // console.log('API Get Notification Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Notification:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(
      error.response?.data?.message || 'Error fetching Notification',
    );
  }
};
