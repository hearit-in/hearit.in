import Firebase from 'firebase';
import { createFirebase } from '../helpers/firebase';
import history from 'helpers/history';
import store from '../store';

export function initFirebase() {
	const ref = createFirebase();
	const state = store.getState();
}
