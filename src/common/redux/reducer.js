import { GET_EVENTS, GET_DETAILS, GET_EVENTS_CATEGORY, IS_LOGGED, GET_EVENTS_BY_TITLE, GET_EVENTS_DATE, ADD_EVENT_INFO } from "./actions";

const initialState = {
  events: [],
  detail: [],
  eventForm: {},
  isLogged: "",
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
        eventForm: eventData
      }

    case IS_LOGGED:
      return {
        ...state,
        isLogged: action.payload,
      };
    default:
      return state;
  }
};
