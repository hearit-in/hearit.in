import { isEmpty } from 'lodash';
import { createAction } from 'redux-actions';
import { showError } from './errors';
import history from '../helpers/history';
import { receiveQueue } from './queue';
import { firebaseForRoomId } from 'helpers/firebase';
import Q from 'q';

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

		firebaseForRoomId(roomId).once('value', snapshot => {
			if(snapshot.val()) {
				dispatch(setRoomId(roomId));
				history.push("/app/queue");
			}
			else {
				dispatch(showError(`${roomId}: Feil passord!`));
			}
		});
	}
}

export function logout() {
	return (dispatch) => {
		dispatch(setRoomId(undefined));
		dispatch(setAuthData(undefined));

		history.push("/");
	}
}

export function roomRef() {
	return (dispatch, getState) => {
		let deferred = Q.defer();

		let state = getState();
		let roomId = state.getIn(["session", "roomId"]);

		if(isEmpty(roomId)) {
			deferred.reject(new Error("No room ID"));
		}
		else {
			deferred.resolve(firebaseForRoomId(roomId));
		}

		return deferred.promise;
	}
}
