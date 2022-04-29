import { ADD_FRIEND, DELETE_FRIEND, UPDATE_LIST_FRIEND } from "./type"

export const addFriend = (item) => {
    return {
        type: ADD_FRIEND, payload: item
    }
}

export const deleteFriend = (item) => {
    return { type: DELETE_FRIEND, payload: item }
}

export const updateListFriend = (list) => {
    return { type: UPDATE_LIST_FRIEND, payload: list }
}
