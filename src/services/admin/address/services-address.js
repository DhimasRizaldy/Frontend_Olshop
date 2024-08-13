import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';
import { toast } from 'react-toastify';

export const getAddress = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_ADDRESS);
    // console.log('API Get Address Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Address:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Address');
  }
};

// add address
export const addAddress = async (addressData) => {
  // Check if addressData fields are valid
  if (
    !addressData.nameAddress ||
    !addressData.address ||
    !addressData.city ||
    !addressData.country ||
    !addressData.postalCode
  ) {
    toast.error('Please fill in all fields');
    return;
  }

  try {
    const response = await http.post(API_ENDPOINT.POST_ADDRESS, addressData);
    // console.log('API Add Address Response:', response.data);
    // toast.success('Address added successfully!');
    return response.data;
  } catch (error) {
    console.error(
      'Error adding Address:',
      error.response?.data || error.message,
    );
    toast.error(error.response?.data?.message || 'Error adding Address');
  }
};

// update address
export const editAddress = async (addressId, addressData) => {
  try {
    const response = await http.put(
      API_ENDPOINT.UPDATE_ADDRESS(addressId),
      addressData,
    );
    // console.log('API Update Address Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error updating Address:',
      error.response?.data || error.message,
    );
    throw error; // Propagate the error to be handled by the caller
  }
};

// get address by id
export const getAddressById = async (addressId) => {
  try {
    const response = await http.get(API_ENDPOINT.GET_ADDRESS_BY_ID(addressId));
    // console.log('API Get Address Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Address:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Address');
  }
};

// delete address
export const deleteAddress = async (addressId) => {
  try {
    const response = await http.delete(API_ENDPOINT.DELETE_ADDRESS(addressId));

    // Check if the API response indicates success
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
