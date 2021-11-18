import { GET_EVENTS, GET_DETAILS, GET_EVENTS_CATEGORY, IS_LOGGED, GET_EVENTS_BY_TITLE, GET_EVENTS_DATE, ADD_EVENT_INFO, CLEAN_EVENTS, GET_LIKED_EVENTS, GET_CREATED_EVENTS } from "./actions";

const initialState = {
  events: [],
  likedEvents: [],
  createdEvents: [],
  detail: [],
  eventForm: {},
  isLogged: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      var currentsEvents = action.payload;
      let today = new Date();
      var publishEvents = currentsEvents.filter(e => e.publishDate <= today);
      if (publishEvents) {
        publishEvents.sort((a, b) => a.start > b.start);
        return {
          ...state,
          events: publishEvents,
        };
      }

    case GET_EVENTS_CATEGORY:
      var cat = action.payload;
      var today = new Date();
      var filterCat = cat.filter((c) => c.end > today);

      if (filterCat) {
        return {
          ...state,
          events: filterCat,
        };
      } else alert("no hay eventos próximos en esa categoría");

    case GET_EVENTS_BY_TITLE:
      return {
        ...state,
        events: action.payload,
      };

    case GET_EVENTS_DATE:
      return {
        ...state,
        events: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        detail: state.events.filter((e) => e.id === action.payload),
      };

    case ADD_EVENT_INFO:
      let eventData = state.eventForm;
      let newEventData = action.payload;

      for (const prop in newEventData) {
        eventData[prop] = newEventData[prop];
      }

      return {
        ...state,
        eventForm: eventData,
      };

    case IS_LOGGED:
      return {
        ...state,
        isLogged: action.payload,
      };
    case CLEAN_EVENTS:
      return {
        state,
        events: action.payload,
      };
    case GET_LIKED_EVENTS:
      let eventsWithLikeAct = action.payload;
      if (eventsWithLikeAct.length) {
        eventsWithLikeAct = eventsWithLikeAct.map((e) => ({ ...e, likedActive: true }));
        eventsWithLikeAct.sort((a, b) => a.start > b.start);
      }
      return {
        ...state,
        likedEvents: eventsWithLikeAct,
      };
    case GET_CREATED_EVENTS:
      let createdEventsWithLikeAct = action.payload;
      if (createdEventsWithLikeAct.length) {
        createdEventsWithLikeAct = createdEventsWithLikeAct.map((e) => ({ ...e, likedActive: true }));
        createdEventsWithLikeAct.sort((a, b) => a.start > b.start);
      }
      return {
        ...state,
        createdEvents: createdEventsWithLikeAct,
      };
    default:
      return state;
  }
};
