import httpMulti from '../../../utils/constants/httpMulti';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';
import { toast } from 'react-toastify';

export const getProduct = async () => {
  try {
    const response = await httpMulti.get(API_ENDPOINT.GET_PRODUCT);
    // console.log('API Get Product Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Product:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Product');
  }
};

// add product
export const addProduct = async (productData, setIsloading) => {
  if (
    !productData.name ||
    !productData.categoryId ||
    !productData.price ||
    !productData.weight ||
    !productData.stock ||
    !productData.description
  ) {
    toast.error('Harap isi semua kolom dengan lengkap');
    return;
  }

  if (typeof setIsloading !== 'function') {
    console.error('setIsloading is not a function');
    return;
  }

  setIsloading(true);

  try {
    const response = await httpMulti.post(
      API_ENDPOINT.POST_PRODUCT,
      productData,
    );
    // console.log('API Add Product Response:', response.data);
    // toast.success('Product added successfully!');
    return response.data;
  } catch (error) {
    console.error(
      'Error adding Product:',
      error.response?.data || error.message,
    );
    toast.error(error.response?.data?.message || 'Error adding Product');
  } finally {
    setIsloading(false);
  }
};

// update product
export const editProduct = async (productId, productData) => {
  try {
    const response = await httpMulti.put(
      API_ENDPOINT.UPDATE_PRODUCT(productId),
      productData,
    );
    // console.log('API Update Product Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error updating Product:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// delete product
export const deleteProduct = async (productId) => {
  try {
    const response = await httpMulti.delete(
      API_ENDPOINT.DELETE_PRODUCT(productId),
    );
    // console.log('API Delete Product Response:', response.data);
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error('Failed to delete product');
    }
  } catch (error) {
    console.error(
      'Error deleting Product:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// get product by id
export const getProductById = async (productId) => {
  try {
    const response = await httpMulti.get(
      API_ENDPOINT.GET_DETAIL_PRODUCT(productId),
    );
    // console.log('API Get Product Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Product:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Product');
  }
};
