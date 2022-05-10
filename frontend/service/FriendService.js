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

    const response = await axios.get(API, config);
    return response.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const addFriend = async (token, friend_id) => {
  try {
    const config = {
      method: "post",
      url: API,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { friend_id },
    };

    const response = await axios(config);
    console.log(response.data, "data");
    return response.data.data;
  } catch (err) {
    console.log(err, "failed in addFriend");
    return false;
  }
};

const removeFriend = async (token, friend_id) => {
  try {
    const config = {
      method: "delete",
      url: API,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { friend_id, status: 0 },
    };

    const response = await axios(config);
    return response.data.data;
  } catch (err) {
    console.log(err, "failed in removeFriend");
    return false;
  }
};

export default { getMyFriends, addFriend, removeFriend };
