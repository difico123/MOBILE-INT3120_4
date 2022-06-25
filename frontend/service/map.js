const token = `pk.eyJ1IjoiMTkwMjAxNTMiLCJhIjoiY2wxcW1zaThqMGNoZjNlbnVxa3RxemV0byJ9.UEl5_-ImtIqWiHIrSI9KLw`;
const API = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
import axios from "axios";

export const searchLocation = async (keyword) => {
  let endpoint = `${API}${keyword}.json?poi%2Ccountry%2Caddress%2Cpostcode%2Cplace%2Cneighborhood%2Clocality%2Cdistrict%2Cregion&access_token=${token}`;
  return await axios.get(endpoint);
};

export const geoToName = async ({ latitude, longitude }) => {
  let endpoint = `${API}${longitude},${latitude}.json?types=region%2Ccountry%2Cdistrict%2Cplace%2Clocality%2Cpoi%2Caddress&limit=1&access_token=${token}`;
  let res = await axios.get(endpoint);
  return res?.data;
};
