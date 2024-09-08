import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';
import { toast } from 'react-toastify';

// Payment service
export const checkoutPayment = async (data) => {
  try {
    // Display loading state if needed
    // dispatch(setLoading(true)); // Uncomment if using Redux or another state management library

    const response = await http.post(API_ENDPOINT.CHECKOUT_PAYMENT, data);

    // Hide loading state after completion
    // dispatch(setLoading(false)); // Uncomment if using Redux or another state management library

    // Show success notification
    toast.success('Payment initiated successfully!');

    return response.data;
  } catch (error) {
    // Hide loading state if there is an error
    // dispatch(setLoading(false)); // Uncomment if using Redux or another state management library

    // Show error notification
    toast.error(`Error: ${error.response?.data?.message || 'Unknown error'}`);

    console.error(
      'Error during payment checkout:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(
      error.response?.data?.message || 'Error during payment checkout',
    );
  }
};

// notification transaction
export const checkoutPaymentNotification = async (data) => {
  try {
    const response = await http.post(
      API_ENDPOINT.CHECKOUT_PAYMENT_NOTIFICATION,
      data,
    );
    return response.data; // Mengembalikan response dari backend
  } catch (error) {
    // Error handling yang lebih aman, dengan fallback jika error response tidak tersedia
    console.error(
      'Error fetching Payment:',
      error?.response?.data?.message || error.message || 'Unknown error',
    );
    throw new Error(error?.response?.data?.message || 'Error fetching Payment');
  }
};

