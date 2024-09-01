import axios from 'axios';

// Fetch provinces
export const fetchProvinces = async (setProvinces) => {
  try {
    const response = await axios.get(
      'https://pro.rajaongkir.com/api/province',
      {
        headers: {
          key: import.meta.env.VITE_APP_API_KEY_RAJAONGKIR, // API key Raja Ongkir
        },
      },
    );

    if (
      response.data &&
      response.data.rajaongkir &&
      response.data.rajaongkir.results
    ) {
      setProvinces(response.data.rajaongkir.results);
    } else {
      console.error('Invalid response structure:', response.data);
    }
  } catch (error) {
    console.error('Error fetching provinces:', error);
  }
};

// Fetch cities
export const fetchCities = async (provinceId, setCities) => {
  try {
    const response = await axios.get(
      `https://pro.rajaongkir.com/api/city?province=${provinceId}`,
      {
        headers: {
          key: import.meta.env.VITE_APP_API_KEY_RAJAONGKIR, // API key Raja Ongkir
        },
      },
    );

    if (
      response.data &&
      response.data.rajaongkir &&
      response.data.rajaongkir.results
    ) {
      setCities(response.data.rajaongkir.results);
    } else {
      console.error('Invalid response structure:', response.data);
    }
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
};

export const fetchShippingCost = async (
  provinceId,
  cityId,
  weight,
  courier,
  setShippingOptions,
) => {
  try {
    // Convert the data to URLSearchParams to ensure the correct format
    const data = new URLSearchParams();
    data.append('origin', provinceId.toString());
    data.append('destination', cityId.toString());
    data.append('weight', weight.toString());
    data.append('courier', courier);

    const response = await axios.post(
      'https://pro.rajaongkir.com/api/cost', // Ensure you use the full API URL here
      data,
      {
        headers: {
          key: import.meta.env.VITE_APP_API_KEY_RAJAONGKIR, // Your actual API key here
          'Content-Type': 'application/x-www-form-urlencoded', // Correct Content-Type
        },
      },
    );

    // Check if response data structure is correct and not empty
    if (
      response.data &&
      response.data.rajaongkir &&
      response.data.rajaongkir.results
    ) {
      setShippingOptions(response.data.rajaongkir.results[0].cost);
    } else {
      console.error('Unexpected response structure:', response.data);
    }
  } catch (error) {
    console.error('Error fetching shipping cost:', error);
  }
};
