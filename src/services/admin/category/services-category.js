import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';
import { toast } from 'react-toastify';

// Get all categories
export const getCategories = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_CATEGORY);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching categories:',
      error.response?.data?.err || 'Unknown error',
    );
    throw new Error(error.response?.data?.err || 'Error fetching categories');
  }
};

// Add a new category
export const addCategory = async (categoryData, setIsLoading) => {
  if (!categoryData.name) {
    toast.error('Harap isi semua kolom dengan lengkap');
    return;
  }

  setIsLoading(true);

  try {
    const response = await http.post(API_ENDPOINT.POST_CATEGORY, categoryData);
    // console.log('API Add Category Response:', response.data);
    toast.success('Category added successfully!');
    return response.data;
  } catch (error) {
    console.error('Error adding Category:', error.response?.data || error.err);
    toast.error(error.response?.data?.err || 'Error adding Category');
  } finally {
    setIsLoading(false);
  }
};

// Edit an existing category
export const editCategory = async (categoryId, categoryData) => {
  try {
    const response = await http.put(
      API_ENDPOINT.UPDATE_CATEGORY(categoryId),
      categoryData,
    );
    // console.log('API Edit Category Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error updating Category:',
      error.response?.data || error.err,
    );
    throw error; // Propagate the error to be handled by the caller
  }
};

// Get a category by its ID
export const getCategoryById = async (categoryId) => {
  try {
    const response = await http.get(
      API_ENDPOINT.GET_CATEGORY_BY_ID(categoryId),
    );
    // console.log('API Get Category Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching category:',
      error.response?.data?.err || 'Unknown error',
    );
    throw new Error(error.response?.data?.err || 'Error fetching category');
  }
};

// delete a category
export const deleteCategory = async (categoryId) => {
  try {
    const response = await http.delete(
      API_ENDPOINT.DELETE_CATEGORY(categoryId),
    );

    // Check if the API response indicates success
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.err || 'Failed to delete category');
    }
  } catch (error) {
    console.error(
      'Error deleting category:',
      error.response?.data?.err || 'Unknown error',
    );

    // Throwing a specific error err to be caught in the component
    throw new Error(error.response?.data?.err || 'Error deleting category');
  }
};
