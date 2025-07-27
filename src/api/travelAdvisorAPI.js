/* eslint-disable consistent-return */
import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    if (!type || !sw || !ne) {
      // console.warn('Missing type or bounds for API call');
      return [];
    }

    const { data: { data } } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
          'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
        },
      },
    );

    return Array.isArray(data) ? data : [];
  } catch (error) {
    // console.error(`getPlacesData error for type: ${type}`, error?.response?.data || error.message);
    return [];
  }
};
