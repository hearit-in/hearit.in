import { handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import {
	SET_ROOM_ID,
	SET_AUTH_DATA,
	SET_IS_LOGGING_IN,
	SET_IS_ADMIN
} from '../actions';

import { humanReadableIdentifier } from 'helpers';

function normalizeAuthData(authData) {
	let { uid } = authData;
	
	return Map({ uid });
}

export const session = handleActions({
	SET_ROOM_ID:        (state, action) => state.set("roomId", action.payload),
	SET_AUTH_DATA:      (state, action) => state.set("authData", normalizeAuthData(action.payload)),
	SET_IS_LOGGING_IN:  (state, action) => state.set("loggingIn", action.payload),
	SET_IS_ADMIN:       (state, action) => state.set("isAdmin", action.payload),
	/*SET_SPOTIFY_AUTH    (state, action) =>
		state.set("spotifyAuth", {
			authToken: action.payload.authToken,
			refreshToken: action.payload.refreshToken,
			id: action.payload.id
		})*/
}, new Map({
	roomId: undefined,
	authData: undefined,
	loggingIn: false,
	isAdmin: false,
	adminRequestIdentifier: humanReadableIdentifier()
}));
