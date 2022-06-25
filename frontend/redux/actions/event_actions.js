import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT, GET_EVENTS } from "./type";
import EventService from "../../service/EventService";
import ImageService from "../../service/ImageService";
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
  let res = await EventService.create(event);
  event.id = res?.data?.id;
  dispatch({ type: ADD_EVENT, events: event });
};

export const editEvent = (event) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_EVENT, event: event });
    await EventService.editEvent(event.id, event);
  } catch (error) {
    console.log(error);
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EVENT, id: id });
    await EventService.deleteEvent(id);
  } catch (error) {
    console.log(error);
  }
};

export const getEvents = () => async (dispatch) => {
  try {
    let res = await EventService.getEventsCreated();
    let events = res?.data?.items.map((item) => {
      let imageArr = item.images;
      if (item.images?.length > 0) {
        imageArr = item.images.map((image) => {
          if (!image.startsWith("http")) {
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLrW7MwE4yjLYfZnLpcy02zmlb7yXPloXpxA&usqp=CAU";
          } else {
            return image;
          }
        });
      } else if (item.images?.length === 0) {
        imageArr = [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLrW7MwE4yjLYfZnLpcy02zmlb7yXPloXpxA&usqp=CAU",
        ];
      }

      return {
        ...item,
        images: [...imageArr],
      };
    });
    dispatch({ type: GET_EVENTS, events });
  } catch (error) {
    console.log(error);
  }
};
