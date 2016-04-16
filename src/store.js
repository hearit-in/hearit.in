import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from './reducers';

let middleware = [thunkMiddleware];

if(PRODUCTION) middleware.concat([
	createLogger ? createLogger() : null
]);

const createStoreWithMiddleware = applyMiddleware.apply(undefined, middleware)(createStore);

const rootReducer = combineReducers(reducers);
const store = createStoreWithMiddleware(rootReducer);
export default store;