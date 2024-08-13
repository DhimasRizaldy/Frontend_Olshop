import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';
import { toast } from 'react-toastify';

export const getManageStok = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_MANAGE_STOK);
    // console.log('API Get manage Stok Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Manage Stok:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(
      error.response?.data?.message || 'Error fetching Manage Stok',
    );
  }
};

// add manage stok
export const addManageStok = async (manageStokData) => {
  // Check if manageStokData fields are valid
  if (
    !manageStokData.supplierId ||
    !manageStokData.productId ||
    !manageStokData.stockIn ||
    !manageStokData.dateStockIn
  ) {
    toast.error('Please fill in all fields');
    return;
  }

  try {
    const response = await http.post(
      API_ENDPOINT.POST_MANAGE_STOK,
      manageStokData,
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error adding Manage Stok:',
      error.response?.data || error.message,
    );
    toast.error(error.response?.data?.message || 'Error adding Manage Stok');
  }
};

// update manage stok
export const editManageStok = async (manageStockId, manageStokData) => {
  try {
    const response = await http.put(
      API_ENDPOINT.UPDATE_MANAGE_STOK(manageStockId),
      manageStokData,
    );
    // console.log('API Update Manage Stok Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error updating Manage Stok:',
      error.response?.data || error.message,
    );
    throw error; // Propagate the error to be handled by the caller
  }
};

// get manage stok by id
export const getManageStokById = async (manageStockId) => {
  try {
    const response = await http.get(
      API_ENDPOINT.GET_MANAGE_STOK_BY_ID(manageStockId),
    );
    // console.log('API Get Manage Stok By Id Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Manage Stok By Id:',
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Error fetching Manage Stok By Id',
    );
  }
};

// delete manage stok
export const deleteManageStok = async (manageStockId) => {
  try {
    const response = await http.delete(
      API_ENDPOINT.DELETE_MANAGE_STOK(manageStockId),
    );
    // Check if the API response indicates success
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to delete manage Stok');
    }
  } catch (error) {
    console.error(
      'Error deleting Manage Stok:',
      error.response?.data || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Error deleting manage Stok',
    );
  }
};


