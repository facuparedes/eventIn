import { counterReducer } from "./reducer";
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(counterReducer)

export default store;