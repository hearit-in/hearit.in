import Firebase from 'firebase';
import { createFirebase } from '../helpers/firebase';
import history from 'helpers/history';
import { setAuthData, setRoomId, setIsLoggingIn } from 'actions/session';
import store from '../store';

export function initFirebase() {
	const ref = createFirebase();

	ref.onAuth((authData, err) => {
		store.dispatch(setAuthData(authData));

		const state = store.getState();
		const roomId = state.getIn(["session", "roomId"]);
		if(!roomId) {
			// TODO: throw here or something
			return;
		}

		ref.child(`rooms/${roomId}`).once('value', snapshot => {
			if(snapshot.val()) {
				store.dispatch(setRoomId(roomId));
				store.dispatch(setIsLoggingIn(false));
				history.push("/app/search");
			}
			else {
				store.dispatch(showError(`${roomId}: Feil passord!`));
				store.dispatch(setIsLoggingIn(false));
			}
		});
	});
}
