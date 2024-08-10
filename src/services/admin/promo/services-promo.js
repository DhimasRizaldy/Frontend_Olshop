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
export const updatePromo = async (data) => {
  try {
    const response = await http.patch(API_ENDPOINT.UPDATE_PROMO, data);
    // console.log('API Update Promo Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error updating Promo:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error updating Promo');
  }
};
// delete promo
export const deletePromo = async (data) => {
  try {
    const response = await http.delete(API_ENDPOINT.DELETE_PROMO, { data });
    // console.log('API Delete Promo Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error deleting Promo:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error deleting Promo');
  }
};

// get promo by id
export const getPromoById = async (id) => {
  try {
    const response = await http.get(`${API_ENDPOINT.GET_PROMO_BY_ID}/${id}`);
    // console.log('API Get Promo By ID Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Promo by ID:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(
      error.response?.data?.message || 'Error fetching Promo by ID',
    );
  }
};
