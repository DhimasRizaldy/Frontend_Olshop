import axios from 'axios';

// fetchCities
export const fetchCities = async (provinceId, setCities) => {
  try {
    const response = await axios.get(`/api/city?province=${provinceId}`, {
      headers: {
        key: import.meta.env.VITE_APP_API_KEY_RAJAONGKIR, // API key Raja Ongkir
      },
    });

    setCities(response.data.rajaongkir.results);
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
};

// fetchProvinces
export const fetchProvinces = async (setProvinces) => {
  try {
    const response = await axios.get(`/api/province`, {
      headers: {
        key: import.meta.env.VITE_APP_API_KEY_RAJAONGKIR, // API key Raja Ongkir
      },
    });

    setProvinces(response.data.rajaongkir.results);
  } catch (error) {
    console.error('Error fetching provinces:', error);
  }
};

// fetchShippingCost
export const fetchShippingCost = async (
  originId, // Example origin ID (e.g., city ID)
  destinationId, // Example destination ID (e.g., subdistrict ID)
  weight, // Weight in grams
  courier, // Courier service (e.g., 'jne')
  setShippingOptions, // Callback function to set shipping options in the state
) => {
  try {
    // Send the request with the necessary payload as per the required format
    const response = await axios.post(
      `/api/cost`,
      {
        origin: originId, // e.g., "501" for city
        originType: 'city', // Always set to "city" for the origin type
        destination: destinationId, // e.g., "574" for subdistrict
        destinationType: 'subdistrict', // Always set to "subdistrict" for the destination type
        weight: weight, // e.g., 1700 for weight in grams
        courier: courier, // e.g., "jne" for the courier
      },
      {
        headers: {
          key: import.meta.env.VITE_APP_API_KEY_RAJAONGKIR, // Raja Ongkir API key
          'Content-Type': 'application/json', // Content-Type header for JSON payload
        },
      },
    );

    // Check for a valid response and set shipping options
    if (
      response.data &&
      response.data.rajaongkir &&
      response.data.rajaongkir.results
    ) {
      setShippingOptions(response.data.rajaongkir.results[0].costs);
    } else {
      console.error('Invalid response structure:', response.data);
    }
  } catch (error) {
    console.error('Error fetching shipping cost:', error);
  }
};
