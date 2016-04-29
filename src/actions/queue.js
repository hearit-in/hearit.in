import { createAction } from 'redux-actions';
import { createFirebase } from 'helpers/firebase';

export const RECEIVE_QUEUE = "RECEIVE_QUEUE";
export const receiveQueue = createAction(RECEIVE_QUEUE);

export function addTrackToQueue(track) {
	return (disptach, getState) => {
		const state = getState();
		const roomRef = state.getIn(["session", "roomRef"]);

		const trackObj = track.toJS();
		roomRef.child("queue").push(trackObj);
	}
}