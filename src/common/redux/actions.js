import event from "../../../api/firebase/models/event";

export const GET_EVENTS = "GET_EVENTS";
export const GET_DETAILS = "GET_DETAILS";
export const ADD_EVENT_INFO = "ADD_EVENT_INFO";

export const getEvents = () => {
  return async function (dispatch) {
    let result = await event.findAll();

    return dispatch({
      type: GET_EVENTS,
      payload: result,
    });
  };
};
export const getDetails = (id) => {
  return {
    type: GET_DETAILS,
    payload: id,
  };
};
export const addEventInfo = (data) => {
  return {
    type: ADD_EVENT_INFO,
    payload: data,
  };
};
