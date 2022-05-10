import { SET_ROUTER, SET_SOCKET } from "./type";

export const setRouter = (router) => async (dispatch) => {
    try {
        dispatch({ type: SET_ROUTER, router: router });
    } catch (error) {
        console.warn(error);
    }
};

export const setSocket = (socket) => async (dispatch) => {
    try {
        dispatch({ type: SET_SOCKET, socket: socket });
    } catch (error) {
        console.warn(error);
    }
};
