import { firebaseForRoomId } from 'helpers/firebase';
import { setRoomId } from './session';
import { navigateTo } from './navigation';
import { login } from './session';

export default function createRoom(roomId, adminPassword) {
	return (dispatch, getState) => {
		let ref = firebaseForRoomId(roomId);

		ref.once("value", (snapshot) => {
			if(snapshot.exists()) {
				return;
			}

			let state = getState();
			let uid = state.getIn(["session", "authData", "uid"]);
			
			ref.child("adminPassword").set(adminPassword)
				.then(() => ref.child("admins").set({ [uid]: adminPassword }))
				.then(() => dispatch(login(roomId)))
		});
	}
}
