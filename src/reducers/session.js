import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import {
	SET_ROOM_ID,
	SET_AUTH_DATA,
	SET_IS_LOGGING_IN
} from '../actions';

export const session = handleActions({
	SET_ROOM_ID:        (state, action) => state.set("roomId", action.payload),
	SET_AUTH_DATA:      (state, action) => state.set("authData", action.payload),
	SET_IS_LOGGING_IN:  (state, action) => state.set("loggingIn", action.payload)
}, new Map({
	roomId: undefined,
	authData: undefined,
	loggingIn: false
}));
