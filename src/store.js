import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Map, fromJS } from 'immutable';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import persistState, { mergePersistedState, actionTypes as reduxLocalStorageActionTypes } from 'redux-localstorage';
import storageAdapter from 'redux-localstorage/lib/adapters/localStorage';
import storageFilter from 'redux-localstorage-filter';
import { serialize, deserialize } from 'redux-localstorage-immutable';

import * as reducers from './reducers';

let middleware = [
	thunkMiddleware
];


if(process.env.NODE_ENV !== "production") {
	middleware.push(
		createLogger({
			stateTransformer: state => state.toJS()
		})
	)
}

const rootReducer = combineReducers(reducers);

const persistentReducer = compose(
	mergePersistedState(
		(state, persistedState) => state.mergeDeep(fromJS(persistedState))
	)
)(rootReducer);

const storage = compose(
	serialize,
	storageFilter([
		"settings",
		"session.roomId",
		"session.isAdmin",
		"session.adminRequestIdentifier"
	])
)(storageAdapter(window.localStorage))

const createPersistentStore = compose(
	persistState(storage, "crowdplay"),
	applyMiddleware.apply(null, middleware)
)(createStore);

const store = createPersistentStore(persistentReducer, Map());
export default store;
