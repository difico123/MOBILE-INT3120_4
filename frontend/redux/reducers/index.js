import auth from "./auth_reducer";
import event from "./event_reducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
    auth: auth,
    event: event,
});

export default (state, actions) => reducers(state, actions);
