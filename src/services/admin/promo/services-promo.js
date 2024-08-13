import { toast } from 'react-toastify';
import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

// get promo
export const getPromo = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_PROMO);
    // console.log('API Get Promo Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Promo:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Promo');
  }
};
// add promo
export const addPromos = async (promoData, setIsLoading) => {
  // Check if promoData fields are valid
  if (
    !promoData.codePromo ||
    !promoData.discount ||
    !promoData.activeAt ||
    !promoData.expiresAt
  ) {
    toast.error('Please fill in all fields');
    return;
  }

  setIsLoading(true); // Set loading to true before starting the request

  try {
    const response = await http.post(API_ENDPOINT.POST_PROMO, promoData);
    // console.log('API Add Promo Response:', response.data);
    // toast.success('Promo added successfully!');
    return response.data;
  } catch (error) {
    console.error('Error adding Promo:', error.response?.data || error.message);
    toast.error(error.response?.data?.message || 'Error adding Promo');
  } finally {
    setIsLoading(false); // Set loading to false after the request completes
  }
};
// update promo
export const editPromo = async (promoId, promoData) => {
  try {
    const response = await http.put(
      API_ENDPOINT.UPDATE_PROMO(promoId),
      promoData,
    );
    // console.log('API Update Promo Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error updating Promo:',
      error.response?.data || error.message,
    );
    throw error; // Propagate the error to be handled by the caller
  }
};

// get a promo by id
export const getPromoById = async (promoId) => {
  try {
    const response = await http.get(API_ENDPOINT.GET_PROMO_BY_ID(promoId));
    // console.log('API Get Promo Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Promo:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Promo');
  }
};

// delete promo
export const deletePromo = async (promoId) => {
  try {
    const response = await http.delete(API_ENDPOINT.DELETE_PROMO(promoId));

    // Check if the API response indicates success
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to delete promo');
    }
  } catch (error) {
    console.error(
      'Error deleting promo:',
      error.response?.data?.message || 'Unknown error',
    );

    // Throwing a specific error message to be caught in the component
    throw new Error(error.response?.data?.message || 'Error deleting promo');
  }
};