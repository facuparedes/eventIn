import Event from "../../../api/firebase/models/event";

export const GET_EVENTS = "GET_EVENTS";
export const GET_DETAILS = "GET_DETAILS";
export const IS_LOGGED = "IS_LOGGED";

export const getEvents = () => {
  return async function (dispatch) {
    let result = await Event.findAll();

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

export const isLogged = (id) => {
  return {
    type: IS_LOGGED,
    payload: id
  }
}