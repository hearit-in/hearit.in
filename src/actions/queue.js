import { createAction } from 'redux-actions';
import { roomRef } from './session';

import { pushError } from './errors';

export const RECEIVE_QUEUE = "RECEIVE_QUEUE";
export const receiveQueue = createAction(RECEIVE_QUEUE);

export function addTrackToQueue(track) {
	return (dispatch, getState) => {
		dispatch(roomRef()).then((ref) => {
			const state = getState();
			const uid = state.getIn(["session", "authData"]).uid;

			const trackObj = track
				.set("votes", { [uid]: true })
				.toJS();

			let queue = ref.child("queue");
			queue.push(trackObj);
		})
	}
}
