import auth from "./auth_reducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
    auth: auth,
});

export default (state, actions) => reducers(state, actions);
