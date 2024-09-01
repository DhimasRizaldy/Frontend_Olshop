import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

export const getCarts = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_CARTS);
    // console.log('API Get Carts Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Carts:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Carts');
  }
};

export const getDetailCarts = async (cartId) => {
  try {
    const response = await http.get(API_ENDPOINT.GET_DETAIL_CARTS(cartId));
    // console.log('API Get Carts Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Carts:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Carts');
  }
};

export const createCarts = async (data) => {
  try {
    const response = await http.post(API_ENDPOINT.POST_CARTS, data);
    // console.log('API Post Carts Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Carts:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Carts');
  }
};

export const updateCarts = async (cartId, data) => {
  try {
    const response = await http.put(API_ENDPOINT.UPDATE_CARTS(cartId), data);
    // console.log('API Update Carts Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error updating carts:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error updating carts');
  }
};

export const deleteCarts = async (cartId) => {
  try {
    const response = await http.delete(API_ENDPOINT.DELETE_CARTS(cartId));
    // console.log('API Delete Carts Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Carts:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Carts');
  }
};
