import event from "../../../api/firebase/models/event";

export const GET_EVENTS = "GET_EVENTS";

export const getEvents = () => {
  return async function (dispatch) {
    let result = await event.findAll();

    return dispatch({
      type: GET_EVENTS,
      payload: result,
    });
  };
};
