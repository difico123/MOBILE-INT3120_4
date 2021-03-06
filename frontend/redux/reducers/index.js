import auth from "./auth_reducer";
import event from "./event_reducer";
import app from "./app_reducer";
import { combineReducers } from "redux";
import favoriteReducer from './favorite_reducer';
import friend_reducer from "./friend_reducer";

const reducers = combineReducers({
    auth: auth,
    favorite: favoriteReducer,
    events: event,
    app: app,
    friend: friend_reducer
});

export default (state, actions) => reducers(state, actions);
