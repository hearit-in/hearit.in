import Firebase from 'firebase';
import { createFirebase } from '../helpers/firebase';
import history from 'helpers/history';
import { setAuthData, login } from 'actions/session';
import store from '../store';

export function initFirebase() {
	const ref = createFirebase();

	ref.onAuth((authData) => {
		if(authData == null) {
			ref.authAnonymously();
		}

		store.dispatch(setAuthData(authData));

		const state = store.getState();
		const roomId = state.getIn(["session", "roomId"]);
		if(!roomId) {
			return;
		}

		store.dispatch(login(roomId));
	});
}
