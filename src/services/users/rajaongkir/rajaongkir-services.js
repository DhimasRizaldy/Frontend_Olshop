import { http } from '../../../utils/constants/http'; // Pastikan path dan nama import sesuai
import { API_ENDPOINT } from '../../../utils/constants/endpoint'; // Pastikan path dan nama import sesuai

// Get provinces
export const fetchProvinces = async () => {
  try {
    const response = await http.get(API_ENDPOINT.GET_PROVINSI); // Gunakan instance http
    // console.log('API Get Provinsi Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Provinsi:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Provinsi');
  }
};

// Get cities
export const fetchCities = async (provId) => {
  try {
    const response = await http.get(API_ENDPOINT.GET_CITY(provId)); // Gunakan instance http
    // console.log('API Get City Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching City:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching City');
  }
};

// Get cost
export const fetchCost = async (asal, tujuan, berat, kurir) => {
  try {
    const response = await http.get(
      API_ENDPOINT.GET_COST(asal, tujuan, berat, kurir), // Gunakan instance http
    );
    // console.log('API Get Cost Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching Cost:',
      error.response?.data?.message || 'Unknown error',
    );
    throw new Error(error.response?.data?.message || 'Error fetching Cost');
  }
};
