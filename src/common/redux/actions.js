import { getDocs, collection } from "firebase/firestore";
import db from '../../../api/firebase/config'

export const GET_EVENTS = 'GET_EVENTS';

export const getEvents = () => {
    return async function(dispatch) {
        let result = await getDocs(collection(db, "events"));  
        return dispatch({
            type: GET_EVENTS,
            payload: result.docs
        })  
    }
}