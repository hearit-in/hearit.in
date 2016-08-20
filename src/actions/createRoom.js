import { firebaseForRoomId } from 'helpers/firebase';
import { setRoomId, getUid } from './session';
import { navigateTo } from './navigation';
import { loginAndRedirect } from './session';
import { showError } from './errors';

export default function createRoom(roomId) {
	return (dispatch, getState) => {
		let ref = firebaseForRoomId(roomId);

		ref.once("value")
			.then(snapshot => {
				if(snapshot.exists()) {
					return new Error("Room already exists");
				}


				let state = getState();
				let uid = dispatch(getUid());

				 ref.child("admins")
				 	.set({ [uid]: true })
					.then(() => dispatch(loginAndRedirect(roomId)))
			})
			.catch(e => console.error(e));
	}
}
