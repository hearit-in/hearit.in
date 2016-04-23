import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import { serialize, deserialize } from 'redux-localstorage-immutable';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import persistState, { mergePersistedState } from 'redux-localstorage';
import storageAdapter from 'redux-localstorage/lib/adapters/localStorage';
import storageFilter from 'redux-localstorage-filter';
import { Map } from 'immutable';

import * as reducers from './reducers';

let middleware = [
	thunkMiddleware,
	createLogger({
		stateTransformer: (state) => state.toJS()
	})
];

const rootReducer = combineReducers(reducers);

const persistentReducer = compose(
	mergePersistedState(
		deserialize
	)
)(rootReducer);

const storage = compose(
	/*storageFilter([
		"session.roomId",
		"session.authData.token"
	]),*/
	serialize
)(storageAdapter(window.localStorage))

const createPersistentStore = compose(
	persistState(storage, "crowdplay"),
	applyMiddleware.apply(null, middleware)
)(createStore);

const store = createPersistentStore(persistentReducer);
export default store;
