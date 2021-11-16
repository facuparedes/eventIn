import event from "../../../api/firebase/models/event";
import User from "../../../api/firebase/models/user";
import { where } from "firebase/firestore";

export const GET_EVENTS = "GET_EVENTS";
export const GET_DETAILS = "GET_DETAILS";
export const ADD_EVENT_INFO = "ADD_EVENT_INFO";
export const GET_EVENTS_CATEGORY = "GET_EVENTS_CATEGORY";
export const GET_EVENTS_BY_TITLE = "GET_EVENTS_BY_TITLE";
export const IS_LOGGED = "IS_LOGGED";
export const GET_EVENTS_DATE = "GET_EVENTS_DATE";
export const GET_LIKED_EVENTS = "GET_LIKED_EVENTS";


export const getEvents = () => {
  let today = new Date();
  return async function (dispatch) {
    let result = await event.find(where("end", ">", today));

    return dispatch({
      type: GET_EVENTS,
      payload: result,
    });
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

export const getLikedEvents = (id) => {
  return async function (dispatch) {
    let eventsLiked = await User.include('events', 'liked', id).find();
    let eventsUUIDs = eventsLiked["events-liked"].map(e => e.eventUUID);

    let event1 = await getLikedEventById(eventsUUIDs);

    if (event1) {
      return dispatch({
        type: GET_LIKED_EVENTS,
        payload: event1
      })
    }
  }
}

async function getLikedEventById(array) {
  let events = [];
  for (let i = 0; i < array.length; i++) {
    let eventById = await event.findById(array[i])
    events.push(eventById);
  }
  return events;
}