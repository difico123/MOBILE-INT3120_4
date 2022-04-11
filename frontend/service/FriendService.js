import axios from "axios";
import APP from "../config/app";
const API = `${APP.BASE_API}friends`;

const getMyFriends = async (token, query = null) => {
  try {
    let config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
  
    console.log(API, token);
    const response = await axios.get(API, config);
    console.log(response);
    return response.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default {getMyFriends};
