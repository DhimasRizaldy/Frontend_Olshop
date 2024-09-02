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
      origin: asal,
      originType: 'city', // pastikan tipe sesuai dengan kebutuhan API
      destination: tujuan,
      destinationType: 'subdistrict', // pastikan tipe sesuai dengan kebutuhan API
      weight: berat,
      courier: kurir,
    });

    if (response.status === 200) {
      const rajaongkirData = response.data.rajaongkir;

      // Tambahkan pengecekan untuk memastikan data ada
      if (rajaongkirData && rajaongkirData.results) {
        setShippingOptions(rajaongkirData.results); // Set the shipping options state
      } else {
        console.error('Invalid response format:', response.data);
        throw new Error('Invalid response format from RajaOngkir');
      }
    } else {
      console.error('Failed to fetch cost:', response.statusText);
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error('Error fetching cost:', error);
    throw new Error(error.response?.data?.message || 'Error fetching cost');
  }
};

// Fetch waybill information
export const fetchWaybillInfo = async (waybill, courier) => {
  try {
    // Menggunakan axios untuk mengirim request POST ke backend Anda
    const response = await axios.post(
      `${BASE_URL}/waybill`,
      new URLSearchParams({ waybill, courier }).toString(), // URL-encoded string
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Menentukan tipe konten
        },
      },
    );

    // Memastikan respons sesuai dengan struktur data yang diharapkan
    if (response.data && response.data.rajaongkir) {
      return response.data.rajaongkir;
    } else {
      console.error('Unexpected response format:', response.data);
      throw new Error('Invalid response format from backend');
    }
  } catch (error) {
    console.error('Error fetching waybill info:', error);
    throw new Error(
      error.response?.data?.message || 'Error fetching waybill info',
    );
  }
};
