import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from './reducers';

let middleware = compose(
	thunkMiddleware
);

if(DEBUG) {
	middleware = compose(
		middleware,
		createLogger ? createLogger() : a => a
	);
}

const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);

const rootReducer = combineReducers(reducers);
const store = createStoreWithMiddleware(rootReducer);
export default store;