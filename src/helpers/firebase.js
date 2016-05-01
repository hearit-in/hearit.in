import config from 'config';
import Firebase from 'firebase';

export const firebaseUrlForNode = (node) => config.firebaseURL + node;
export const createFirebase = (node) => new Firebase(firebaseUrlForNode(node || ""));

export const firebaseForRoomId = (roomId) => createFirebase(`rooms/${roomId}`);
