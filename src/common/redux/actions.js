import event from "../../../api/firebase/models/event";

export const GET_EVENTS = "GET_EVENTS";
export const GET_DETAILS = "GET_DETAILS";
export const ADD_INFO_USER = "ADD_INFO_USER";

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
export const addUserInfo = (data) => {
  return({
    type: ADD_INFO_USER,
    payload: data
  })
}