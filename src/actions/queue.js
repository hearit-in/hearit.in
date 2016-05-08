import { createAction } from 'redux-actions';
import { roomRef, validateAuth } from './session';
import Firebase from 'firebase';

import { pushError } from './errors';
import { compareTracksByProviderId } from 'helpers/track';

import { fromJS, Map } from 'immutable';

export const RECEIVE_QUEUE = "RECEIVE_QUEUE";
export const receiveQueue = createAction(RECEIVE_QUEUE);

export function addTrackToQueue(newTrack) {
	return (dispatch, getState) => {
		return dispatch(validateAuth())
			.then(() => dispatch(roomRef()))
			.then((ref) => {
				const queueRef = ref.child("queue");


				const uid = getState().getIn(["session", "authData", "uid"]);
				if(uid == undefined) {
					return;
				}

				queueRef.once("value")
					.then(snap => snap.val())
					.then(fromJS)
					.then(tracks => tracks != null ? tracks : Map())
					// Search through all the tracks to possibly find the key of a track with the same provider and providerId
					.then(tracks => tracks.findKey(
						track => compareTracksByProviderId(track, newTrack)
					))
					.then(existingTrackKey => {
						if(existingTrackKey == undefined) {
							const trackObj = newTrack
								.set("votes", { [uid]: true })
								.set("queuedAt", Firebase.ServerValue.TIMESTAMP)
								.toJS();

							queueRef.push(trackObj);
						}
						else {
							queueRef
								.child(existingTrackKey)
								.child("votes")
								.child(uid)
								.set(true);
						}
					})
			})
	}
}
