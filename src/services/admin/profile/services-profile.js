import httpMulti from '../../../utils/constants/httpMulti';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

export const getProfile = async () => {
  try {
    const response = await httpMulti.get(API_ENDPOINT.GET_PROFILE);
    // console.log('API Get Profile Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Profile:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Profile');
  }
};

// update profile
export const editProfile = async (profileData) => {
  try {
    const response = await httpMulti.put(
      API_ENDPOINT.UPDATE_PROFILE,
      profileData,
    );
    // console.log('API Update Profile Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error updating Profile:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
