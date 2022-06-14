import http from "./http";
const endpoint = "/chat_rooms";
const getChatRooms = async () => {
  return http.get(`${endpoint}?page=1&page_size=10`);
};

const chatRoom = async (eventId) => {
  return http.get(
    `${endpoint}/message?event_id=${eventId}&page=1&page_size=10`
  );
};

const chat = (async = (data) => {
  return http.post(`${endpoint}/message`, data);
});
export default {
  getChatRooms,
  chatRoom,
  chat,
};
