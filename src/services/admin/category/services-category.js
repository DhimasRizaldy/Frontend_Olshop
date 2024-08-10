import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';
import { toast } from 'react-toastify'; // Pastikan import toast

export const getCategories = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_CATEGORY);
    // console.log('API Get Categories Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching categories:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(
      error.response?.data?.message || 'Error fetching categories',
    );
  }
};

// add category
export const addCategory = async (categoryData, setIsLoading) => {
  if (!categoryData.name) {
    toast.error('Please fill in all fields');
    return;
  }

  setIsLoading(true); // Set loading to true before starting the request

  try {
    const response = await http.post(API_ENDPOINT.POST_CATEGORY, categoryData);
    console.log('API Add Category Response:', response.data);
    // toast.success('Category added successfully!');
    return response.data;
  } catch (error) {
    console.error(
      'Error adding Category:',
      error.response?.data || error.message,
    );
    toast.error(error.response?.data?.message || 'Error adding Category');
  } finally {
    setIsLoading(false); // Set loading to false after the request completes
  }
};
