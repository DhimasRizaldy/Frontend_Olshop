import httpMulti from '../../../utils/constants/httpMulti';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

export const getRating = async () => {
  try {
    const response = await httpMulti.get(API_ENDPOINT.GET_RATINGS);
    // console.log('API Get Rating Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Rating:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Rating');
  }
};

export const getRatingById = async (ratingId) => {
  try {
    const response = await httpMulti.get(
      API_ENDPOINT.GET_RATING_BY_ID(ratingId),
    );
    // console.log('API Get Rating Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Rating:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Rating');
  }
};

export const deleteRating = async (ratingId) => {
  try {
    const response = await httpMulti.delete(
      API_ENDPOINT.DELETE_RATING(ratingId),
    );
    // console.log('API Delete Rating Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Rating:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Rating');
  }
};

export const createRating = async (data) => {
  try {
    const response = await httpMulti.post(API_ENDPOINT.POST_RATINGS, data);
    // console.log('API Post Rating Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Rating:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Rating');
  }
};

export const updateRating = async (data, ratingId) => {
  try {
    const response = await httpMulti.put(
      API_ENDPOINT.UPDATE_RATINGS(ratingId),
      data,
    );
    // console.log('API Put Rating Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Rating:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Rating');
  }
};
