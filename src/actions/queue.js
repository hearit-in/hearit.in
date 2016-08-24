import { createAction } from 'redux-actions';
import { roomRef, validateAuth, getUid } from './session';
import Firebase from 'firebase';

import { showError } from './errors';
import { compareTracksByProviderId } from 'helpers/track';

import { fromJS, Map } from 'immutable';

export const RECEIVE_QUEUE = "RECEIVE_QUEUE";
export const receiveQueue = createAction(RECEIVE_QUEUE);

function queuedTrackRef(trackId) {
	return (dispatch) =>
		dispatch(roomRef())
		.then(room => room.child("queue").child(trackId))
}

export function addTrackToQueue(newTrack) {
	return (dispatch, getState) => {
		// SHAME SHAME SHAME SHAME
		var queueRef;
		return dispatch(validateAuth())
			.then(() => dispatch(roomRef()))
			.then(ref => {
				queueRef = ref.child("queue");
				return ref.child("queue").once("value")
			})
			.then(snap => snap.val())
			.then(fromJS)
			.then(tracks => tracks || Map())
			// Compare by id from provider
			.then(tracks => tracks.findKey(
				track => compareTracksByProviderId(track, newTrack)
			))
			.then(existingTrackKey => {
				let uid = dispatch(getUid());

				if(existingTrackKey == undefined) {
					const trackObj = newTrack
						.set("votes", { [uid]: true })
						.set("queuedAt", Firebase.database.ServerValue.TIMESTAMP)
						.toJS();

					queueRef.push(trackObj)
						.then(trackRef => {
							trackRef.child("id").set(trackRef.key);
						});
				}
				else {

					queueRef
						.child(existingTrackKey)
						.child("votes")
						.child(uid)
						.set(true);
				}
			})
			.catch(e => {
				console.error(e);
			})
	}
}

export function removeTrackFromQueue(track) {
	return (dispatch) =>
		dispatch(queuedTrackRef(track.get("id")))
			.then(trackRef => trackRef.remove(), (err) => console.error(err))
}

export function pinTrackToTop(track) {
	return (dispatch) =>
		dispatch(queuedTrackRef(track.get("id")))
			.then(trackRef => trackRef
				.child("pinned")
				.set(true))
}

export function unpinTrackFromTop(track) {
	return (dispatch) =>
		dispatch(queuedTrackRef(track.get("id")))
			.then(trackRef => trackRef
				.child("pinned")
				.set(false))
}

export function toggleTrackPinnedToTop(track) {
	return (dispatch) =>
		dispatch(queuedTrackRef(track.get("id")))
			.then(trackRef => trackRef
				.child("pinned")
				.set(!track.get("pinned")))
			.catch(e =>
				console.error(e)
			)
}
