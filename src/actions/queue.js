import { createAction } from 'redux-actions';
import { roomRef } from './session';
import Firebase from 'firebase';

import { pushError } from './errors';

export const RECEIVE_QUEUE = "RECEIVE_QUEUE";
export const receiveQueue = createAction(RECEIVE_QUEUE);

export function addTrackToQueue(track) {
	return (dispatch, getState) => {
		dispatch(roomRef()).then((ref) => {
			const queue = ref.child("queue");
			const trackId = track.get("id");


			const uid = getState().getIn(["session", "authData", "uid"]);
			if(uid == undefined) {
				return;
			}

			const trackRef = queue.child(trackId);

			trackRef.once("value", (snap) => {
				if(snap.exists()) {
					snap.ref().child("votes").child(uid).set(true);
				}
				else {
					const trackObj = track
						.set("votes", { [uid]: true })
						.set("queuedAt", Firebase.ServerValue.TIMESTAMP)
						.toJS();

					trackRef.set(trackObj);
				}
			})
		})
	}
}
