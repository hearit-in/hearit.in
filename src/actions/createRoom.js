import { firebaseForRoomId } from 'helpers/firebase';
import { setRoomId } from './session';
import { navigateTo } from './navigation';
import { login } from './session';

export default function createRoom(roomId) {
	return (dispatch, getState) => {
		let ref = firebaseForRoomId(roomId);

		ref.once("value")
			.then(snapshot => {
				if(snapshot.exists()) {
					return;
				}

				let state = getState();
				let uid = state.getIn(["session", "authData", "uid"]);

				 ref.child("admins")
				 	.set({ [uid]: true })
					.then(() => dispatch(login(roomId)))
			});
	}
}
