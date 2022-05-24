import axios from "axios";
import APP from "../config/app";
const API = `${APP.BASE_API}users`;
const getUser = async (token) => {
  let config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  console.log(config);
  const response = await axios.get(API + "/me", config);
  return response.data.data;
};
const updateUser = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.put(API + "/me", data, config);
  return response.data.data;
};

const updatePassword = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.put(API + "/me/password", data, config);
  return response.data.data;
};

const getUserById = async (token, userId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(`${API}/${userId}`, config); 
    return response.data.data;
  } catch (e) {
    console.log(e, "error in getUserById");
    return null;
  }
};

const getUserList = async (token) => {
  let config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API, config);
  return response.data.data;
}; 
export default { getUser, updateUser, updatePassword, getUserById, getUserList };
