import { io } from "socket.io-client";

let socket;

export const initSocket = () => {
    socket = io("http://172.16.0.91:3005");
};

export const joinRoom = (room, username) => {
    socket.emit("joinRoom", { room: room, username: username });
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
