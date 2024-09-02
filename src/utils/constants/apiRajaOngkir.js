
// fetchCities
export const fetchCities = async (provinceId, setCities) => {
  try {
    const { data } = await axios.get(`/api/city?province=${provinceId}`, {
      headers: {
        key: import.meta.env.VITE_APP_API_KEY_RAJAONGKIR,
      },
    });

    const results = data?.rajaongkir?.results;
    if (results) {
      setCities(results);
    } else {
      // console.error('Invalid response structure:', data);
    }
  } catch (error) {
    // console.error('Error fetching cities:', error);
  }
};


// fetchProvinces
export const fetchProvinces = async (setProvinces) => {
  try {
    const response = await axios.get('/api/province', {
      headers: {
        key: import.meta.env.VITE_APP_API_KEY_RAJAONGKIR,
      },
    });

    const results = response.data?.rajaongkir?.results;
    if (results) {
      setProvinces(results);
    } else {
      // console.error('Invalid response structure:', response.data);
    }
  } catch (error) {
    // console.error('Error fetching provinces:', error);
  }
};


// fetchShippingCost
export const fetchShippingCost = async (
  originId,
  destinationId,
  weight,
  courier,
  setShippingOptions,
) => {
  try {
    const { data } = await axios.post(
      '/api/cost',
      {
        origin: originId,
        originType: 'city',
        destination: destinationId,
        destinationType: 'subdistrict',
        weight,
        courier,
      },
      {
        headers: {
          key: import.meta.env.VITE_APP_API_KEY_RAJAONGKIR,
          'Content-Type': 'application/json',
        },
      },
    );

    const costs = data?.rajaongkir?.results?.[0]?.costs;
    if (costs) {
      setShippingOptions(costs);
    } else {
      // console.error('Invalid response structure:', data);
    }
  } catch (error) {
    // console.error('Error fetching shipping cost:', error);
  }
};

