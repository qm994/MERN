import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
//import { logger } from 'redux-logger';
import rootReducer from './root-reducer';

const middlewares = [thunk];
const intialState = {};

export const store = createStore(
    rootReducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

