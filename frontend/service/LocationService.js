import Geocoder from "react-native-geocoding";
import APP from "../config/app";

const getLocationByLatAndLong = async (lat, long) => {
  try {
    Geocoder.init(APP.GEOLOCATION_API_KEY);
    const getLocation = await Geocoder.from(lat, long);
    const location = getLocation
      ? getLocation.results[0].formatted_address
      : "Không xác định";
    return location;
  } catch (e) {
    // console.log(e);
    return "Không xác định";
  }
};

export default { getLocationByLatAndLong };
