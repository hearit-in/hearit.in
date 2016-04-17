import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from './reducers';

let middleware = [thunkMiddleware];

if(DEBUG) {
	middleware.push(createLogger());
}

const createStoreWithMiddleware = applyMiddleware.apply(null, middleware)(createStore);

const rootReducer = combineReducers(reducers);
const store = createStoreWithMiddleware(rootReducer);

export default store;
