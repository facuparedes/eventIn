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
      return {
        ...state,
        events: action.payload,
      };


    case GET_EVENTS_CATEGORY:
      return {
        ...state,
        events: action.payload,
      };

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
      if (action.payload.created) {
        return {
          ...state,
          detail: state.createdEvents.filter((e) => e.id === action.payload.id),
        };
      } else {
        return {
          ...state,
          detail: state.events.filter((e) => e.id === action.payload),
        };
      }

    case ADD_EVENT_INFO:
      let reducerEventData = state.eventForm;
      let eventData = {};
      let newEventData = action.payload;
      console.log("STATE: ", state.eventForm)
      console.log("EVENT-DATA: ", eventData)
      for (const prop in newEventData) {
        console.log("SOY EL PROP: ", prop)
        eventData[prop] = newEventData[prop];
      }
      reducerEventData = {...reducerEventData, ...eventData}
      console.log("ESTADO GLOBAL: ",reducerEventData)
      return {
        ...state,
        eventForm: reducerEventData,
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
      console.log(action.payload);
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
