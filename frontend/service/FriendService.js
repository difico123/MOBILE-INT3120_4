import axios from "axios";
import APP from "../config/app";
const API = `${APP.BASE_API}friends`;
import queryString from "query-string";

const getMyFriends = async (token, query = null) => {
  try {
    let config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const statusQuery = query ? query.status ?? 1 : 1;
    let url = API + `?status=${statusQuery}`;
    if (query) {
      url += "&" + queryString.stringify(query);
    }
    const response = await axios.get(url, config);
    return response.data.data;
  } catch (err) {
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
    return response.data.data;
  } catch (err) {
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
    return false;
  }
};

const approveFriend = async (token, friend_id) => {
  try {
    const config = {
      method: "put",
      url: `${API}/${friend_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { status: 1 },
    };

    const response = await axios(config);
    return response.data.data;
  } catch (err) {
    console.log(err, "failed in approveFriend");
    return false;
  }
};
const getFriendRequest = async (token, status, page = 1) => {
  try {
    const config = {
      method: "get",
      url: API + "/request?status=" + status + "&page=" + page,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios(config);
    return response.data.data;
  } catch (err) {
    return false;
  }
};

export default {
  getMyFriends,
  addFriend,
  removeFriend,
  getFriendRequest,
  approveFriend,
};
