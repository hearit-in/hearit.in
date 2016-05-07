import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import persistState, { mergePersistedState, actionTypes } from 'redux-localstorage';
import storageAdapter from 'redux-localstorage/lib/adapters/localStorage';
import storageFilter from 'redux-localstorage-filter';
import { serialize, deserialize } from 'redux-localstorage-immutable';

import * as reducers from './reducers';

let middleware = [
	thunkMiddleware,
	createLogger({
		stateTransformer: state => state.toJS()
	})
];

const combinedReducer = combineReducers(reducers);

function rootReducer(state, action) {
	if(action.type === actionTypes.INIT) {
		let persistedState = action.payload;
		let mergedState = Map()
			.merge(state, persistedState)
			.setIn(["lifecycle", "hasLoadedPersistentState"], true);

		return mergedState;
	}

	return combinedReducer(state, action);
}

const persistentReducer = compose(
	mergePersistedState(
		deserialize
	)
)(rootReducer);

const storage = compose(
	serialize,
	storageFilter([
		"session.roomId",
		"settings"
	])
)(storageAdapter(window.localStorage))

const createPersistentStore = compose(
	persistState(storage, "crowdplay"),
	applyMiddleware.apply(null, middleware)
)(createStore);

const store = createPersistentStore(persistentReducer, new Map());
export default store;
