import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import persistState from 'redux-localstorage';

import * as reducers from './reducers';

let middleware = [thunkMiddleware];

if(DEBUG) {
	middleware.push(createLogger());
}

const rootReducer = combineReducers(reducers);
const store = createStore(
	rootReducer,
	compose(
		applyMiddleware.apply(null, middleware),
		persistState("session")
	)
);

export default store;
