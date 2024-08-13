import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';
import { toast } from 'react-toastify';

export const getSupplier = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_SUPPLIER);
    // console.log('API Get Supplier Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching supplier:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching supplier');
  }
};

// add supplier

export const addSupplier = async (supplierData, setIsLoading) => {
  // Check if supplierData fields are valid
  if (
    !supplierData.name ||
    !supplierData.email ||
    !supplierData.address ||
    !supplierData.phoneNumber
  ) {
    toast.error('Please fill in all fields');
    return;
  }

  setIsLoading(true); // Set loading to true before starting the request

  try {
    const response = await http.post(API_ENDPOINT.POST_SUPPLIER, supplierData);
    // console.log('API Add Supplier Response:', response.data);
    // toast.success('Supplier added successfully!');
    return response.data;
  } catch (error) {
    console.error(
      'Error adding supplier:',
      error.response?.data || error.message,
    );
    toast.error(error.response?.data?.message || 'Error adding supplier');
  } finally {
    setIsLoading(false); // Set loading to false after the request completes
  }
};
// update supplier

export const editSupplier = async (supplierId, supplierData) => {
  try {
    const response = await http.put(
      API_ENDPOINT.UPDATE_SUPPLIER(supplierId),
      supplierData,
    );
    // console.log('API Update Supplier Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error updating supplier:',
      error.response?.data || error.message,
    );
    throw error; // Propagate the error to be handled by the caller
  }
};

// get supplier by id

export const getSupplierById = async (supplierId) => {
  try {
    const response = await http.get(
      API_ENDPOINT.GET_SUPPLIER_BY_ID(supplierId),
    );
    // console.log('API Get Supplier Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching supplier:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching supplier');
  }
};

// delete supplier

export const deleteSupplier = async (supplierId) => {
  try {
    const response = await http.delete(
      API_ENDPOINT.DELETE_SUPPLIER(supplierId),
    );

    // Check if the API response indicates success
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to delete supplier');
    }
  } catch (error) {
    console.error(
      'Error deleting supplier:',
      error.response?.data?.message || 'Unknown error',
    );

    throw new Error(error.response?.data?.message || 'Error deleting supplier');
  }
};