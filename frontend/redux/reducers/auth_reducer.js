import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL, GET_USER_INFO } from "../actions/type";
const initialState = {
    user: {
        name: "",
    },
    token: "",
};

export default function (state = initialState, payload) {
    switch (payload.type) {
        case FACEBOOK_LOGIN_SUCCESS:
            return { token: payload.token };
        case FACEBOOK_LOGIN_FAIL:
            return { token: null };
        case GET_USER_INFO:
            return { ...state, user: payload.user };
        default:
            return state;
    }
}
