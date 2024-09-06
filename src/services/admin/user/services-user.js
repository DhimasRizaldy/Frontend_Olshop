import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';
import { toast } from 'react-toastify';

export const getUser = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_ALL_USER);
    // console.log('API Get Users Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Users:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Users');
  }
};

// add user
export const addUser = async (userData, setIsLoading) => {
  // Check if userData fields are valid
  if (
    !userData.username ||
    !userData.email ||
    !userData.password ||
    !userData.confirmPassword
  ) {
    toast.error('Please fill in all fields');
    return;
  }

  // Check if password and confirmPassword match
  if (userData.password !== userData.confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  setIsLoading(true); // Set loading to true before starting the request

  try {
    const response = await http.post(API_ENDPOINT.REGISTER_ADMIN, userData);
    toast.success('Admin add successfully!');
    return response.data;
  } catch (error) {
    console.error('Error adding User:', error.response?.data || error.message);
    toast.error(error.response?.data?.message || 'Error adding User');
  } finally {
    setIsLoading(false); // Set loading to false after the request completes
  }
};

// update user
export const editUser = async (userId, userData) => {
  try {
    const response = await http.put(
      API_ENDPOINT.UPDATE_ADMIN(userId),
      userData,
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error updating User:',
      error.response?.data || error.message,
    );

    // Menampilkan notifikasi error kepada pengguna
    toast.error('Failed to update user. Please try again.');

    // Propagate the error to be handled by the caller
    throw error;
  }
};

// delete user
export const deleteUser = async (userId) => {
  try {
    const response = await http.delete(API_ENDPOINT.DELETE_ADMIN(userId));
    // console.log('API Delete User Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error deleting User:',
      error.response?.data || error.message,
    );
    throw error; // Propagate the error to be handled by the caller
  }
};

// get user by id
export const getUserById = async (userId) => {
  try {
    const response = await http.get(API_ENDPOINT.GET_ADMIN_BY_ID(userId));
    // console.log('API Get User Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching User:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching User');
  }
};