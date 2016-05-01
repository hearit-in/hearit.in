import { createFirebase } from 'helpers/firebase';

const firebase = createFirebase();

export const rootRef = function() {
	return firebase;
}
