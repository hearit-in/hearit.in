import Firebase from 'firebase';
import { createFirebase } from '../helpers/firebase';
import history from 'helpers/history';
import { setAuthData, login } from 'actions/session';

export function initFirebase() {
	return (dispatch, getState) => {
		const ref = createFirebase();

		ref.onAuth((authData) => {
			if(authData == null) {
				ref.authAnonymously();
			}

			dispatch(setAuthData(authData));

			const state = getState();
			const roomId = state.getIn(["session", "roomId"]);
			if(!roomId) {
				return;
			}

			dispatch(login(roomId));
		});
	}
}
