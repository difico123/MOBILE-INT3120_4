import auth from "./auth_reducer";
import { combineReducers } from "redux";
import favoriteReducer from './favorite_reducer';

const reducers = combineReducers({
    auth: auth,
    favorite: favoriteReducer
});

export default (state, actions) => reducers(state, actions);
