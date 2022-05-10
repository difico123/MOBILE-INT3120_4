import { SET_ROUTER } from "../actions/type";
import { SET_SOCKET } from "../actions/type";
const initialState = {
    router: "",
    socket: "",
};

export default function (state = initialState, payload) {
    switch (payload.type) {
        case SET_ROUTER:
            return { ...state, router: payload.router };
        case SET_SOCKET:
            return { ...state, socket: payload.socket };
        default:
            return state;
    }
}
