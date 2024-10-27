import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';
import { toast } from 'react-toastify';

// Get all addresses
export const getAddress = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_ADDRESS);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Address:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Address');
  }
};

// Add a new address
export const addAddress = async (addressData) => {
  if (
    !addressData.nameAddress ||
    !addressData.address ||
    !addressData.cityId ||
    !addressData.provinceId ||
    !addressData.cityName ||
    !addressData.provinceName ||
    !addressData.postalCode
  ) {
    toast.error('Please fill in all fields');
    return;
  }

  try {
    const response = await http.post(API_ENDPOINT.POST_ADDRESS, addressData);
    return response.data;
  } catch (error) {
    console.error(
      'Error adding Address:',
      error.response?.data || error.message,
    );
    toast.error(error.response?.data?.message || 'Error adding Address');
  }
};

// Update an existing address
export const editAddress = async (addressId, addressData) => {
  try {
    const response = await http.put(
      API_ENDPOINT.UPDATE_ADDRESS(addressId),
      addressData,
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error updating Address:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Get address by ID
export const getAddressById = async (addressId) => {
  try {
    const response = await http.get(API_ENDPOINT.GET_ADDRESS_BY_ID(addressId));
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Address:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Address');
  }
};

// Delete an address
export const deleteAddress = async (addressId) => {
  try {
    const response = await http.delete(API_ENDPOINT.DELETE_ADDRESS(addressId));
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to delete address');
    }
  } catch (error) {
    console.error(
      'Error deleting address:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error deleting address');
  }
};
