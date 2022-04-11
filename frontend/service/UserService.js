import axios from "axios";
import APP from "../config/app";
const API = `${APP.BASE_API}users/me`;
const getUser = async (token) => {
  let config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API, config);
  return response.data.data;
};
const updateUser = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.put(API, data, config);
  return response.data.data;
};

const updatePassword = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.put(API + "/password", data, config);
  return response.data.data;
};
export default { getUser, updateUser, updatePassword };
