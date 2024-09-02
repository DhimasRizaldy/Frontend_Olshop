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
export const fetchShippingCost = async (
  asal,
  tujuan,
  berat,
  kurir,
  setShippingOptions,
) => {
  try {
    const response = await axios.post(`${BASE_URL}/ongkos`, {
      asal: asal,
      asalType: 'city', // sesuaikan dengan kebutuhan API Anda
      tujuan: tujuan,
      tujuanType: 'subdistrict', // sesuaikan dengan kebutuhan API Anda
      berat: berat,
      kurir: kurir,
    });

    const costs = response.data?.rajaongkir?.results?.[0]?.costs;
    if (costs) {
      setShippingOptions(costs);
    } else {
      console.error('Invalid response structure:', response.data);
    }
  } catch (error) {
    console.error('Error fetching shipping cost:', error);
  }
};

// Fetch waybill information
export const fetchWaybillInfo = async (waybill, courier) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/waybill`,
      {
        waybill,
        courier,
      },
      {
        headers: {
          'Content-Type': 'application/json', // Assuming the API expects JSON
        },
      },
    );

    // Ensure response matches expected structure
    if (response.data && response.data.status && response.data.result) {
      return response.data;
    } else {
      console.error('Unexpected response format:', response.data);
      throw new Error('Invalid response format from API');
    }
  } catch (error) {
    console.error('Error fetching waybill info:', error);
    throw new Error(
      error.response?.data?.message || 'Error fetching waybill info',
    );
  }
};
