import axios from 'axios';

// Base URL for RajaOngkir API
const BASE_URL = 'https://backend-olshop.vercel.app/api/v1/rajaongkir';

// Get provinces
export const fetchProvinces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/provinsi`);
    if (response.status === 200) {
      const { results } = response.data.rajaongkir;
      return results; // Return the results array directly
    } else {
      console.error('Failed to fetch provinces:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return [];
  }
};

// Get cities
export const fetchCities = async (provId) => {
  try {
    const response = await axios.get(`${BASE_URL}/kota/${provId}`);
    if (response.status === 200) {
      const { results } = response.data.rajaongkir;
      return results; // Return the results array directly
    } else {
      console.error('Failed to fetch cities:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw new Error(error.response?.data?.message || 'Error fetching cities');
  }
};

// Get cost
export const fetchShippingCost = async (asal, tujuan, berat, kurir) => {
  try {
    const response = await axios.get(`${BASE_URL}/cost`, {
      params: {
        asal,
        tujuan,
        berat,
        kurir,
      },
    });
    // console.log('API Get Cost Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching cost:', error);
    throw new Error(error.response?.data?.message || 'Error fetching cost');
  }
};
