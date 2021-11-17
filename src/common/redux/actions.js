import event from "../../../api/firebase/models/event";
import user from "../../../api/firebase/models/user";
import { where } from "firebase/firestore";
// import auth from "../../../api/firebase/services/AuthService";

export const GET_EVENTS = "GET_EVENTS";
export const GET_DETAILS = "GET_DETAILS";
export const ADD_EVENT_INFO = "ADD_EVENT_INFO";
export const GET_EVENTS_CATEGORY = "GET_EVENTS_CATEGORY";
export const GET_EVENTS_BY_TITLE = "GET_EVENTS_BY_TITLE";
export const IS_LOGGED = "IS_LOGGED";
export const GET_EVENTS_DATE = "GET_EVENTS_DATE";


export const getEvents = () => {
  let today = new Date();
  return async function (dispatch, getState) {
    let isLogged = getState().isLogged;
    // console.log(isLogged);
    let likedEventsUUIDs = [];
    let result = await event.find(where("end", ">", today));
    if (isLogged) {
      user.include('events', 'liked', isLogged).find()
        .then(data => {
          likedEventsUUIDs = data["events-liked"].map(e => e.eventUUID);
        })
        .then(() => {
          result.map(e => {
            let likedEvent = likedEventsUUIDs.find(id => id === e.id);
            if (likedEvent) {
              e.liked = 'true';
            }
          })
          console.log('ALL EVENTS ACTIONNNNNNN', result)
        })
        .catch(e => console.log('ESTE ERROR ES DE LIKED X EVENTO', e));
    }
    return dispatch({
      type: GET_EVENTS,
      payload: result,
    })
  };
};

export const getEventsByCategory = (category) => {
  return async function (dispatch) {
    var resultCat = [];
    resultCat = await event.find(where("category", "==", category));
    if (resultCat.length > 0) {
      //console.log("PROP start FIREBASE", resultCat[0].start);
      return dispatch({
        type: GET_EVENTS_CATEGORY,
        payload: resultCat,
      });
    } else alert("No hay eventos en esa Categoría");
  };
};

export const getEventsByDate = (date) => {
  var filterDate = [];
  return async function (dispatch) {
    let resultDate = await event.findAll();
    filterDate = resultDate.filter((d) => d.start.toLocaleDateString() === date.toLocaleDateString());
    if (filterDate.length > 0) {
      return dispatch({
        type: GET_EVENTS_DATE,
        payload: filterDate,
      });
    } else alert("No hay eventos en esta fecha.");
  };
};

export const getEventsByName = (title) => {
  return async function (dispatch) {
    let allEvents = await event.findAll();
    title = title.toLowerCase();
    let eventsTitle = allEvents.filter((e) => e.title.toLowerCase().includes(title));
    if (eventsTitle.length) {
      return dispatch({
        type: GET_EVENTS_BY_TITLE,
        payload: eventsTitle,
      });
    } else alert("No se han encontrado eventos.");
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

export const changeIsLogged = (id) => {
  return {
    type: IS_LOGGED,
    payload: id,
  };
};
