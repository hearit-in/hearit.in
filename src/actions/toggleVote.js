import { roomRef } from './session';

export default function toggleVote(track) {
	return (dispatch, getState) => {
		let uid = getState().getIn(["session", "authData", "uid"]);
		
		return dispatch(roomRef())
			.then(ref => {
				return ref
					.child("queue")
					.child(track.get("id"))
					.child("votes")
					.child(uid)
					.once("value")
			})
			.then(snapshot => {
				if(snapshot.exists()) {
					snapshot.ref().remove();
				}
				else {
					snapshot.ref().set(true)
				}
			}, err => {
				console.error(err);
			})
	}
}