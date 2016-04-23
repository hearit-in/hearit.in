import Firebase from 'firebase';
import { createFirebase } from '../helpers/firebase';
import history from 'helpers/history';
import { setAuthData } from 'actions/session';
import store from '../store';

export function initFirebase() {
	const ref = createFirebase();
	
	ref.onAuth((authData, err) => {
		store.dispatch(setAuthData(authData));
		
		const state = store.getState();
		const roomId = state.getIn("session.roomId");
		if(!roomId) {
			// TODO: throw here or something
			return;
		}

		roomsRef.child(roomId).once('value', snapshot => {
			if(snapshot.val()) {
				dispatch(setRoomId(roomId));
				dispatch(setIsLoggingIn(false));
				history.push("app/search");
			}
			else {
				dispatch(showError(`${roomId}: Feil passord!`));
				dispatch(setIsLoggingIn(false));
			}
		});
	});
}
