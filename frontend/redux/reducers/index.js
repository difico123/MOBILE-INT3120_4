import auth from "./auth_reducer";
import event from "./event_reducer";
import app from "./app_reducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
    auth: auth,
    events: event,
    app: app,
});

export default (state, actions) => reducers(state, actions);
