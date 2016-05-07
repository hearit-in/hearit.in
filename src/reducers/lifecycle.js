import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { SET_HAS_LOADED_PERSISTENT_STATE } from 'actions/lifecycle';

export const lifecycle = handleActions({
	SET_HAS_LOADED_PERSISTENT_STATE: (state, action) => state.set("hasLoadedPersistentState", action.payload)
}, Map({
	hasLoadedPersistentState: false
}))
