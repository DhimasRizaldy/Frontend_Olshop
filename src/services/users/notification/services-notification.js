import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

// service notification
export const postCheckoutPayment = async (data) => {
  try {
    const response = await http.post(
      API_ENDPOINT.CHECKOUT_PAYMENT_NOTIFICATION,
      data,
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Carts:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Carts');
  }
};
