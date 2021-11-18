import event from "../../../api/firebase/models/event";
import user from "../../../api/firebase/models/user";
import { where } from "firebase/firestore";
import auth from "../../../api/firebase/services/AuthService";

export const GET_EVENTS = "GET_EVENTS";
export const GET_DETAILS = "GET_DETAILS";
export const ADD_EVENT_INFO = "ADD_EVENT_INFO";
export const GET_EVENTS_CATEGORY = "GET_EVENTS_CATEGORY";
export const GET_EVENTS_BY_TITLE = "GET_EVENTS_BY_TITLE";
export const IS_LOGGED = "IS_LOGGED";
export const GET_EVENTS_DATE = "GET_EVENTS_DATE";
export const CLEAN_EVENTS = "CLEAN_EVENTS";
export const GET_LIKED_EVENTS = "GET_LIKED_EVENTS";
export const GET_CREATED_EVENTS = "GET_CREATED_EVENTS";
export const CLEAN_EVENT_INFO = "CLEAN_EVENT_INFO";

export const getEvents = () => {
  var today = new Date();
  return async function (dispatch) {
    let likedEventsUUIDs = [];
    let result = await event.find(where("end", ">", today));
    result = result.filter((e) => e.publishDate <= today);
    result.sort((a, b) => a.start > b.start);

    if (auth.currentUser) {
      user
        .include("events", "liked", auth.currentUser.uid)
        .find()
        .then((data) => {
          likedEventsUUIDs = data["events-liked"].map((e) => e.eventUUID);
        })
        .then(() => {
          result.map((e) => {
            let likedEvent = likedEventsUUIDs.find((id) => id === e.id);
            if (likedEvent) {
              e.likedActive = "true";
            }
          });
          return result;
        })
        .then((result) => {
          return dispatch({
            type: GET_EVENTS,
            payload: result,
          });
        })
        .catch((e) => console.log("ESTE ERROR ES DE LIKED X EVENTO", e));
    } else {
      return dispatch({
        type: GET_EVENTS,
        payload: result,
      });
    }
  };
};

export const getEventsByCategory = (category) => {
  return async function (dispatch) {
    var resultCat = [];
    var filterCat = [];
    var publishCategory = [];
    var today = new Date();

    resultCat = await event.find(where("category", "==", category));
    //console.log("cat 1: ", resultCat.length);
    if (resultCat.length > 0) {
      filterCat = resultCat.filter((c) => c.end > today);
      //console.log("cat 2: ", filterCat.length);
      if (filterCat.length > 0) {
        publishCategory = filterCat.filter((e) => e.publishDate <= today);
        //console.log("cat 3: ", publishCategory.length);
        if (publishCategory.length > 0) {
          publishCategory.sort((a, b) => a.start > b.start);
          return dispatch({
            type: GET_EVENTS_CATEGORY,
            payload: publishCategory,
          });
        } else alert("No hay eventos en esa Categoría");
      } else alert("No hay eventos en esa Categoría");
    } else alert("No hay eventos en esa Categoría");
  };
};

export const getEventsByDate = (date) => {
  var filterDate = [];
  var filterPublish = [];
  var today = new Date();

  return async function (dispatch) {
    let resultDate = await event.findAll();

    filterDate = resultDate.filter((d) => d.start <= date.setHours(23, 59, 0, 0) && date.setHours(0, 0, 0, 1) <= d.end);//eventos activos en esa fecha
    //console.log("Ev fecha 1: ", filterDate.length)
    if (filterDate.length > 0) {
      filterPublish = filterDate.filter(d => d.publishDate <= date.setHours(23, 59, 0, 0));//eventos activos en publicacion en esa fecha
      //console.log("Ev fecha 2: ", filterPublish.length)
      if (filterPublish.length > 0) {
        filterPublish.sort((a, b) => a.start > b.start);
        return dispatch({
          type: GET_EVENTS_DATE,
          payload: filterPublish,
        });
      } else alert("No hay eventos activos en esa fecha.");
    } else alert("No hay eventos activos en esa fecha.");

  };
};

export const getEventsByName = (title) => {
  return async function (dispatch) {
    let allEvents = await event.findAll();
    title = title.toLowerCase();
    let eventsTitle = allEvents.filter((e) => e.title.toLowerCase().includes(title));
    if (eventsTitle.length) {
      eventsTitle.sort((a, b) => a.start > b.start);
      return dispatch({
        type: GET_EVENTS_BY_TITLE,
        payload: eventsTitle,
      });
    } else alert("No se han encontrado eventos.");
  };
};

export const getDetails = (id, created = null, likedBefore = null) => {
  if (created) {
    return {
      type: GET_DETAILS,
      payload: {
        id,
        created
      }
    };
  } else if (likedBefore) {
    return {
      type: GET_DETAILS,
      payload: {
        id,
        likedBefore
      }
    };
  }
  else {
    return {
      type: GET_DETAILS,
      payload: id,
    };
  }
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

export const updateEventsSignOut = () => {
  return {
    type: CLEAN_EVENTS,
    payload: [],
  };
};

export const getLikedEvents = (id) => {
  return async function (dispatch) {
    let eventsLiked = await user.include("events", "liked", id).find();
    if (eventsLiked) {
      let eventsUUIDs = eventsLiked["events-liked"].map((e) => e.eventUUID);

      let eventsFound = await getLikedOrCreatedEventById(eventsUUIDs);

      if (eventsFound) {
        return dispatch({
          type: GET_LIKED_EVENTS,
          payload: eventsFound,
        });
      }
    } else {
      return dispatch({
        type: GET_LIKED_EVENTS,
        payload: [],
      });
    }
  };
};

async function getLikedOrCreatedEventById(array) {
  let events = [];
  for (let i = 0; i < array.length; i++) {
    let eventById = await event.findById(array[i]);
    events.push(eventById);
  }
  return events;
}

export const getCreatedEvents = (id) => {
  return async function (dispatch) {
    let eventsCreated = await user.include("events", "created", id).find();
    if (eventsCreated) {
      let eventsUUIDs = eventsCreated["events-created"].map((e) => e.eventUUID);

      let eventsFound = await getLikedOrCreatedEventById(eventsUUIDs);

      if (eventsFound) {
        return dispatch({
          type: GET_CREATED_EVENTS,
          payload: eventsFound,
        });
      }
    } else {
      return dispatch({
        type: GET_CREATED_EVENTS,
        payload: [],
      });
    }
  };
};

export const cleanEventInfo = () => {
  return {
    type: CLEAN_EVENT_INFO,
  }
}