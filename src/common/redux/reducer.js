import { GET_EVENTS , GET_DETAILS} from "./actions";


const initialState = {
    events: [],
    detail: [],
}



export const rootReducer = (state= initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            
            return {
                ...state,
                events: action.payload
            }

        case GET_DETAILS:
            return{
                ...state,
                detail : action.payload
            }   
        default:
            return state;
    }
}