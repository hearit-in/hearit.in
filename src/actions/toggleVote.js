import { roomRef, getUid } from './session';

export default function toggleVote(trackId) {
	return (dispatch, getState) => {
		let uid = dispatch(getUid());
		
		return dispatch(roomRef())
			.then(ref => {
				return ref
					.child("queue")
					.child(trackId)
					.child("votes")
					.child(uid)
					.once("value")
			})
			.then(snapshot => {
				if(snapshot.exists()) {
					snapshot.ref.remove();
				}
				else {
					snapshot.ref.set(true)
				}
			}, err => {
				console.error(err);
			})
			.catch(e => { debugger; })
	}
}