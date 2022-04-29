import { ADD_FRIEND, DELETE_FRIEND, UPDATE_LIST_FRIEND } from "../actions/type";

export default function (state = 0, action) {
  switch (action.type) {
    case ADD_FRIEND:
      return state + 1;
    case DELETE_FRIEND:
      return state > 1 ? state - 1 : 0;
    case UPDATE_LIST_FRIEND:
      return action.payload;
    default:
      return state;
  }
}
