const token = `pk.eyJ1IjoiMTkwMjAxNTMiLCJhIjoiY2wxcW1zaThqMGNoZjNlbnVxa3RxemV0byJ9.UEl5_-ImtIqWiHIrSI9KLw`;
const API = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
import axios from "axios";

export const searchLocation = async (keyword) => {
    return await axios.get(`${API}${keyword}.json?access_token=${token}`);
};
