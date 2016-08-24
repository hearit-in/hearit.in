import Firebase from 'firebase';
import { createFirebase } from '../helpers/firebase';
import history from 'helpers/history';
import { setAuthData, loginAndRedirect } from 'actions/session';

import { app } from 'helpers/firebase';

const auth = app.auth();

// TODO: Rename
export function initFirebase() {
	return (dispatch, getState) => {
		auth.onAuthStateChanged((authData) => {
			if(authData == null) {
				auth.signInAnonymously();
				return;
			}

			dispatch(setAuthData(authData));

			const state = getState();
			const roomId = state.getIn(["session", "roomId"]);
			if(!roomId) {
				if(location.pathname !== "/")
					history.push("/");

				return;
			}

			dispatch(loginAndRedirect(roomId));
		});
	}
}
