import { io } from "socket.io-client";
import App from "../config/app";
const { IP } = App;
let socket;

export const initSocket = () => {
  socket = io(`http://${IP}:3000`);
};

export const joinRoom = (room, username, image) => {
  socket.emit("joinRoom", { room: room, username: username, image: image });
};

export const disconnectSocket = () => {
  socket?.disconnect();
};

export const messageSocket = (listening, cb) => {
  socket?.on(listening, cb);
};

export const sendMessage = (listening, message) => {
  socket?.emit(listening, message);
};

export const offSocket = (listening, handler) => {
  socket?.off(listening, handler);
};
