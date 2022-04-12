import { ADD_EVENT } from "./type";

export const addEvent = (event) => async (dispatch) => {
    try {
        dispatch({ type: ADD_EVENT, events: event });
    } catch (error) {
        console.warn(err);
    }
};

export const editEvent = (event) => async (dispatch) => {
    try {
        dispatch({ type: ADD_EVENT, events: event });
    } catch (error) {
        console.log(error);
    }
};
