import http from '../../../utils/constants/http';
import { API_ENDPOINT } from '../../../utils/constants/endpoint';

export const getNotification = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_NOTIFICATION);
    // console.log('API Get Notification Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Notification:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(
      error.response?.data?.message || 'Error fetching Notification',
    );
  }
};

export const updateNotification = async (notificationId) => {
  try {
    const response = await http.put(
      API_ENDPOINT.UPDATE_NOTIFICATION(notificationId),
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error updating Notification:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(
      error.response?.data?.message || 'Error updating Notification',
    );
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const response = await http.delete(
      API_ENDPOINT.DELETE_NOTIFICATION(notificationId),
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error deleting Notification:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(
      error.response?.data?.message || 'Error deleting Notification',
    );
  }
};

export const getAllNotification = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_ALL_NOTIFICATION);
    // console.log('API Get Notification Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Notification:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(
      error.response?.data?.message || 'Error fetching Notification',
    );
  }
};

export const getNotificationById = async (notificationId) => {
  try {
    const response = await http.get(
      API_ENDPOINT.GET_NOTIFICATION_BY_ID(notificationId),
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Notification:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(
      error.response?.data?.message || 'Error fetching Notification',
    );
  }
};