import { GET_EVENTS, GET_DETAILS, GET_EVENTS_CATEGORY, GET_EVENTS_BY_TITLE } from "./actions";

const initialState = {
  events: [],
  detail: [],
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
      }
    case GET_DETAILS:
      return {
        ...state,
        detail: state.events.filter((e) => e.id === action.payload),
      };
    default:
      return state;
  }
};
