import axios from "axios";
const API = "http://172.27.160.1:5002/api/friends";

const getMyFriends = async (token, query = null) => {
  let config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API, config);
  return response.data.data;
};

export default {getMyFriends};
