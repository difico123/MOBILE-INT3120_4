import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT } from "./type";
import EventService from "../../service/EventService";

const idGenerator = () => {
  let id = 0;
  const increase = () => {
    id++;
  };
  const getId = () => id;
  return { getId, increase };
};
const id = idGenerator();

export const addEvent = (event) => async (dispatch) => {
  id.increase();
  event.id = id.getId();
  let res = await EventService.create(event);
  console.log("🚀 ~ file: event_actions.js ~ line 18 ~ addEvent ~ res", res);

  dispatch({ type: ADD_EVENT, events: event });
};

export const editEvent = (event) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_EVENT, event: event });
  } catch (error) {
    console.log(error);
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EVENT, id: id });
  } catch (error) {
    console.log(error);
  }
};
