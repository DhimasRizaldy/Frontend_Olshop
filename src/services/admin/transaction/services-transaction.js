import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

export const getTransactionMe = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_TRANSACTION_ME);
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

export const getTransaction = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_TRANSACTION);
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

export const getDetailTransaction = async (transactionId) => {
  try {
    const response = await http.get(
      API_ENDPOINT.GET_DETAIL_TRANSACTION(transactionId),
    );

    if (!response || !response.data) {
      throw new Error('Invalid response from server');
    }

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Unknown error';
    console.error('Error fetching Transaction:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const editTransaction = async (transactionId, transactionData) => {
  try {
    const response = await http.put(
      API_ENDPOINT.UPDATE_TRANSACTION(transactionId),
      transactionData,
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error updating Transaction:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(
      error.response?.data?.message || 'Error updating Transaction',
    );
  }
};

export const getTransactionById = async (transactionId) => {
  console.log('Fetching transaction with ID:', transactionId); // Check if transactionId is correct
  try {
    const response = await http.get(
      API_ENDPOINT.GET_TRANSACTION_BY_ID(transactionId),
    );
    console.log('API Response:', response); // Log full response
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Transaction:',
      error.response?.data?.message || 'Unknown error',
      error.config, // Log the request configuration for debugging
    );
    throw new Error(
      error.response?.data?.message || 'Error fetching Transaction',
    );
  }
};
