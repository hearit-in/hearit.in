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
					throw new Error(`En spilleliste med navnet "${roomId}" finnes allerede`);
				}

				// Set ourself as admin.
				// The rules allow it if there are no admins.
				let uid = dispatch(getUid());
				return ref.child("admins")
					.set({ [uid]: true })
					.then(() => dispatch(loginAndRedirect(roomId)))
			})
			.catch(e => dispatch(showError(e.message)));
	}
}
