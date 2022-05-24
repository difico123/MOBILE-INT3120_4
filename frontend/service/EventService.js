import axios from "axios";
import APP from "../config/app";
const API = `${APP.BASE_API}events`;
import queryString from "query-string";
import http from "./http";

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
    console.log(config, id);
    const response = await axios.get(API + `/${id}`, config);
    console.log(response.data);
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
    console.log(config);
    await axios(config);
    return true;
  } catch (err) {
    console.log("error in toggleJoinedPublicEvent", err);
    return false;
  }
};

const getHealcheck = async () => {
  return await http.get("/healthcheck");
};

const create = async () => {
  return await http.get("/create");
};

const getInvitedRequest = async (token, event_id, status) => {
  try {
    let config = {
      method: "get",
      url: `${API}/${event_id}/requests?status=${status}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const result = await axios(config);
    return result.data.data;
  } catch (err) {
    console.log("getInvitedRequest", err);
    return false;
  }
};

//invite one friend
const inviteFriend = async (token, event_id, user_id = []) => {
  try {
    const config = {
      method: "post",
      url: `${API}/${event_id}/invite`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { user_id },
    };

    console.log(config);
    const response = await axios(config);
    return response.data.code === "000" ? true : false;
  } catch (err) {
    console.log(err, "failed in inviteFriend");
    return false;
  }
};

const deleteInvitedFriend = async (token, event_id, user_id = []) => {
  try {
    const config = {
      method: "delete",
      url: `${API}/${event_id}/invite`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { user_id },
    };

    console.log(config);
    const response = await axios(config);
    return response.data.code === "000" ? true : false;
  } catch (err) {
    console.log(err, "failed in deleteInvitedFriend");
    return false;
  }
};

const getEventRequests = async (token, page = 1) => {
  try {
    let config = {
      method: "get",
      url: `${API}/request?page=${page}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const res = await axios(config);
    return res.data.data.items;
  } catch (err) {
    console.log("error in getEventRequests", err);
    return false;
  }
};

const approveInvite = async (token, eventId) => {
  try {
    const config = {
      method: "put",
      url: `${API}/${eventId}/invite`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { approve: "approved" },
    };

    console.log(config);
    const response = await axios(config);
    // return response.data.code === "000" ? true : false;
    return true;
  } catch (err) {
    console.log(err, "failed in approveInvite");
    return false;
  }
};

export default {
  getEvents,
  getById,
  toggleLikedEvent,
  getHealcheck,
  create,
  toggleJoinedPublicEvent,
  getInvitedRequest,
  inviteFriend,
  deleteInvitedFriend,
  getEventRequests,
  approveInvite,
};
