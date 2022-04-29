import axios from "axios";
import APP from "../config/app";
const API = `${APP.BASE_API}events`;
import queryString from "query-string";

const getEvents = async (token, params = null) => {
  try {
    let config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    let url = API;
    if (params) {
      url += "?" + queryString.stringify(params);
    }
    const response = await axios.get(decodeURIComponent(url), config);
    return response.data.data.items;
  } catch (err) {
    console.log("error", err);
    return [];
  }
};

const getById = async (token, id) => {
  try {
    let config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(API + `/${id}`, config);
    return response.data.data;
  } catch (err) {
    console.log("error in get by id", err);
    return [];
  }
};

const toggleLikedEvent = async (token, id, type = "like") => {
  try {
    let config = {
      method: type == "like" ? "post" : "delete",
      url: `${API}/${id}/like`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    console.log(config);
    await axios(config);
    return true;
  } catch (err) {
    console.log("error in toggleLikedEvent", err);
    return false;
  }
};

const toggleJoinedPublicEvent = async (token, id, type = "join") => {
  try {
    let config = {
      method: type == "join" ? "post" : "delete",
      url: `${API}/${id}/join`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    await axios(config);
    return true;
  } catch (err) {
    console.log("error in toggleJoinedPublicEvent", err);
    return false;
  }
};
export default {
  getEvents,
  getById,
  toggleLikedEvent,
  toggleJoinedPublicEvent,
};
