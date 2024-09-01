import axios from 'axios';

// Fetch provinces
export const fetchProvinces = async () => {
  try {
    const response = await axios.get('/api/starter/province', {
      headers: {
        key: import.meta.env.VITE_APP_API_KEY_RAJAONGKIR, // API key Raja Ongkir
      },
    });
    setProvinces(response.data.rajaongkir.results);
  } catch (error) {
    console.error('Error fetching provinces:', error);
  }
};

// Fetch cities
export const fetchCities = async (provinceId) => {
  try {
    const response = await axios.get(
      `/api/starter/city?province=${provinceId}`,
      {
        headers: {
          key: import.meta.env.VITE_APP_API_KEY_RAJAONGKIR, // API key Raja Ongkir
        },
      },
    );
    setCities(response.data.rajaongkir.results);
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
};

// Fetch shipping cost
export const fetchShippingCost = async (
  origin,
  destination,
  weight,
  courier,
) => {
  try {
    const response = await axios.post(
      '/api/starter/cost',
      {
        origin,
        destination,
        weight,
        courier,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          key: import.meta.env.VITE_APP_API_KEY_RAJAONGKIR, // API key Raja Ongkir
        },
      },
    );
    setShippingOptions(response.data.rajaongkir.results[0].costs);
  } catch (error) {
    console.error('Error fetching shipping cost:', error);
  }
};
