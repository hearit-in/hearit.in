import { isEmpty } from 'lodash';
import { createAction } from 'redux-actions';
import { firebaseUrlForNode } from '../helpers/firebase';
import { showError } from './errors';
import history from '../helpers/history';
import { receiveQueue } from './queue';
import { createFirebase } from 'helpers/firebase';
import Q from 'q';

const rootRef = new createFirebase();
const roomsRef = new createFirebase("rooms");

export const SET_ROOM_ID = 'SET_ROOM_ID';
export const setRoomId = createAction(SET_ROOM_ID);

export const SET_AUTH_DATA = 'SET_AUTH_DATA';
export const setAuthData = createAction(SET_AUTH_DATA);

export const SET_IS_LOGGING_IN = 'SET_IS_LOGGING_IN';
export const setIsLoggingIn = createAction(SET_IS_LOGGING_IN);

export function login(roomId) {
	return (dispatch, getState) => {
		if(isEmpty(roomId)) {
			dispatch(showError(`Hva driver du med?`));
			return;
		}

		dispatch(setIsLoggingIn(true));

		rootRef.authAnonymously();
	}
}

export function logout() {
	return (dispatch) => {
		dispatch(setRoomId(undefined));
		dispatch(setAuthData(undefined));
		dispatch(setIsLoggingIn(false));
		browserHistory.push("/");
	}
}

export function roomRef() {
	return (dispatch, getState) => {
		let deferred = Q.defer();
		
		let state = getState();
		if(state.getIn(["session", "roomId"]))
		
		return deferred.promise;
	}
}